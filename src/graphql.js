import { buildSchema } from "graphql";

const schema = buildSchema(`
      type Mutation {
        updateInventory(productId: String!, product: Product!): ProductWithOrders
      }
      type Query {
        listInventory(limit: Int!, offset: Int!): [ProductWithOrders]
      }
      input Product {
        productId : String
        name : String
        quantity : Int
        category : String
        subCategory : String
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

export {
    schema
}