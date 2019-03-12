import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Articles from "./components/Articles";
import ArticleDetails from "./components/ArticleDetails";
import EditArticle from "./components/EditArticle";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="header">
            <Link to="/" className="app-name">
              tinyBlog
            </Link>
          </div>
          <Switch>
            <Route path="/" exact component={Articles} />
            <Route path="/article/:id" exact component={ArticleDetails} />
            <Route path="/article/:id/edit" exact component={EditArticle} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
