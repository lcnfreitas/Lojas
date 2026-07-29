const db = require("./../models");
// const { QueryTypes } = require('sequelize');

// /api/inventory
//     .get - get all inventory entries
//     .post - add entry to inventory

// /api/inventory/:inventory_id
//     .delete - delete a single especific entry
//     .get - get a single specific entry
//     .put - update a single specific entry

module.exports = function (app) {
    app.get("/api/inventory", function (req, res) {
        db.InventoryRecord.findAll({})
            .then(function (resp) {
                res.json(resp);
            });
    });

    app.post("/api/inventory", function (req, res) {
        db.InventoryRecord.create({
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            store_id: req.body.store_id,
            store_name: req.body.store_name,
            quantity: req.body.quantity,
            local_price : req.body.local_price,
            comment: req.body.comment
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.get("/api/inventory/:inventoryId", function (req, res) {
        db.InventoryRecord.findOne({
            where: {
                id: req.params.inventoryId
            }
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.delete("/api/inventory/:inventoryId", function (req, res) {
        db.InventoryRecord.destroy({
            where: {
                id: req.params.inventoryId
            }
        }).then(function (resp) {
                res.json(resp);
            });
    });

    app.put("/api/inventory/:inventoryId", function (req, res) {
        const inventory_id = req.params.inventoryId;
        const product_quantity = parseInt(req.body.product_quantity);
        const local_price = parseFloat(req.body.local_price);
        const product_comment = req.body.product_comment;
        db.InventoryRecord.update({quantity:product_quantity, local_price:local_price, comment:product_comment},
            {
              where: {
                id: inventory_id
              }
            })
            .then(function(dbPost) {
              res.json(dbPost);
            });
    });
};
