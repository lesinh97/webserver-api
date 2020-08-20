require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { database } = require('./database')
const { getProducts, findProducts, createProduct, updateProduct, deleteProdut } = require('./queries')

const port = process.env.SERVER_PORT

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Barcode scanning API'
}));

app.get('/products', getProducts);
app.post('/find/product',findProducts);
app.post('/products', createProduct);
app.post('/alter/product', updateProduct);
app.post('/delete/product', deleteProdut);

database.sync({ alter:true }).then(() => {
  console.log('Default mode: Sync state between sequelize and database.')
  console.log('Connect to database has been established!');
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
})
.catch(error => {
  console.error('Unable to connect: ', error);
});