require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const path = require("path");
const passport = require("passport");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const PORT = process.env.SERVER_PORT || 9000;
const apiEclassRoutes = require("./server/routes/api-eclass");
const apiTaricRoutes = require("./server/routes/api-taric");
const apiPartsRoutes = require("./server/routes/api-parts");
const apiAuthRoutes = require("./server/routes/api-auth");
const adminRoutes = require("./server/routes/admin");

const app = express();

// connect to the database and load models
require("./server/models").connect(process.env.MONGODB_URI);

app.use(express.static(path.join(__dirname, "build")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require("./server/passport/local-signup");
const localLoginStrategy = require("./server/passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require("./server/middleware/auth-check");
app.use("/admin", authCheckMiddleware);

app.use("/api/eclass", apiEclassRoutes);
app.use("/api/taric", apiTaricRoutes);
app.use("/api/parts", apiPartsRoutes);
app.use("/auth", apiAuthRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, _ => console.log(`Server listening on PORT ${PORT}...`));
