## Crave Tech Assessment

This is a nestjs project which utilizes graphql queries for 
fetching and retrieving data using nestjs "CacheManager" in memory store ,

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



    

### ERD of the database tables
![ERD FOR THE DATABASE SCHEMAS](https://res.cloudinary.com/dms3x0fk0/image/upload/v1649548676/CRAVE-TECH-ERD_e92uch.jpg)

#### Pros
This design helps to improve scalabilty and data redundancy.

#### Cons
This result into more queries as a result of the extra tables.