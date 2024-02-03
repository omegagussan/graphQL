import { Inventory, Orders } from "./../storage.js";

const listInventory = async (params) => {
    const inventory = await Inventory();
    const orders = await Orders();
    return listInventoryInternal(inventory, orders, params?.limit, params?.offset)
}

const listInventoryInternal = async (inventory, orders, limit = 10, offset = 0) => {
    const results = inventory.map((product) => {
      return {
        ...product,
        orders: orders.filter((order) => order.productId === product.productId),
      };
    });
    const upper = (offset + limit) >= results.length ? results.length : offset + limit;
    return results.slice(offset, upper);
}

export {
    listInventory,
    listInventoryInternal
}