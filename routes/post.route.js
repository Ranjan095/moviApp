/** @format */

const { PostModle } = require("../models/post.modle");

const express = require("express");
const postRoute = express.Router();

postRoute.post("/add", async (req, res) => {
  try {
    const newPost = new PostModle(req.body);
    await newPost.save();
    res.status(200).send({ msg: "new post has been created" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.get("/",async(req,res)=>{
    const data=req.query;
    try {
    
        let post=await PostModle.find({authorId:req.body.authorId});
        res.status(200).send(post)
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
})

postRoute.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const post = await PostModle.findOne({ _id: id });
  try {
    if (post.authorId !== req.body.authorId) {
      res
        .status(200)
        .send({ msg: "you are not authorized person to update it" });
    } else {
      await PostModle.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ msg: "post is updated" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const post = await PostModle.findOne({ _id: id });
    try {
      if (post.authorId !== req.body.authorId) {
        res
          .status(200)
          .send({ msg: "you are not authorized person to delete it" });
      } else {
        await PostModle.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "post is deleted" });
      }
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  });
  

module.exports = { postRoute };
