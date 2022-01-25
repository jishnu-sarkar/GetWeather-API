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

  //   const payLoad = {
  //     firstname: `${data.firstName}`,
  //     lastname: `${data.lastName}`,
  //     email: `${data.email}`,
  //     password: `${data.password}`,
  //     reEnterPassword: `${data.reEnterPassword}`,
  //   };
  //   console.log(payLoad);

  const { error } = schema.validate(data);

  if (error) {
    return res.status(406).json({ message: error.message });
  }
  // req.val = "1234";
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
  // console.log(process.env.tokenJWT);
  if (!process.env.tokenJWT) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  const valid = jwt.verify(process.env.tokenJWT, "secret");
  // console.log(valid);
  // const check = await db.sequelize.models.User.findUser(email);
  const user = await db.sequelize.models.User.findUser(valid);
  req.userId = user.id;
  // console.log("\n\n");
  next();
};

module.exports = {
  validateRegistration: validateRegistration,
  validateLogin: validateLogin,
  validateUser: validateUser,
};
