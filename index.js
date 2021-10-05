const http = require("http");
const server = http.createServer();
const port = "8080";
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://test:test@cluster0.zbahk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const database = "dbwork"

const client = new MongoClient(url, { useNewUrlParser: true });

const students = [
    {
        name: { first: "joe", last: "appleton" },
        dob: new Date("August 12, 1982"),
    },
    {
        name: { first: "bill", last: "smith" },
        dob: new Date("August 22, 1982"),
    },
    {
        name: { first: "Ally", last: "Barker-Cox" },
        dob: new Date("January 28, 1983"),
    },
];

server.on("request", async (req, res) => {

    try {
        await client.connect();
        const db = client.db(database);
        const collection = db.collection("students")
        await collection.insertMany(students);
        res.end("Request Ended");

    } catch (error) {
        console.log(`could not update ${error}`);
    }
});



server.listen(8080);