# Node.JS-CRUD-Project

A super-simple basic node.js CRUD project

----

### Installation:

1. Download and install `npm` and `MongoDB`
2. In a console, launch `mongo`
3. In the project, run `node ./app.js`


**Endpoint**: `http://localhost:5000/api`

---

**Adding a user:**
```bash
$ curl http://localhost:5000/api/users \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"firstName": "Richard", "lastName": "Robinson", "type": "student", "birthdate": "1999-09-24T18:25:43"}'
```

**Fetching all users:**
```bash
$ curl http://localhost:5000/api/users
```

By default, the results are sorted by the users' `lastName` property.
To optionally filter based on `type`, add the query parameter `?type=<student|teacher|administration>`

The request gets a JSON response in the following format:

```json
[
  {
    "_id": "5f4b0b2c57857b0851e544f8",
    "firstName": "Richard",
    "lastName": "Robinson",
    "type": "student",
    "birthdate": "2015-04-23T18:25:43.511Z",
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
curl http://localhost:5000/api/posts/<ID> \
    -X PATCH \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Bob"}'
```
