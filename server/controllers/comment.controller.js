const Comment = require("./../models/Comment");

module.exports = {
  addComment: (req, res) => {
    const reqBody = req.body;
    const newComment = new Comment({
      comment: reqBody.comment,
      articleId: reqBody.articleId
    });
    newComment.save((err, comment) => {
      if (err) {
        res.json({
          msg: Error
        });
      } else {
        res.json({
          comment
        });
      }
    });
  },
  getPreviousArticle: (req, res) => {
    const id = req.params.id;
    Comment.find({ articleId: id }, (err, comments) => {
      if (err) throw err;
      res.json(comments);
    });
  },
  deleteComment: (req, res) => {
    const id = req.body.id;
    Comment.deleteOne({ _id: id }, function(err) {
      if (err) {
        console.log("error");
      } else {
        Comment.find({ articleId: req.params.id }, function(err, comments) {
          if (err) throw err;
          res.json(comments);
        });
      }
    });
  }
};
