const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const cors = require("cors");
const db = require("./config/database");
process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "config");
const config = require("config");

// SETTINGS
app.use(cors());

app.set("port", process.env.PORT || 5005);

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/usuario", require("./routes/usuario"));
app.use("/api/auth", require("./routes/auth"));

// CONNECT TO DATABASE

db.terminal
  .authenticate()
  .then(() => console.log("Database conected..."))
  .catch((err) => console.log("error" + err));

// server escuchando

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

module.exports = app;
