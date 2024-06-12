const orderController = {};
const Order = require("../models/Order");
const productController = require("./product.controller");
const { randomStringGenerator } = require("../utils/randomStringGenerator");

orderController.createOrder = async (req, res) => {
    try {
        const { userId } = req;
        const { shipTo, contact, totalPrice, orderList } = req.body;

        const insufficientStockItems = await productController.checkItemListStock(orderList);

        if (insufficientStockItems.length > 0) {
            const errorMessage = insufficientStockItems.reduce((total, item) => total += item.message, "");
            throw new Error(errorMessage);
        }

        const newOrder = new Order({
            userId,
            totalPrice,
            shipTo,
            contact,
            items: orderList,
            orderNum: randomStringGenerator()
        });

        await newOrder.save();

        res.status(200).json({ status: 'success', orderNum: newOrder.orderNum });
        // const { userId } = req;
        // const { shipTo, contact, totalPrice, orderList } = req.body;

        // // 재고확인 과 재고 업데이트를 해야 한다.
        // const insufficientStockItems = await productController.checkItemListStock(orderList);
        // // 주문을 만든다.
        // console.log("insufficientStockItems", insufficientStockItems);
        // // 위의 재고 확인에서 재고가 없다면
        // if (insufficientStockItems.length > 0) {
        //     const errorMessage = insufficientStockItems.reduce((total, item) => total += item.message, "");
        //     console.log("errorMessage", errorMessage);
        //     throw new Error(errorMessage)
        // }
        // else {
        //     // 재고 수량 변경
        //     orderList.map(async (item) => await productController.updateStock(item));

        //     // 재고가 다 충분함 -> 오더 만들기
        //     // 읽어온 걸 바탕으로 order 만들기
        //     const newOrder = new Order({
        //         userId,
        //         totalPrice,
        //         shipTo,
        //         contact,
        //         items: orderList,
        //         orderNum: randomStringGenerator()
        //     });
        //     console.log("newOrder", newOrder);
        //     await newOrder.save();
        //     // save 후에 카트 비우기

        //     res.status(200).json({ status: "success", orderNum: newOrder.orderNum });
        // }
    } catch (error) {
        return res.status(400).json({ status: "주문실패", error: error.message });
    }
}

module.exports = orderController;