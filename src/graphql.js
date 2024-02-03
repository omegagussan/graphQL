import { buildSchema } from "graphql";

// GraphQL Schema
const schema = buildSchema(`
      type Query {
        listInventory(limit: Int!, offset: Int!): [Image]
      }
      type ProductWithOrders {
        productId : String
        name : String
        quantity : Int
        category : String
        subCategory : String
        orders : [Order]
      }
      type Order {
        orderId : String
        productId : String
        currency : String
        quantity : Int
        shippingCost : Float
        amount : Float
        channel : String
        channelGroup : String
        campaign : String
        dateTime : String
      }
`);

module.exports = {
    schema
}