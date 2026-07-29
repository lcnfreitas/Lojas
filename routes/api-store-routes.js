// *********************************************************************************
// This file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const db = require("./../models");
const { QueryTypes } = require('sequelize');

// Description
// =============================================================
// /api/stores
//     .get - get all the stores' information
//     .post - create a new store entry

// /api/stores/:storeId'
//     .delete - delete a particular store
//     .get - get name, city, and state info for a particular store

//  /api/stores/products/:storeId'
//     .get - get all the products under a particular store
//     .post -  add a product to a particular store
//     .delete - delete a product from a particular store

// Routes
// =============================================================
module.exports = function (app) {
  // get name, city, and state information for all available stores
  app.get("/api/stores", function (req, res) {
    db.Store.findAll({})
      .then(function (resp) {
        res.json(resp);
      });
  });

  // create a new single store entry
  app.post("/api/stores", function (req, res) {
    db.Store.create({
      store_name: req.body.store_name,
      store_city: req.body.store_city,
      store_state: req.body.store_state
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // get name, city, and state info for a particular store
  app.get("/api/stores/:storeId", function (req, res) {
    db.Store.findOne({
      where: {
        id: req.params.storeId
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // delete a single specific store
  app.delete("/api/stores/:storeId", function (req, res) {
    // delete store products from inventory first
    db.InventoryRecord.destroy({
      where: {
        store_id: req.params.storeId
      }
    }) // delete the store entry from stores second
      .then(function (data) {
        db.Store.destroy({
          where: {
            id: req.params.storeId
          }
        })
          .then(function (data) {
            res.json(data);
          });
      });
  });

  // add a product to a particular store
  app.post("/api/stores/products", function (req, res) {
    db.Product.create({
      product_name: req.body.product_name,
      product_price: parseFloat(req.body.product_price),
      product_img_url: req.body.product_img_url,
      product_comment: req.body.product_comment
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // get all the products under a particular store
  app.get("/api/stores/products/:storeId", function (req, res) {
    const storeId = parseInt(req.params.storeId);
    // get all the inventory entries associated with the store id in question
    db.InventoryRecord.findAll({
      where: {
        store_id: storeId
      }
    })
    .then(function (resp) {
      res.json(resp);
    });

    
    // try {
    //   const [results, metadata] = await db.sequelize.query(
    //     `SELECT 
    //     a.id inventory_id,
    //     a.store_id,
		//     b.store_name,
    //     a.local_price,
    //     a.comment,
		//     a.product_id,
    //     c.product_name,
    //     quantity FROM inventoryRecords as a 
    //     JOIN stores as b ON b.id = a.store_id
    //     JOIN products as c ON c.id = a.product_id
		//     WHERE a.store_id = ?
    //     `,
    //     {
    //       model: db.inventoryRecord,
    //       replacements: [storeId],
    //       type: db.sequelize.QueryTypes.SELECT
    //     }
    //   );
    //   res.json(results);
    // } catch (e) {
    //   console.log(e)
    // }
  });

  // delete a product from a particular store
  // app.delete("/api/stores/products/:productId", function (req, res) {
  //   // this gets handled by deleting a specific inventory entry under api-inventory-routes.js
  // }
};
