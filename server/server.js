import path from "path";
import express from "express";
import { MongoClient } from "mongodb";
import template from "./../template";
import config from "../config/config";
//comment out before building for production
import devBundle from "./devBundle";

const app = express();
//comment out before building for production
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(template());
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

// Database Connection URL
const url =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";
// Use connect method to connect to the server
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    console.log("Connected successfully to mongodb server");
    db.close();
  }
);
