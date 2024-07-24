const router = require("express").Router();
const User = require("../model/User.js");
const bcrypt = require("bcrypt");

// update user (profile)
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account!!!!");
  }
});

// delete user (profile)
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account!!!!");
  }
});

// get user (profile)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const id = req.params.id;
      const currentUserId = req.body.userId;

      const user = await User.findById(id);
      const currentUser = await User.findById(currentUserId);

      if (!user.followers.includes(currentUserId)) {
        await user.updateOne({ $push: { followers: currentUserId } });
        await currentUser.updateOne({ $push: { followings: id } });
        return res.status(200).json("User has been followed");
      } else {
        return res.status(403).json("You already follow this user");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can't follow yourself");
  }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const id = req.params.id;
      const currentUserId = req.body.userId;

      const user = await User.findById(id);
      const currentUser = await User.findById(currentUserId);

      if (user.followers.includes(currentUserId)) {
        await user.updateOne({ $pull: { followers: currentUserId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        return res.status(200).json("User has been unfollowed");
      } else {
        return res.status(403).json("You don't follow this user. No unfollowing!!");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can't unfollow yourself");
  }
});

module.exports = router;
