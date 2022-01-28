require("dotenv").config();
const jwt = require("jsonwebtoken");
const joiValidator = require("joi");

const db = require("../models");

const validateRegistration = async (req, res, next) => {
  const data = req.body.inputs;
  //   console.log(data);

  const schema = joiValidator.object({
    firstName: joiValidator.string().required(),
    lastName: joiValidator.string(),
    email: joiValidator
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joiValidator
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    reEnterPassword: joiValidator.ref("password"),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(406).json({ message: error.message });
  }
  return next();
};

const validateLogin = async (req, res, next) => {
  const data = req.body.inputs;
  console.log(data);

  const schema = joiValidator.object({
    email: joiValidator
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joiValidator.string().required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(406).json({ message: error.message });
  }

  return next();
};

const validateUser = async (req, res, next) => {
  console.log("loginValidate");
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized Access" });

  jwt.verify(token, process.env.accessTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Sesson Expired" });
    req.user = user;
    next();
  });

  // const user = await db.sequelize.models.User.findUser(valid);
  // req.userId = user.id;
  // next();
};

module.exports = {
  validateRegistration: validateRegistration,
  validateLogin: validateLogin,
  validateUser: validateUser,
};
