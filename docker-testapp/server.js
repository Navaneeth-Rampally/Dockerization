const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Pointing to your Docker container mapped to localhost:27017
const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
const client = new MongoClient(MONGO_URL);

// Connect to the database ONCE when the server starts
client.connect()
    .then(() => console.log('Connected successfully to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// GET all users
app.get("/getUsers", async (req, res) => {
    try {
        const db = client.db("Navaneeth-db");
        const data = await db.collection('users').find({}).toArray();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});

// POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        console.log("Received data:", userObj);
        
        const db = client.db("Navaneeth-db");
        const data = await db.collection('users').insertOne(userObj);
        
        console.log("Data inserted in DB:", data);
        res.send("User added successfully"); // Send a response back to the browser/client
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding user");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});