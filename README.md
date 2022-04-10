## Crave Tech Assessment

This is a nestjs project which utilizes graphql queries for 
fetching and retrieving data using nestjs "CacheManager" in memory store.

### Installation

```bash
$ npm install
```

### Running the app

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
This design helps to improve scalabilty and data redundancy, when there needs to be a change 
in schema logic, this is easily achieved because the schemas are independent and would not have
great impact on other schemas, data and business logic.

#### Cons
This leads to more queries as a result of the additional tables from the 
database relationships.

#### Sample graphgl queries
Here are some of the graphql queries used. 

- Create a phase
```
mutation {
  createPhase(phase: {
    id:1,
    title: "Foundation"
  }) {
    id,
    title
  } 
}
```
- Get phases
```
query {
  getPhases {
    id,
    title,
    tasks {
      id,
      title
    },
    createdAt
  }
}
```
- Create a start up
```
mutation {
  createStartUp(startUp: {
    id:1,
    name: "Smartyinukse Inc"
  }){
    name
  }
}
```
- Create a task
```
mutation {
  createTask(task: {
    id:1,
    title: "Setup virtual office",
  }) {
    id,
    title
  }
}
```
- Set a task to completed
```
mutation {
  updateTaskCompletion(taskCompletion: {
    id: 1,
    startUp:{
    id:1,
    name: "Smartyinukse Inc"
    },
    task: {
    id:1,
    title: "Setup virtual office",
    },
    phase: {
    id: 1,
    title: "Foundation",
    }
    
  }),{
    id,
    startUp {
      id,
      name
    },
    task {
    id,
    title,
    },
    phase {
      id
    }
  }
}
```
- Get phases with task info
```
query {
  getPhaseStepsByStartUpId(id:1) {
    id,
    title,
    tasks {
      id,
      title
    }
  }
}
```