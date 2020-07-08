const { RESTDataSource } = require("apollo-datasource-rest");

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

    return response.categories.map((category) =>
      this.categoryReducer(category)
    );
  }

  async getCategoryProducts(id) {
    const response = await this.get(`category/${id}`);

    if (!response || !response.categoryProducts) {
      return {};
    }

    const { categories, category, products } = response.categoryProducts;

    return response
      ? {
          categories: categories.map((category) =>
            this.categoryReducer(category)
          ),
          category: this.categoryReducer(category),
          products: products.map((product) => this.productReducer(product)),
        }
      : {};
  }

  categoryReducer(category) {
    return {
      ...category,
      id: category._id,
    };
  }

  productReducer(product) {
    return {
      ...product,
      id: product._id,
    };
  }
}

module.exports = CategoryAPI;
