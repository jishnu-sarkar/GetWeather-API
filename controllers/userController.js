const res = require("express/lib/response");
const _ = require("lodash");
const hashedPassword = require("password-hash");
const db = require("../models");

const createUser = async (req, res) => {
  try {
    if (_.size(req.body.inputs) != 4) {
      return res.status(400).json({ message: "Insufficient Data to Proceed" });
    }

    const id = Math.floor(100000 + Math.random() * 900000);
    const hashedPass = hashedPassword.generate(req.body.inputs.password);

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
    console.log(emailExists);

    if (emailExists) {
      return res.status(409).json({ message: "Email already registered" });
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
    console.log(err.message);
    return res.status(464).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    if (_.size(req.body.inputs) != 2) {
      return res.status(400).json({ message: "Insufficient Data to Proceed" });
    }
    const email = req.body.inputs.email;

    const fetchUser = await db.sequelize.models.User.findUser(email);
    // console.log(fetchUser[0].password);

    if (!fetchUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(fetchUser.password);

    if (hashedPassword.verify(req.body.inputs.password, fetchUser.password)) {
      return res.status(200).json({
        message: "Logged In",
        // userDetails: fetchUser,
      });
    } else {
      return res.status(401).json({ message: "Incorrect Password" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(464).json({ message: err.message });
  }
};

const userSearchHistory = async (req, res) => {
  try {
    const userId = req.query.id;
    let limit = 10;
    if (req.query.limit) {
      limit = req.query.limit;
    }

    const values = {
      userId: userId,
      limit: parseInt(limit),
    };

    const result = await db.sequelize.models.Search.getSearchHistory(values);

    console.log(result);
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(464).json({ message: err.message });
  }
};

// const delUsers = async (req, res) => {
//   const result = await db.sequelize.models.User.deleteUsers();
//   return res.status(201).json({ Deleted: "All Record Deleted" });
// };

module.exports = {
  createUser: createUser,
  userLogin: userLogin,
  userSearchHistory: userSearchHistory,
  // delUsers: delUsers,
};
