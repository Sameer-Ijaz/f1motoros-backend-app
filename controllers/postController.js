const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    if (req.file != undefined) {
      const post = new Post({
        title: req.body.title,
        date: req.body.date,
        image: req.file.filename,
      });
      const postData = await post.save();
      res
        .status(200)
        .send({ success: true, msg: "Post Added", data: postData });
    } else {
      const post = new Post({
        title: req.body.title,
        date: req.body.date,
      });
      const postData = await post.save();
      res
        .status(200)
        .send({ success: true, msg: "Post Added", data: postData });
    }
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

const updatePosts = async (req, res) => {
  try {
    var id = req.body.id;
    var title = req.body.title;
    var date = req.body.date;

    if (req.file !== undefined) {
      var filename = req.file.filename;
      await Post.findByIdAndUpdate(
        { _id: id },
        { $set: { title: title, date: date, image: filename } }
      );
    } else {
      await Post.findByIdAndUpdate(
        { _id: id },
        { $set: { title: title, date: date } }
      );
    }

    res.status(200).send({ success: true, msg: "Post Updated" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: "Post Not Updated", error: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePosts,
  updatePosts,
};
