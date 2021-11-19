const INITIAL_STATE = {
  products: [],
  categories: [],
  homeData: [],
  aboutData: [],
  contactData: []
};

function productReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOADPRODUCTS": {
      return {
        ...state,
        products: action.payload,
      };
    }
    case "LOADCATEGORIES": {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case "LOADHOMEDATA": {
      return {
        ...state,
        homeData: action.payload,
      };
    }
    case "LOADABOUTDATA": {
      return {
        ...state,
        aboutData: action.payload,
      };
    }
    case "LOADCONTACTDATA": {
      return {
        ...state,
        contactData: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
}

export default productReducer;
