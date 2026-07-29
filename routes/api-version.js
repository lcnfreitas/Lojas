const config = require(`./../config/config.js`);

// /api/version
//     .get - get the selected dialect


module.exports = function (app) {
    app.get("/api/version", function (req, res) {
        resp = config.DB_DIALECT
        console.log(resp)
        res.json(resp);

    });
};
