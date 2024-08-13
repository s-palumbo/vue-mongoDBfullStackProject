import express from "express";
import { MongoClient } from 'mongodb';
import path from 'path';
//import { cartItems as cartItemsRaw, products as productsRaw } from "./temp-data"; /* adding raw variable to allow manipulation of json objects */

/* assigning variables to imported variables for use in Post endpoints */
/* let cartItems = cartItemsRaw; 
let products = productsRaw; */


/* SEE NOTES AT BOTTOM */
async function start() {
    /* DONT post this to a public repo with password in the URL */
  const url = 'mongodb+srv://sspalumbo:eZAsQ5pUoE7IUAG1@cluster0.1okua.mongodb.net/?retryWrites=true&w=majority&appName=cluster0';
  const client = new MongoClient(url);

  await client.connect();
  const db = client.db('fsv-db');

  const  app = express();
  app.use(express.json()); /* allows app to parse request (req) body  */

  app.use('/images', express.static(path.join(__dirname, '../assets')));


  /* 3 endpoints that match our current App pages */
  app.get('/api/products', async (req, res) => {
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  });

  /* helper function to make code less repetitive */
  async function populateCartIds(ids) {
    return Promise.all(ids.map(id => db.collection('products').findOne({ id })));
  }

  /* edited endpoint to reflect the cart associated with specific user id, then uses req params userId with findOne to pull from mongoDB users collection */
  app.get('/api/users/:userId/cart', async (req, res) => {
    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get('/api/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection('products').findOne({ id:productId });
    res.json(product);
  });

  /* POST endpoints */

  /* PRE Database POST endpoint:
  --we need to request the ID in the request body

    app.post('/cart', (req, res) => {
    const productId = req.body.id;
    cartItems.push(productId);
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
  }) */

  /* Updated POST endpoint: */
  //update URL to match the "get" cart endpoint
  app.post('/api/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    await db.collection('users').updateOne({ id: userId }, {
      $addToSet: { cartItems: productId }
    });

    const user = await db.collection('users').findOne({ id:req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });


  /* DELETE endpoint */
  //update path
  app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db.collection('users').updateOne({ id: userId }, {
      $pull: {cartItems: productId},
    });

    const user = await db.collection('users').findOne({ id:req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.listen(8000, () => {
    console.log('Server is listening on port 8000')
  });
}

start();


  
/* 
To test simple endpoints you can run  http://localhost:8000/hello in a new browser tab

To test more complex endpoints on this port in Postman, run in the terminal:

$ npx babel-node src/server.js
Server is listening on port 8000

Then plug in the localhost port in postman's "get" workspace: http://localhost:8000/hello

By default you need to re-run the server in the terminal if you make changes in the server file.
Nodemon will help automatically restart server in response to server changes

Add to "scripts" in the back-end package.json file after using the same command in the terminal to install nodemon:
"dev": "npx nodemon --exec npx babel-node src/server.js"

Then you can run "npm run dev" shortcut moving forward
 */

/* 
async function start() Notes!
-by placing all of our backend code and endpoints within a start function, we reduce the repitition of having to 
connect to the db with these two lines in EVERY endpoint: 
  await client.connect();
  const db = client.db('fsv-db');

Just remember to call the start() function at the end of the page to run everthing inside of it!!

*/