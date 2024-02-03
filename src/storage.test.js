/* eslint-env jest */
import { Inventory, Orders } from './storage'; 

describe('Storage.js', () => {
  test('Inventory is parsed OK', async () => {
    const resolvedInventory = await Inventory();
    const expected = {
      "category": "Shoes", 
      "name": "High-top sneakers", 
      "productId": "prod1548#prod104001000080", 
      "quantity": "8", 
      "subCategory": "Sneakers"
    };
    expect(resolvedInventory[0]).toEqual(expected)
  })

  test('Orders is parsed OK', async () => {
    const resolvedInventory = await Orders();
    const expected = {
     "amount": "7095.93",
     "campaign": "",
     "channel": "direct",
     "channelGroup": "sem",
     "currency": "SEK",
     "dateTime": new Date("2023-02-01T17:12:52.000Z"),
     "orderId": "efb921c1-6733-3811-b4c2-aa0d80800638",
     "productId": "prod1520#prod100011001100",
     "quantity": "1",
     "shippingCost": "0",
    }
    expect(resolvedInventory[0]).toEqual(expected)
  })
})