# To do list app

### Stack/Framework

- Front-end - Vue Js (Nuxt - framework, Vuex store, Jest(test))
- Back-end (API Server) - Node-Express js, mocha(Testing)
- Db: mongo
- Docker (Docker-compose)

### Steps for Deployment using docker-compose

- Clone the repo (checkout `devlop` branch)
- ``docker-compose build``
- `` docker-compose run node npm install``
- ``docker-compose run nodefr npm install``
- ``docker-compose up``
- Open `http://localhost:8080/ `
- Backend unit test `docker-compose run node npm run test`.

### Steps for local deployment (Without docker)
- Set up the mongoDB on local

---Backend---
  
- ``cd backend`` and `npm install`
- Put the connection URL of mongo DB in ``.env`` file
- (Optional) Set the test DB connection string on ``test/testConfig.js``
- ``npm start``

---Front end ---

-  ``cd frontend`` and `npm install`
-  check the ``nuxt.config.js`` file for API configuration
-  `npm run dev`  


### Port details

- Front end - `8080`
- Mongo -  `27017` 
- API backend - `3000`

### Architecture diagram

inside ``Architechture diagram`` folder

### API Documentation(CURL)

#### Login user
```shell
curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data email=admin@admin.com \
  --data password=123456
```

#### Register user

```shell
curl --request POST \
  --url http://localhost:3000/api/auth/register \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data firstName=akhil \
  --data lastName=akhil \
  --data password=123456 \
  --data email=akhil1212@admin.com
```

#### Get all Todos

```shell
curl --request GET \
  --url http://localhost:3000/api/todo \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data limit=11
```

#### Get all Todos of a user

```shell
curl --request GET \
  --url http://localhost:3000/api/todo-data \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data id=<TODO_ID>
```

#### Create a new Todo

```shell
curl --request POST \
  --url http://localhost:3000/api/todo \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded'
```

#### Update Todo Title

```shell
curl --request PUT \
  --url http://localhost:3000/api/todo/<TODO-ID> \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data title=<NEW TITLE>
```

#### Delete a Todo

```shell
curl --request DELETE \
  --url http://localhost:3000/api/todo/<TODO_ID> \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded'
```

#### Add a note to todo

```shell
curl --request POST \
  --url http://localhost:3000/api/todo-data \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data id=<TODO_ID> \
  --data 'data=<Data>' \
  --data order=<ORDER>
```

#### Delete Note

```shell
curl --request DELETE \
  --url http://localhost:3000/api/todo-data/<NOTE-ID>/<TODO-ID> \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded'
```

#### Update Note

```shell
curl --request PUT \
  --url http://localhost:3000/api/todo-data/<NOTEID> \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data checked=true \
  --data id=<TODO-ID>
```
