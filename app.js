const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cors
app.use(cors());

//connect to mongodb atlas
mongoose.connect(
  "mongodb://test:test@cluster0-shard-00-00-wwzcb.mongodb.net:27017,cluster0-shard-00-01-wwzcb.mongodb.net:27017,cluster0-shard-00-02-wwzcb.mongodb.net:27017/gql-ninja?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.once("open", () => {
  console.log("we're connected!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
