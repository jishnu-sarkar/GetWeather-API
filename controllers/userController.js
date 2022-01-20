const res = require("express/lib/response");
const _ = require("lodash");
const db = require("../models");

const createUser = async (req, res) => {
  try {
    if (_.size(req.body.inputs) != 4) {
      return res.status(400).json({ message: "Unsufficient Data to Proceed" });
    }

    // let id = Math.floor(100000 + Math.random() * 900000);

    const userDetails = {
      // Id: id,
      firstName: req.body.inputs.firstName,
      lastName: req.body.inputs.lastName,
      email: req.body.inputs.email,
      password: req.body.inputs.password,
    };

    const emailExists = await db.sequelize.models.User.findEmail(
      userDetails.email
    );
    // console.log("im checking email" + emailExists);

    if (emailExists) {
      res.status(409).json({ message: "Email already registered" });
    }

    const result = await db.sequelize.models.User.createUser(userDetails);
    if (result) {
      return res.status(201).json({
        message: "User Created",
        details: result,
      });
    } else {
      return res.status(404).json({ message: "Something Went Wrong!!!" });
    }
  } catch (err) {
    // console.log(err.message);
    return res.status(464).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    userDetails = {
      email: req.body.inputs.email,
      password: req.body.inputs.password,
    };
    const fetchUser = await db.sequelize.models.User.fetchUser(userDetails);
    console.log(fetchUser);
    if (!fetchUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Loggd In" });
  } catch (err) {
    return res.status(464).json({ message: err.message });
  }
};

module.exports = {
  createUser: createUser,
  userLogin: userLogin,
};
