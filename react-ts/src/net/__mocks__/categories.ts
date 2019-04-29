import { createAction } from "redux-starter-kit";

export const fetchCategoriesIfNeeded = () => (
  dispatch: Function,
  getState: Function
) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories());
  }
};

const receiveCategories = createAction("RECEIVE_CATEGORIES");

const fetchCategories = () => (dispatch: Function) => {
  const categoryList = [
    {
      id: 1,
      name: "dairy",
      _links: {
        self: { href: "http://localhost:8080/api/categories/1" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 2,
      name: "meats",
      _links: {
        self: { href: "http://localhost:8080/api/categories/2" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 3,
      name: "bakery",
      _links: {
        self: { href: "http://localhost:8080/api/categories/3" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 4,
      name: "fruit & veg",
      _links: {
        self: { href: "http://localhost:8080/api/categories/4" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 5,
      name: "cereals",
      _links: {
        self: { href: "http://localhost:8080/api/categories/5" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 6,
      name: "drinks",
      _links: {
        self: { href: "http://localhost:8080/api/categories/6" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    }
  ];

  dispatch(receiveCategories(categoryList));
};

const shouldFetchCategories = (state: any) => {
  const categories = state.categories.items;

  if (categories.length === 0) {
    return true;
  }

  if (categories.isFetching) {
    return false;
  }

  return categories.didInvalidate;
};
