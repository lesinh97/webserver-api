const ipv4 = new RegExp("(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)")
const {Products}= require('./database')

const getProducts = (req, res) => {
  let request_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim().match(ipv4);
  Products.findAll({
    raw: true
  }).then(function(data) {
    console.log('Get products at: '+new Date().toLocaleString()+' from IP: '+request_ip)
    console.log(data)
    res.status(200).json(data)
  })
}
const findProducts = (req, res) => {
  let request_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim().match(ipv4);
  const {productjancode} = req.body
  console.log(req.body)
  Products.findAll({
    where: {
      productjancode: productjancode
    },
    raw: true
  }).then(data => {
    if (JSON.stringify(data)!='[]')
    {
      console.log('Search product '+productjancode+' at: '+new Date().toLocaleString()+' from IP: '+request_ip)
      console.log(data)
      res.status(200).json(data)
    }
      res.status(404).send()
  })
}
const createProduct = (req,res) => {
  let request_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim().match(ipv4);
  const {productname, productjancode, productcomment} = req.body
  console.log(req.body)
  Products.create({
    productname: productname,
    productjancode: productjancode,
    productcomment: productcomment
  }).then(data => {
    console.log('Added '+JSON.stringify(data.productname)+' at: '+new Date().toLocaleString()+' from IP: '+request_ip);
    res.status(200).json()
  })
}
const updateProduct = (req, res) => {
  let request_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim().match(ipv4);
  const {productname, productcomment, productjancode} = req.body
  console.log(req.body)
  Products.update({productcomment: productcomment, productname: productname}, {
    where: {
      productjancode: productjancode
    }
  }).then(data => {
    console.log('Updated '+JSON.stringify(data.productname)+' at: '+new Date().toLocaleString()+' from IP: '+request_ip);
    res.status(200).json();
  })
}
const deleteProdut = (req, res) => {
  let request_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim().match(ipv4);
  const {productjancode} = req.body
  console.log(req.body)
  Products.destroy({
    where: {
      productjancode: productjancode
    }
  }).then(data => {
    console.log('Deleted '+JSON.stringify(data.productname)+' at: '+new Date().toLocaleString()+' from IP: '+request_ip);
    res.status(200).json()
  })
}
module.exports = {
  getProducts,
  findProducts,
  createProduct,
  updateProduct,
  deleteProdut
}
