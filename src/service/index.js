import { Inventory, Orders } from "./../storage";

const listInventory = async (limit=10, offset=0) => {
    const inventory = await Inventory();
    const orders = await Orders();
    return listInventoryInternal(inventory, orders, limit, offset)
}

const listInventoryInternal = async (inventory, orders, limit, offset) => {
    const results = inventory.map((product) => {
      return {
        ...product,
        orders: orders.filter((order) => order.productId === product.productId),
      };
    });
    return results.slice(offset, offset + limit ? offset + limit : results.length);
}

module.exports = {
    listInventory,
    listInventoryInternal
}