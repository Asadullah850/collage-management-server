const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json())
app.use(cors())
// schoolManagement
// 36tt7b7FfgGtpZGF



const uri = "mongodb+srv://schoolManagement:36tt7b7FfgGtpZGF@cluster0.jqukbua.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const schoolDataCollection = client.db("jobtasSchool").collection("schoolData");
    const reviewsDataCollection = client.db("jobtasSchool").collection("reviews");

    app.get('/schoolData', async (req, res) =>{
        const result = await schoolDataCollection.find().toArray();
        res.send(result)
    
    })
    app.get('/reviews', async (req, res) =>{
        const result = await reviewsDataCollection.find().toArray();
        res.send(result)
    
    })
    
    app.get('/collageSingData/:id', async (req, res) =>{
        const id = req.params.code
        const result = await schoolDataCollection.findOne(id);
        res.send(result)
    
    })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})