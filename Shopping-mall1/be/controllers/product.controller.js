const Product = require("../models/Product");
const productController = {}
const pageSize = 5;

productController.createProduct = async (req, res) => {
    try {
        const { sku, name, size, image, category, description, price, stock, status } = req.body;
        const product = new Product({ sku, name, size, image, category, description, price, stock, status });

        await product.save();
        res.status(200).json({ status: "상품생성 성공", product });
    } catch (error) {
        res.status(400).json({ status: "상품생성 실패", error: error.message })
    }
};

productController.getProducts = async (req, res) => {
    try {
        const { page, name } = req.query;
        const cond = name ? { name: { $regex: name, $options: 'i' } } : {}
        let query = Product.find(cond);
        let response = { status: "성공" };

        if (page) {
            query.skip((page - 1) * pageSize).limit(pageSize);
            const totalItemNum = await Product.find(cond).count();
            const totalPageNum = Math.ceil(totalItemNum / pageSize);
            response.totalPageNum = totalPageNum;
        }

        const productList = await query.exec(); // 위에서 만든 쿼리를 exec 실행하겠다.
        response.data = productList;

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "상품조회 실패", error: error.message })
    }
};

module.exports = productController;