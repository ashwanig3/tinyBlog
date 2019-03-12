const express = require("express");
const articleController = require("./../controllers/article.controller");
const commentController = require("./../controllers/comment.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/article/:id", (req, res) => {
  res.render("index");
});

router.post("/api/article", articleController.postArticle);

router.get("/api/article", articleController.getArticles);

router.get("/api/article/:id", articleController.getArticleDetails);

router.post("/api/article/:id/comment", commentController.addComment);

router.get("/api/article/:id/comment", commentController.getPreviousArticle);

router.delete("/api/article/:id/comment", commentController.deleteComment);

router.put("/api/article/:id/edit", articleController.updateArticle);

module.exports = router;
