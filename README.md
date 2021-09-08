# To do list app

### Stack/Framework

- Front end - Vue Js (Nuxt - framework, Vuex store, Jest(test))
- backend (API Server) - Node-Epxpress js, mocha(testing)
- Db: mongo
- docker

### Steps for deployment

- clone the repo (checkout `devlop` branch)
- ``docker-compose build``
- `` docker-compose run node npm install``
- ``docker-compose run nodefr npm install``
- ``docker-compose up``
- open `http://localhost:8080/ `
- Backend unit test `docker-compose run node npm run test`.

### port details

- front end - `8080`
- mongo -  `27017` 
- API backend - `3000`

### Architechture diagram

inside ``Architechture diagram`` folder

### API Documentation(CURL)

#### Login
```shell
curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data email=admin@admin.com \
  --data password=123456
```

#### Register

```shell
curl --request POST \
  --url http://localhost:3000/api/auth/register \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data firstName=akhil \
  --data lastName=akhil \
  --data password=123456 \
  --data email=akhil1212@admin.com
```

#### Get all todo

```shell
curl --request GET \
  --url http://localhost:3000/api/todo \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data limit=11
```

#### GEt all Todos of a user

```shell
curl --request GET \
  --url http://localhost:3000/api/todo-data \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data id=<TODO_ID>
```

#### Create a new todo

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

#### Delete a todo

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

#### Delete note

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
