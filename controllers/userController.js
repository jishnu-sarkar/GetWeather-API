require("dotenv").config();

const jwt = require("jsonwebtoken");
const _ = require("lodash");
const hashedPassword = require("password-hash");
const Chance = require("chance");
const chance = new Chance();

const db = require("../models");

const createUser = async (req, res) => {
  try {
    const id = chance.integer({ min: 100000, max: 999999 });
    const hashedPass = hashedPassword.generate(req.body.inputs.password);
    // console.log(id, hashedPass);

    const userDetails = {
      id: id,
      firstName: req.body.inputs.firstName,
      lastName: req.body.inputs.lastName,
      email: req.body.inputs.email,
      password: hashedPass,
    };

    const emailExists = await db.sequelize.models.User.findUser(
      userDetails.email
    );
    // console.log(emailExists);

    if (emailExists) {
      return res.status(200).json({ message: "Email already registered" });
    }

    const result = await db.sequelize.models.User.createUser(userDetails);

    if (!result) {
      return res.status(500).json({ message: "Something Went Wrong!!!" });
    }
    const accessToken = jwt.sign(
      { email: userDetails.email },
      process.env.accessTokenSecret,
      { expiresIn: "10m" }
    );

    // console.log(accessToken);

    return res.status(201).setHeader("token", accessToken).json({
      // token: accessToken,
      message: "User Created",
      details: result.email,
    });
  } catch (err) {
    // console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const email = req.body.inputs.email;

    const fetchUser = await db.sequelize.models.User.findUser(email);

    if (!fetchUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!hashedPassword.verify(req.body.inputs.password, fetchUser.password)) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const accessToken = jwt.sign({ email }, process.env.accessTokenSecret, {
      expiresIn: "10m",
    });

    return res.status(200).setHeader("token", accessToken).json({
      // token: accessToken,
      message: "Logged In",
    });
  } catch (err) {
    // console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

const userSearchHistory = async (req, res) => {
  try {
    let limit = 10;
    if (req.query.limit) {
      limit = req.query.limit;
    }

    const values = {
      userId: req.userId,
      limit: parseInt(limit),
    };

    const result = await db.sequelize.models.Search.getSearchHistory(values);

    if (_.isEmpty(result))
      return res.status(404).json({ messsage: "No Search Result Found" });

    // console.log(result);
    return res.status(200).json({ result });
  } catch (err) {
    // console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser: createUser,
  userLogin: userLogin,
  userSearchHistory: userSearchHistory,
  // delUsers: delUsers,
};
