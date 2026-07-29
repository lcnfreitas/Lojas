const db = require("./../models");

// /api/products
// .get - get all the products
// .post - add a global product

// /api/products/:product_id
// .get - get info for a particular product from global inventory
// .delete - delete a particular product from global inventory

module.exports = function (app) {
    app.get("/api/products", function (req, res) {
        db.Product.findAll({})
            .then(function (resp) {
                res.json(resp);
            });
    });

    app.post("/api/products", function (req, res) {
        db.Product.create({
            // product_id: req.body.product_id,
            product_name: req.body.product_name,
            product_price : req.body.product_price,
            product_image_url: req.body.product_image_url,
            product_comment: req.body.product_comment
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.get("/api/products/:productId", function (req, res) {
        db.Product.findOne({
            where: {
                id: req.params.productId
            }
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.delete("/api/products/:productId", function (req, res) {
        // delete ALL associated product entries from inventory
        db.InventoryRecord.destroy({
            where: {
                product_id: req.params.productId
            }
        }).then(function (dbPost) {
            // delete the product from global inventory
            db.Product.destroy({
                where: {
                    id: req.params.productId
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
        });
    });
};
