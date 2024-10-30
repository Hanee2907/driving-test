const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  res.render("dashboard");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/g2", (req, res) => {
  res.render("g2");
});

router.get("/g", (req, res) => {
  res.render("g");
});

router.post("/save-data", async (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    licenseNo: req.body.licenseNumber,
    age: Number(req.body.age),
    carDetails: {
      make: req.body.car.make,
      model: req.body.car.model,
      year: Number(req.body.car.year),
      plateNo: req.body.car.plateNumber,
    },
  };

  try {
    const newUser = await User.create(userData);
    res.redirect("/g");
  } catch (error) {
    console.error("Error saving data:", error);
    res.redirect("/g2");
  }
});

router.post("/fetch-user", async (req, res) => {
  const licenseNo = req.body.licenseNo;

  try {
    const user = await User.findOne({ licenseNo });
    if (!user) {
      res.render("g", { error: "User not found", licenseNo });
    } else {
      res.render("g", { user });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.render("g", { error: "An error occurred", licenseNo });
  }
});

router.post("/update-user", async (req, res) => {
  const licenseNo = req.body.licenseNo;

  try {
    const user = await User.findOne({ licenseNo });
    if (!user) {
      res.render("g", { error: "User not found", licenseNo });
    } else {
      user.carDetails.make = req.body.carMake;
      user.carDetails.model = req.body.carModel;
      user.carDetails.year = Number(req.body.carYear);
      user.carDetails.plateNo = req.body.plateNo;

      await user.save();
      res.render("g", { user });
    }
  } catch (error) {
    console.error("An error occurred", error);
    res.render("g", { error: "An error occurred", licenseNo });
  }
});

module.exports = router;
