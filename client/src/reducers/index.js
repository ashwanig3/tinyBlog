const initState = {
  articles: [],
  targetArticle: {},
  targetComments: []
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "ALL_ARTICLES": {
      return {
        ...state,
        articles: action.data
      };
    }
    case "TARGET_ARTICLE": {
      return {
        ...state,
        targetArticle: action.data
      };
    }
    case "TARGET_COMMENTS": {
      return {
        ...state,
        targetComments: action.data
      };
    }
    default:
      return state;
  }
}
