const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  articleId: { type: Schema.Types.ObjectId, ref: "Article" },
  comment: String
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
