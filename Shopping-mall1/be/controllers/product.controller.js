const Product = require("../models/Product");
const productController = {}

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
        const products = await Product.find({});
        res.status(200).json({ status: "성공", data: products });
    } catch (error) {
        res.status(400).json({ status: "상품조회 실패", error: error.message })
    }
};

module.exports = productController;