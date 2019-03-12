const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const webpackDevMiddleware = require("webpack-dev-middleware");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 8000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./server/views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

mongoose.connect(
  "mongodb://localhost/TinyBlog",
  { useNewUrlParser: true },
  function(err, connection) {
    if (err) throw err;
    else console.log("Connected to mongodb");
  }
);

//webpack config
if (process.env.NODE_ENV === "development") {
  console.log("in webpack hot middleware");
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
}

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.use(require("./server/routes/index"));

app.listen(port, () => {
  console.log(`app is running on localhost:${port}`);
});
