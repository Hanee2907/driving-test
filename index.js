const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const routes = require("./Routes/routes");

app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://patelhanee73:Hanee%402907@cluster0.pxrilk7.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen("1234", () => {
  console.log(`Server running at http://localhost:1234`);
});
