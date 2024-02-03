import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { Product } from './domain/product.js';
import { Order } from './domain/order.js';


const readCSV = async (path, type) => {
    return new Promise((resolve, reject) => {
        const data = [];
        createReadStream(path)
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
                return resolve(data);
            })
            .on("error", function (error) {
                console.log(error.message);
                return reject(error);
            });
    });
}

export async function Inventory() { return await readCSV('./data/inventory.csv', Product); }
export async function Orders() { return await readCSV('./data/orders.csv', Order); }
