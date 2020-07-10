const { RESTDataSource } = require("apollo-datasource-rest");
const { categoryReducer, productReducer } = require("./reducers");

class CategoryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3001/";
  }

  async getAllCategories() {
    const response = await this.get("categories");

    if (!response || !response.categories) {
      return [];
    }

    return response.categories.map((category) => categoryReducer(category));
  }

  async getCategoryProducts(id) {
    const response = await this.get(`category/${id}`);

    if (!response || !response.categoryProducts) {
      return {};
    }

    const { categories, category, products } = response.categoryProducts;

    return response
      ? {
          categories: categories.map((category) => categoryReducer(category)),
          category: categoryReducer(category),
          products: products.map((product) => productReducer(product)),
        }
      : {};
  }
}

module.exports = CategoryAPI;
