import { Inventory, Orders } from "./../storage.js";

let inventory = null;
let orders = null;

const listInventory = async (params) => {
    if (!inventory) {
        inventory = await Inventory();
    }
    if (!orders) {
        orders = await Orders();
    }
    return listInventoryInternal(inventory, orders, params?.limit, params?.offset)
}

const listInventoryInternal = async (inventory, orders, limit = 10, offset = 0) => {
    const results = inventory.map((product) => enrichWithOrders(product, orders));
    const upper = (offset + limit) >= results.length ? results.length : offset + limit;
    return results.slice(offset, upper);
}

const updateInventory = async ({productId, product}) => {
    if (!inventory) {
      inventory = await Inventory();
    }
    if (!orders) {
      orders = await Orders();
    }
    return updateInventoryInternal(inventory, productId, product);
}

const enrichWithOrders = (product, orders) => ({
  ...product,
  orders: orders.filter((order) => order.productId === product.productId),
})

const updateInventoryInternal = async (inventory, orders, productId, product) => {
  const index = inventory.findIndex((i) => i.productId === productId);

  // obs! slightly different then statuscodes in REST. GraphQL "working" answers with 200 OK
  if (index === -1) {
      return null;
  }
  inventory[index] = updateIfPresent(inventory[index], product);
  return enrichWithOrders(inventory[index], orders);
}


//mimics patch behaviour from REST
const updateIfPresent = (old, newProduct) => {
  return {
    productId: old.productId,
    name: newProduct.name || old.name,
    quantity: newProduct.quantity || old.quantity,
    category: newProduct.category || old.category,
    subCategory: newProduct.subCategory || old.subCategory,
  };
}


export {
    listInventory,
    listInventoryInternal,
    updateInventory,
    updateInventoryInternal
}
