'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const config = require(`${__dirname}/../config/config.js`)[env];
const config = require(`./../config/config.js`);

const db = {};
let sequelize;

if (`${config.DB_DIALECT}` === "mssql"){
  // config to connect to Microsoft Windows SQL
  sequelize = new Sequelize(`${config.DB_NAME}`, null, null,  {
    "host": `${config.DB_HOST_ADDRESS}`,
    "dialect": `${config.DB_DIALECT}`,
    "dialectOptions": {
      "requestTimeout": 300000,
      "authentication": {
        "type": 'ntlm',
        "options": {
          "domain": `${config.DB_DOMAIN_NAME}`,
          "userName": `${config.DB_USER_NAME}`,
          "password": `${config.DB_PASSWORD}`,
        }
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }  
  }
  );
} else {
  // config to connect to Mariadb, MySQL, SQLite, or PostGRESQL
  console.log("connecting to non-MSSQL DB")
  sequelize = new Sequelize(`${config.DB_NAME}`, `${config.DB_USER_NAME}`, `${config.DB_PASSWORD}`, { 
    "host": `${config.DB_HOST_ADDRESS}`,
    "dialect": `${config.DB_DIALECT}`} )
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
