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

productController.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { sku, name, size, image, price, description, category, stock, status } = req.body;
        const product = await Product.findByIdAndUpdate({ _id: productId }, { sku, name, size, image, price, description, category, stock, status }, { new: true });
        if (!product) throw new Error("해당 상품이 없다.")

        res.status(200).json({ status: "상품수정 성공", data: product });

    } catch (error) {
        res.status(400).json({ status: "상품수정 실패", error: error.message })
    }
}

productController.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(
            { _id: productId }, { isDeleted: true }
        );
        if (!product) throw new Error("해당 상품이 없다");
        res.status(200).json({ status: "상품삭제 성공" });
    } catch (error) {
        res.status(400).json({ status: "상품삭제 실패", error: error.message });
    }
}

productController.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) throw new Error("No item found");
        res.status(200).json({ status: "success", data: product });
    } catch (error) {
        return res.status(400).json({ status: "fail", error: error.message });
    }
};

module.exports = productController;