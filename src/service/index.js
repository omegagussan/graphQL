import { Inventory, Orders } from "./../storage";

const listInventory = async () => {
    const inventory = await Inventory();
    const orders = await Orders();
    return listInventoryInternal(inventory, orders)
}

const listInventoryInternal = async (inventory, orders) => {
    return inventory.map((product) => {
      return {
        ...product,
        orders: orders.filter((order) => order.productId === product.productId),
      };
    });
}

module.exports = {
    listInventory,
    listInventoryInternal
}