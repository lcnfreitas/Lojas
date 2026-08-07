// Supported dialects are: mssql, mariadb, mysql, postgres, and sqlite
module.exports = {
  DB_NAME: process.env.DB_NAME || 'fiestadb',
  DB_HOST_ADDRESS: process.env.DB_HOST || '127.0.0.1',
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  DB_DOMAIN_NAME: process.env.DB_DOMAIN_NAME || '',
  DB_USER_NAME: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'nutanix/4u'
}