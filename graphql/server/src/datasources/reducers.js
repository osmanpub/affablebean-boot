module.exports = {
  categoryReducer: (category) => ({
    ...category,
    id: category._id,
  }),
  productReducer: (product) => ({
    ...product,
    id: product._id,
  }),
};
