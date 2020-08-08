const Sequelize = require('sequelize')
const database = new Sequelize({
  database: process.env.DATABASE,
  dialect: process.env.DATABASE_DIALECT,
  operatorsAliases: Sequelize.Op,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
})

const Products = database.define('products', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  productname: { type: Sequelize.STRING, allowNull: false },
  productjancode: { type: Sequelize.STRING, allowNull: false },
  productcomment: { type: Sequelize.STRING, allowNull: true },
  createdAt:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})

const Invoices = database.define('invoices', {
  invoicename: { type: Sequelize.STRING, unique: 'invoice-name', allowNull: false },
  createdAt:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})

const InvoiceDetail = database.define('invoice_detail', {
  quantity: {type: Sequelize.INTEGER, defaultValue: 1},
  createdAt:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})

InvoiceDetail.belongsTo(Products, {
  foreignKey: { allowNull: false, unique: 'invoice-detail' },
  onDelete: 'cascade'
})

InvoiceDetail.belongsTo(Invoices, {
  foreignKey: { allowNull: false, unique: 'invoice-detail' },
  onDelete: 'cascade'
})

module.exports = {
  Products,
  Invoices,
  InvoiceDetail,
  database
}