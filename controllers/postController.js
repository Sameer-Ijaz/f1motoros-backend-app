const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      date: req.body.date,
      image: req.file.filename,
    });
    const postData = await post.save();
    res.status(200).send({ success: true, msg: "Post Added", data: postData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const post = await Post.find({});
    res.status(200).send({ success: true, msg: "Posts", data: post });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const deletePosts = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({ _id: id });
    res.status(400).send({ success: true, msg: "Post Deleted" });
  } catch (error) {
    res.status(200).send({ success: false, msg: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePosts,
};
