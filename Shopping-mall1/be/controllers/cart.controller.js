const { populate } = require("dotenv");
const Cart = require("../models/Cart");

const cartController = {}

cartController.addItemToCart = async (req, res) => {
    try {
        const { userId } = req;
        const { productId, size, qty } = req.body;
        // 유저 카드 찾기
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // 카드 없으면 만듬
            cart = new Cart({ userId });
            await cart.save();
        }

        // 카트가 있을 때 이미 들어간 아이템이면
        const existItem = cart.items.find((item) => item.productId.equals(productId) && item.size === size);
        // equals : 오브젝트 타입일 때 사용
        if (existItem) {
            throw new Error("이미 등록된 상품입니다");
        }

        // 카트에 아이템 추가
        cart.items = [...cart.items, { productId, size, qty }];
        await cart.save();

        res.status(200).json({ status: "카트 등록 성공", data: cart, cartItemQty: cart.items.length });

    } catch (error) {
        return res.status(400).json({ status: "실패", error: error.message });
    }
}

cartController.getCart = async (req, res) => {

    try {
        const { userId } = req;
        const cart = await Cart.findOne({ userId }).populate(
            {
                path: 'items',
                populate: {
                    path: 'productId',
                    model: "Product",
                }
            }
        );
        res.status(200).json({ status: "성공", data: cart.items })
    } catch (error) {
        return res.status(400).json({ status: "실패", error: error.message });
    }
}

cartController.deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req;
        const cart = await Cart.findOne({ userId });
        cart.items = cart.items.filter((item) => !item._id.equals(id));

        await cart.save();
        res.status(200).json({
            status: 200,
            cartItemQty: cart.items.length
        });
    } catch (error) {
        return res.status(400).json({ status: "fail", error: error.message });
    }
};

cartController.editCartItem = async (req, res) => {
    try {
        const { userId } = req;
        const { id } = req.params;

        const { qty } = req.body;
        const cart = await Cart.findOne({ userId }).populate({
            path: "items",
            populate: {
                path: "productId",
                model: "Product",
            },
        });
        if (!cart) throw new Error("There is no cart for this user");
        const index = cart.items.findIndex((item) => item._id.equals(id));
        if (index === -1) throw new Error("Can not find item");
        cart.items[index].qty = qty;
        await cart.save();
        res.status(200).json({ status: 200, data: cart.items });
    } catch (error) {
        return res.status(400).json({ status: "fail", error: error.message });
    }
};

cartController.getCartQty = async (req, res) => {
    try {
        const { userId } = req;
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) throw new Error("There is no cart!");
        res.status(200).json({ status: 200, qty: cart.items.length });
    } catch (error) {
        return res.status(400).json({ status: "fail", error: error.message });
    }
};

module.exports = cartController;