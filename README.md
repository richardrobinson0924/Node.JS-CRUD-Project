# Node.JS-CRUD-Project

A super-simple basic node.js CRUD project

----

### Installation:

1. Download and install `npm` and `MongoDB`
2. In a console, launch `mongo`
3. In the project, run `npm start` to start the server, or `npm test` to run the tests


**Endpoint**: `http://localhost:5000/api`

---

**Adding a user:**
```bash
$ curl http://localhost:5000/api/users \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"name": "Richard Robinson", "age": 20}'
```

**Fetching all users:**
```bash
$ curl http://localhost:5000/api/users
```

By default, the results are sorted by the users' `name` property.
To optionally filter based on `age`, add the query parameter `?age=<NUMBER>`

The request gets a JSON response in the following format:

```json
[
  {
    "_id": "5f4b0b2c57857b0851e544f8",
    "name": "Richard Robinson",
    "age": 20
  }
]
```

**Fetching a specific user:**
```bash
$ curl http://localhost:5000/api/users/<ID>
```

**Deleting a user:**
```bash
$ curl http://localhost:5000/api/users/<ID> -X DELETE -I
```

**Updating a user:**
```bash
$ curl http://localhost:5000/api/users/<ID> \
    -X PATCH \
    -H "Content-Type: application/json" \
    -d '{"name": "John Doe"}'
```
