# graphQL

## How to run
The /data folder is managed with git lfs. Follow https://git-lfs.com/ for instructors for how to setup. 

NodeJS - if you don't already have it installed, check out nvm.

### To start the backend:

- Navigate to the project's root
- Run `npm ci`
- Run `npm start`

You can find the iteractive graphQL client on localhost:5000/graphql. A sample query that you would expect to work is
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