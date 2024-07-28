const router = require("express").Router();
const User = require("../model/User.js");
const Post = require("../model/Post.js");
const bcrypt = require("bcrypt");

// create a post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    } else {
      return res.status(403).json("You can only update your own posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ _id: req.params.id });
      res.status(200).json("Post deleted");
    } else {
      return res.status(403).json("You can only delete your own posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(403).json("Post disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(403).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get timeline post - own post + friends post (all feed posts)
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const currentUserPosts = await Post.find({ userId: req.body.userId });
    const friendPosts = await Promise.all(
      currentUser.followings.map(async (friendId) => {
        return await Post.find({ userId: friendId });
      })
    );
    res.status(200).json(currentUserPosts.concat(...friendPosts)); // concat both
  } catch (error) {
    res.status(500).json(error);
  }
});

// get user's own post
router.get("/profile/:username", async (req, res) => {
  try {
    const currentUser = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: currentUser._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
