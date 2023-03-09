const userModel = require("../models/uerModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//genarate token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.status(400).json("email already exist");
    }

    //empty fields check
    if (!name || !email || !password) {
      return res.status(400).json("all fields require");
    }

    //valid email check
    if (!validator.isEmail(email)) {
      return res.status(400).json("email invalid");
    }

    //strong password check
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json(
          "password must be contain one uppercase,lowercase,number,one symble and minimum 8 chars"
        );
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //create user
    const user = await userModel.create({ name, email, password: hash });

    // create token
    const token = createToken(user._id);
    res
      .status(200)
      .json({ _id: user._id, name, email, password: user.password, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("invalid email or password");

      //compair password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json("incorrect password");
      }
    }

    //create a token
    const token = createToken(user._id);
    res.status(200).json({
      id: user.id,
      name: user.name,
      email,
      password: user.password,
      token,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { registerUser, loginUser };
