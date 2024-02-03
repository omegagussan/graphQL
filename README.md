# graphQL

## How to run
The /data folder is managed with git lfs. Follow https://git-lfs.com/ for instructors for how to setup. 

NodeJS - if you don't already have it installed, check out nvm. As described by the .nvmrc and package.json this is expected to run with Node 20

### To start the backend:

- Navigate to the project's root
- Run `npm ci`
- Run `npm start`

You can find the iteractive graphQL client on localhost:5000/graphql.


### Sample queries (for debugging)

 A sample query that you would expect to work is
```gql
query getAll($limit:Int!, $offset: Int!) {
  listInventory(limit:$limit, offset:$offset) {
    productId
  }
}
```
with the following parameters to control pagination:
```gql
{	
  "limit": 11,
  "offset": 1
}
```
and for using the mutation endpoint "updateInventory": 
```gql
mutation update($productId: String!, $product: Product!) {
  updateInventory(productId: $productId, product:$product){
    productId
    quantity
    name
  }
}
```
with the variables:
```gql
{	
  "productId": "prod1566#prod106041004115",
  "product": {
    "quantity": 100
  }
}
```

### Confessions, demarkcations and what I would have done if I had more time.

Ive spent in total probably 3-4 hours on this project, at least 2 of which was wasted trying to set typscript up to work correctly. I dont have a lot of experience with .ts, but Ive contributed to projects that already have it setup correclty and working. Unfortunalty figuring out how to do it with graphQL and express provide a bit too much for me for now (as I had no good template project to copy from either), and I resorted to plain old boring javascript to quickly produce something that we can talk around. Hopefully you can have oversight with this, when reviewing this solution. I want to pick .ts up and learn more going forward. The "order" and "product" classes are typical cases where types for validation would be nice.

I also hope you dont mind that Ive deviated from the instructions and not built a database. The test data is just too small to warrent its use, and I like to think that Im opposed to prematurly introducing tech that its not needed. Velocity above all, and just keeping data in memory is the quickest way to build something out. However I can say that if I had to do this (please email me back if its a dealbreaker for you guys...and I might look at it) I would have gone with Mongoose. Simply as I dont need relational data qualities, and its ideal for implementing the filters in a potential follow-up stage. It would look something like:

```js 

onst mongoose = require('mongoose')
const { Inventory, Order } = require('./models')

const DB_NAME = 'DemoDB'

const initiateDb = async () => {
  const mongod = new MongoMemoryServer({
    instance: {
      dbName: DB_NAME,
      dbPath: 'data',
      storageEngine: 'wiredTiger'
    }
  })
  await mongod.start()
  return mongod
}

const initiateMongoose = async () => {
  const mongod = await initiateDb()
  const uri = mongod.getUri()
  await mongoose.connect(uri, { dbName: DB_NAME })
  console.log('Connected to db', uri)
  return mongod
}

const dropDb = async () => {
  const mongod = await initiateMongoose()
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
  console.log('Database dropped')
}

const createInitialData = async () => {
  if ((await Item.find({})).length === 0) {
    await Promise.all([
      //TODO: this is where the implementation to look over the items we've stored in storage goes. For each Inventory.create() or Order.create()
    ])
    console.log('Finished creating initial data')
  }
}

module.exports = {
  initiateDb,
  initiateMongoose,
  dropDb,
  createInitialData
}
```

as well as some models:
```js
const { model, Schema } = require('mongoose')

const inventorySchema = new Schema({
    productId : String
    name : String
    quantity : Int
    category : String
    subCategory : String
})

const orderSchema = new Schema({
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
})


module.exports = {
  Inventory: model('Inventory', inventorySchema),
  Order: model('Order', orderSchema)
}
```

As you can see these schemas are very much similar to the classes we've created before, and by setting "required: true" in Mongoose, we can use this for schema validation also, releving some of the need for .ts as a tradeoff for velocity.

As for the design for implementing the filters and the sorting, Just outlining what I think is needed there. Its simply a matter of creating a filter object, which we can reuse the "Product" input for, and filtering out entires which does not match. Its not complicated, its just a matter of typing it out. By doing it this way you effectily allow for any combination of filters on all attributes!

As for the sorting order, there should only be two allowed values, quanity and number of orders. I would define an new Input which those options, as well as a third default which means "no sorting" and then simply use the javascript "sorted() method" as I hold all things in memory. Even with a mongoDB implementation, if we eventually want to list out all things... we need to keep it in memory at some point the way Ive implemented pagination. Ideally one paginates in the database (for SQL databases). As for NoSQL like this, we just have to read it up! 

Having default values in the graphql schema (graphql.js) is key so the user does not need to provide filters if they dont want to use them.

The one big thing that I additionally would have done is to write some integration tests, ideally testing the API as a client. That means Dockerizing the application, and probably running another process with Jest and a graphQL client to check that we map all things correctly, these very extensive tests should make sure to check that we map thing correctly in the api layer.

Finally, I wish to foward my feedback that its kind of hard to present any good design choices in this assignmnet. Its very much just build what you spell out, and that can both be less motivating, but also it deprives the candidate to show off what they think is important. Consider just removing some of the information and see what candidates choose to spend their time on? I.e is database needed?

The only choice (apart from chosing not to implement the DB) that I feel like I should justify is possibly mimicing the patch behaviour from REST on updates, where only fields that are provided are updated (and others are not set to null). This way the FE (Frontend) does not need to keep complete state. And it just makes development so much faster and more robust with a thin FE. 

Hopefully you want to meet up and I can verbally describe some of these things more in detail, and we can look at codestyle and unittests. Ultimatly I see this take home assingmnet more as a basis for discussion then a finalized project :]

Thanks in advance for your consideration! 