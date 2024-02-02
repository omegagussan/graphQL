const fs = require('fs');
const { parse } = require('csv-parse');
console.log("Current directory:", __dirname);
const Product = require('./domain/product');
const Order = require('./domain/order');


const readCSV = async (path, type) => {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(path)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                if (type == Product){
                    const [productId, name, quantity, category, subCategory] = row;
                    data.push(new Product(productId, name, quantity, category, subCategory));
                }else{
                    const [orderId, productId, currency, quantity, shippingCost, amount, channel, channelGroup, campaign, dateTime] = row;
                    data.push(new Order(orderId, productId, currency, quantity, shippingCost, amount, channel, channelGroup, campaign, dateTime));
                }
            })
            .on("end", function () {
                console.log("finished");
                return resolve(data);
            })
            .on("error", function (error) {
                console.log(error.message);
                return reject(error);
            });
    });
}

module.exports = {
    Inventory : async () => await readCSV('./data/inventory.csv', Product),
    Orders : async () => await readCSV('./data/orders.csv', Order)
}
