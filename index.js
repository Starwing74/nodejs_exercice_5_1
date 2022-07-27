const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const PORT = 4000;

const myschema = buildSchema(
  `type Query {
    products: [Product]
    orders: [Order]
  }
  type Product {
    id: ID!
    name: String!
    price: Float!
    reviews: [Review]
  }
  type Review {
    ratings: Int!
    comment: String
  }
  type Order {
    date: String!
    subtotal: Float!
    items: [OrderItem]
  }
  type OrderItem {
    product: Product!
    quantity: Int!
  }
  `
);

const myroot = {
    products: [
        {id: 0, name: 'Iphone', price: 200},
        {id: 1, name: 'Dell', price: 50},
        {id: 2, name: 'Samsung', price: 100},
    ], orders: [
        {
            data: '22/03/2022', subtotal: 200,
            item: [{product: {id: 2, name: 'Samsung', price: 100}, quantity: 2}]
        }
    ]
}

app.use('/graphql', graphqlHTTP({
    schema: myschema,
    rootValue: myroot,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})