import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($id: String!) {
    category(id: $id) {
      category {
        id
        name
      }
      categories {
        id
        name
      }
      products {
        id
        name
        description
        price
      }
    }
  }
`;

export const GET_SUBJECTS = gql`
  query GetSubjects {
    subjects {
      id
      name
    }
  }
`;
