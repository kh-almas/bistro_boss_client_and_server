const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster.9zce0xe.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://0.0.0.0:27017`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const menuCollections = client.db("bistroRestaurant").collection("menu");
        const reviewsCollections = client.db("bistroRestaurant").collection("reviews");

        app.get('/menu', async (req, res) => {
            const result = await menuCollections.find().toArray();
            res.send(result);
        })

        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollections.find().toArray();
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        //
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is ok');
})

app.listen(port, () => {
    console.log('server is ok')
})