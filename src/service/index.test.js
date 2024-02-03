/* eslint-env jest */
import { listInventoryInternal } from './index'; 

const Inventory = [{
    "category": "Shoes", 
    "name": "High-top sneakers", 
    "productId": "point-of-testing", 
    "quantity": "8", 
    "subCategory": "Sneakers"
  }];

const Orders = [{
    "amount": "7095.93",
    "campaign": "",
    "channel": "direct",
    "channelGroup": "sem",
    "currency": "SEK",
    "dateTime": new Date("2023-02-01T17:12:52.000Z"),
    "orderId": "123",
    "productId": "point-of-testing",
    "quantity": "1",
    "shippingCost": "0",
   },
   {
    "amount": "7095.93",
    "campaign": "",
    "channel": "direct",
    "channelGroup": "sem",
    "currency": "SEK",
    "dateTime": new Date("2023-02-01T17:12:52.000Z"),
    "orderId": "abc",
    "productId": "not-matching",
    "quantity": "1",
    "shippingCost": "0",
   },
   {
    "amount": "7095.93",
    "campaign": "",
    "channel": "direct",
    "channelGroup": "sem",
    "currency": "SEK",
    "dateTime": new Date("2023-02-01T17:12:52.000Z"),
    "orderId": "xyz",
    "productId": "point-of-testing",
    "quantity": "1",
    "shippingCost": "0",
   },];

describe('Service', () => {
    test('Will join inventory and orders', async () => {
        const expected = {
            ...Inventory[0],
            "orders": [Orders[0], Orders[2]]
        };
        await expect(listInventoryInternal(Inventory, Orders)).resolves.toEqual([expected])
    })
})