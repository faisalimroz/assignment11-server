const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express();
//middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tort7uo.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {


  try {
    const serviceCollection = client.db("assignment11").collection("services");
    const ratingCollection = client.db("assignment11").collection("rating");
    const phoneCollection = client.db("assignment11").collection("phone");
    const usersCollection = client.db("assignment11").collection("user");
    const orderCollection=client.db("assignment11").collection("order");
    // query for movies that have a runtime less than 15 minutes
    app.get('/serviceCollection', async (req, res) => {
      const query = {};
      const service = await serviceCollection.find(query).toArray()
      res.send(service);
    })
    app.get('/serviceCollection/:pid', async (req, res) => {
      const id = req.params.pid;
      console.log(id)
      const query = { _id: new ObjectId(id) }
      const product = await serviceCollection.findOne(query)
      console.log(product)
      res.send(product)
    })
    app.get('/rating', async (req, res) => {
      const query = {}
      const rating = await ratingCollection.find(query).limit(3).toArray();
      
       
    
      res.send(rating)
    })
    app.get('/phone', async (req, res) => {
      const query = {}
      const phone = await phoneCollection.find(query).toArray();
      res.send(phone)
    })
    app.post('/user', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user)
      res.send(result)
    })
    app.post('/rating', async (req, res) => {
      const user = req.body;
      const result = await ratingCollection.insertOne(user)
      res.send(result)
    })
    app.get('/orders',async(req,res)=>{
      const email=req.query.email;
      const query={email:email}
      const orders=await orderCollection.find(query).toArray();
      res.send(orders)
    })
    app.post('/orders', async (req, res) => {
      const mobile = req.body;
     const order=await orderCollection.insertOne(mobile)
      
      

      
      res.send(mobile)
    })

  } finally {
    await client.close();
  }
}

run().catch(console.log)
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/', async (req, res) => {
  res.send('assignment 11 is running')
})
app.listen(port, () => console.log(`assignment 11 running on ${port}`))