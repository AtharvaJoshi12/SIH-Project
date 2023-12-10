const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up EJS and EJS layouts
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

// Set up session and flash messages
app.use(
  session({
    secret: "CgdsfdtfdgfcfdsrmnbSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

// Include routes
const routes = require("./server/routes/appRoutes.js");
app.use("/", routes);

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
