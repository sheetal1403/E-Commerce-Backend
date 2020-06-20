const express = require('express');
const router = express.Router();
const { database } = require('../config/helper')



/* GET all products. */
router.get('/', function(req, res, next) {
  console.log('route found')
  let page = (req.query.page !== undefined && req.query.page !== 0 ? req.query.page : 1);
  const limit = (req.query.limit !== undefined && req.query.limit !== 0 ? req.query.limit: 10);
  

  //Define start and end values of products that should be displayed on the current page
  
  if( page > 0){
    start = (page * limit) - limit;
    end = page * limit;
    a = 1
    
  }else{
    start = 0; //Default values
    end = 10;
  }
  console.log('connection start')
database.table('products as p')
.join([
  {table: 'categories as c', on: 'p.cat_id = c.id'}
])
.withFields([
      'c.title as category',
      'p.title as name',
      'p.description', 
      'p.price',
      'p.quantity',
      'p.images',
      'p.image',
      'p.id'
    ])
.slice(start, end)
.sort({id: .1})
.getAll()
.then(prods =>{
  if(prods.length > 0){
          res.status(200).json({
            count: prods.length,
            products: prods
          })
  }else{
    res.json({
              message: 'No products found'
            })
  }
})
.catch(e => console.log(e))

});

/* GET a single product by ID*/
router.get('/:id', function(req,res) {
  const id = req.params.id;
  // console.log(id)
  database.table('products as p')
  .join([
    {table: 'categories as c', on: 'p.cat_id = c.id'}
  ])
  .withFields([
    'c.title as category',
    'p.title as name',
    'p.description',
    'p.price',
    'p.quantity',
    'p.image',
    'p.images',
    'p.id'
  ])
  .filter({'p.id': id})
  .get()
  .then(prod => {
    if(prod){
      res.status(200).json(prod)
}else{
res.json({
          message: 'No such product found'
        })
}
  })
  .catch(e => console.log(e))
})

/* Get products from one category*/
router.get('/category/:catName', function(req, res){
  const catName = req.params.catName
  database.table('products as p')
  .join([
    {table: 'categories as c', on: 'p.cat_id = c.id'}
  ])
  .withFields([
    
    'p.title as name',
    'p.price',
    'p.quantity',
    'p.description',
    'p.image',
    'p.images',
    'p.id',
    'p.description'
  ])
  .filter({'c.title': catName})
  .getAll()
  .then(prods => {
    if(prods.length > 0){
      res.status(200).json({
        products: prods
      })
}else{
res.json({
          message: 'No such product found'
        })
}
  })
  .catch(e => console.log(e))
})



module.exports = router;
