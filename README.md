<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://assets-global.website-files.com/64f709f1309acba2b5ccaa48/65086cff3f18fbe84ee4a16f_TourAxis_Colour.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Description

A simple API to manage users and tasks for those users.

## Running the app

### Development

```bash
$ docker compose up --build -V
```

## Endpoints

### Base URL

```
http://localhost:4001/api
```

### Documentation

```
http://localhost:4001/api/docs
```

### Routes

#### Create User

```sh
curl -i -H "Content-Type: application/json" -X POST -d '{"username":"jsmith","first_name" : "John", "last_name" : "Smith"}' http://localhost:4001/api/users
```

#### Update user

```sh
curl -i -H "Content-Type: application/json" -X PUT -d '{"first_name" : "John", "last_name" : "Doe"}' http://localhost:4001/api/users/{id}
```

#### List all users

```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://hostname/api/users
```

#### Get User info

```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4001/api/users/{id}
```

#### Create Task

```sh
curl -i -H "Content-Type: application/json" -X POST -d '{"name":"My task","description" : "Description of task", "date_time" : "2016-05-25 14:25:00"}' http://localhost:4001/api/users/{user_id}/tasks
```

#### Update Task

```sh
curl -i -H "Content-Type: application/json" -X PUT -d '{"name":"My updated task"}' http://localhost:4001/api/users/{user_id}/tasks/{task_id}
```

#### Delete Task

```sh
curl -i -H "Content-Type: application/json" -X DELETE http://localhost:4001/api/users/{user_id}/tasks/{task_id}
```

#### Get Task Info

```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4001/api/users/{user_id}/tasks/{task_id}
```

#### List all tasks for a user

```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4001/api/users/{user_id}/tasks
```

## License

This project is [MIT licensed](LICENSE).
