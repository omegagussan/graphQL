class Order {
    constructor(orderId, productId, currency, quantity, shippingCost, amount, channel, channelGroup, campaign, dateTime) {
        this.orderId = orderId;
        this.productId = productId;
        this.currency = currency;
        this.quantity = quantity;
        this.shippingCost = shippingCost;
        this.amount = amount;
        this.channel = channel;
        this.channelGroup = channelGroup;
        this.campaign = campaign;
        this.dateTime = new Date(dateTime);
    }
}

module.exports = Order;