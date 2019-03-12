const url = "http://localhost:8000/api";

export function postArticle(data, cb) {
  return dispatch => {
    fetch(`${url}/article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "POST_ARTICLE", data: data.article });
        cb(true);
      });
  };
}

export function getArticle() {
  return dispatch => {
    fetch(`${url}/article`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "ALL_ARTICLES", data: data.allArticles });
      });
  };
}

export function singleArticleDetails(id) {
  return dispatch => {
    fetch(`${url}/article/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "TARGET_ARTICLE", data: data[0] });
      });
  };
}

export function addComment(data, cb) {
  return dispatch => {
    fetch(`${url}/article/${data.articleId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "ADD_COMMENT", data });
        cb(true);
      });
  };
}

export function getPreviousComments(id) {
  return dispatch => {
    fetch(`${url}/article/${id}/comment`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "TARGET_COMMENTS", data });
      });
  };
}

export function deleteComment(id, articleId, cb) {
  return dispatch => {
    fetch(`${url}/article/${articleId}/comment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "ADD_COMMENT", data });
        cb(true);
      });
  };
}

export function rePostArticle(data, id, cb) {
  return dispatch => {
    fetch(`${url}/article/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => cb(true));
  };
}
