import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  singleArticleDetails,
  addComment,
  getPreviousComments,
  deleteComment
} from "../actionCreator/actions";

class ArticleDetails extends Component {
  state = {
    comment: "",
    onComment: false
  };
  handleChange = e => {
    this.setState({
      comment: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    this.props.dispatch(
      addComment(
        {
          comment: this.state.comment,
          articleId: this.props.match.params.id
        },
        succeed => {
          if (succeed) {
            this.props.dispatch(getPreviousComments(id));
          }
        }
      )
    );
    document.querySelector("input").value = "";
  };
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.dispatch(singleArticleDetails(id));
    this.props.dispatch(getPreviousComments(id));
  };
  deleteComment = id => {
    const articleId = this.props.match.params.id;
    this.props.dispatch(
      deleteComment(id, articleId, succeed => {
        if (succeed) {
          this.props.dispatch(getPreviousComments(articleId));
        }
      })
    );
  };

  render() {
    const { article, comments, match } = this.props;
    const { onComment } = this.state;
    return (
      <div className="article-details">
        <div className="edit-link">
          <Link to={`/article/${match.params.id}/edit`}>
            <i class="fas fa-edit" />
          </Link>
          <i
            class="fas fa-comments"
            onClick={() => this.setState({ onComment: !this.state.onComment })}
          />
        </div>
        <div className="blog-wrapper">
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          {onComment ? (
            <div className="comment-container">
              <span className="comment-header">Comments</span>
              <ul>
                {comments &&
                  comments.map((comment, i) => (
                    <li key={i}>
                      <span>{comment.comment}</span>
                      <i
                        class="fas fa-trash"
                        onClick={() => this.deleteComment(comment._id)}
                      />
                    </li>
                  ))}
              </ul>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="comment-input"
                  onChange={this.handleChange}
                />
                <button>Comment</button>
              </form>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.targetArticle,
    comments: state.targetComments
  };
};

export default connect(mapStateToProps)(ArticleDetails);
