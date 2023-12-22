const express = require('express')
const cors = require('cors')
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});
async function run() {
     const ComponentCollection = client.db("Components").collection("component");
     app.get('/component', async (req, res) => {
          const result = await ComponentCollection.find().toArray();
          res.send(result)

     })
     await client.db("admin").command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");

}
run().catch(console.dir);
app.listen(port, function () {
     console.log(` CORS-enabled web server listening on port  ${port}`)
})