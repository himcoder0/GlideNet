const router = require("express").Router();
const User = require('../model/User.js');
const bcrypt = require('bcrypt');

// register user
router.post("/register", async (req, res) => {

  try{
    // generate hashed password with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch(error) {
    res.status(500).json(error);
  }

});


// login user
router.post("/login", async (req, res) => {

  try{
    // find if user with email exists
    const user = await User.findOne({email : req.body.email});
    !user && res.status(404).json("User not found");

    // check for password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(404).json("Wrong password");

    res.status(200).json(user);
  } catch(error) {
    res.status(500).json(error);
  }

});

module.exports = router;
