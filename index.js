require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const PORT = process.env.SERVER_PORT || 9000;
const apiEclassRoutes = require("./server/routes/api-eclass");
const apiTaricRoutes = require("./server/routes/api-taric");
const apiPartsRoutes = require("./server/routes/api-parts");

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

app.use(express.static(path.join(__dirname, "build")));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/eclass", apiEclassRoutes);
app.use("/api/taric", apiTaricRoutes);
app.use("/api/parts", apiPartsRoutes);

app.listen(PORT, _ => console.log(`Server listening on PORT ${PORT}...`));
