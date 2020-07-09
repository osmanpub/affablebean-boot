const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Cart {
    items: [CartItem]!
  }

  type CartItem {
    product: Product!
    quantity: Int!
    total: Float!
  }

  type Category {
    id: ID!
    name: String!
  }

  type CategoryProducts {
    categories: [Category]!
    category: Category!
    products: [Product]!
  }

  type Customer {
    id: ID!
    name: String!
    email: String!
    phone: String!
    address: String!
    city_region: String!
    creditCard: String!
  }

  type Product {
    id: ID!
    description: String
    name: String!
    price: Float!
  }

  type Subject {
    id: ID!
    name: String!
  }

  type Query {
    categories: [Category]!
    category(id: String!): CategoryProducts!
    subjects: [Subject]!
  }

  type Mutation {
    # addToCart(
    #   id: ID!
    # ): AddToCartResponse!

    # clearCart(
    # ): ClearCartResponse!

    contact(
      name: String!
      email: String!
      msg: String!
      subjectId: String!
    ): ContactResponse!

    # updateCart(
    #   id: ID!
    #   qty: Int!
    # ): UpdateCartResponse!
  }

  # type AddToCartResponse {
  #   items: [CartItem]!,
  #   numberOfItems: Int!
  #   subtotal: Float!
  # }

  # type ClearCartResponse {
  #   success: Boolean!
  # }

  type ContactResponse {
    success: Boolean!
  }

  # type Order {
  #   customer: Customer!,
  #   orderedProducts,
  #   orderRecord: customerOrder,
  #   products: [Products]!,

  # }

  # type PurchaseResponse {
  #   order: Order!
  #   success: Boolean!
  # }

  # type UpdateCartResponse {
  #   items: [CartItem]!,
  #   numberOfItems: Int!
  #   subtotal: Float!
  # }
`;

module.exports = typeDefs;
