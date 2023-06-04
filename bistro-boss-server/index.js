const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster.9zce0xe.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb://0.0.0.0:27017`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const userCollections = client.db("bistroRestaurant").collection("users");
        const menuCollections = client.db("bistroRestaurant").collection("menu");
        const reviewsCollections = client.db("bistroRestaurant").collection("reviews");
        const cartCollections = client.db("bistroRestaurant").collection("carts");

        app.get('/users', async (req, res) => {
            const result = await userCollections.find().toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollections.insertOne(user);
            res.send(result);
        })

        app.get('/menu', async (req, res) => {
            const result = await menuCollections.find().toArray();
            res.send(result);
        })

        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollections.find().toArray();
            res.send(result);
        })

        //carts
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            if(!email){
                res.send([]);
            }
            const query = {user: email};
            const result = await cartCollections.find(query).toArray();
            res.send(result);
        })

        app.post('/carts', async (req, res) => {
            const item = req.body;
            const result = await cartCollections.insertOne(item);
            res.send(result);
        })

        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await cartCollections.deleteOne(query);
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