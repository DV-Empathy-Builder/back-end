# Domestic Violence Empathy Builder v1.0.0

API for the empathy builder calculator for freeform.org.

- [Auth](#auth)
	- [Login registered user](#login-registered-user)
	- [Register new user](#register-new-user)
	
- [Categories](#categories)
	- [Delete a specific category](#delete-a-specific-category)
	- [Get all categories](#get-all-categories)
	- [Add a new category](#add-a-new-category)
	- [Edit a specific category](#edit-a-specific-category)
	


# Auth

## Login registered user



	POST auth/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>User's username</p>							|
| password			| String			|  <p>User's password</p>							|

### Success Response

Success-Response:

```
HTTP 201 Created
{
    "user_id": 3,
    "username": "abc123",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
}
```
### Error Response

Error-Response

```
HTTP 400 MissingData
{
    "error": "Please send both username and password."
}
```
## Register new user



	POST auth/register


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>User's unique username</p>							|
| password			| String			|  <p>User's password</p>							|

### Success Response

Success-Response:

```
HTTP 201 Created
{
    "user_id": 3,
    "username": "abc123"
}
```
### Error Response

Error-Response

```
HTTP 400 MissingData
{
    "error": "Please send both username and password."
}
```
# Categories

## Delete a specific category



	DELETE categories/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>User's unique authorization token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| ID			| Number			|  <p>Category's ID</p>							|

### Success Response

Success-Response:

```
     HTTP 200 OK
     [
  {
     "category_id": 1,
    "category_name": "Car Payment",
   "category_type": "Personal",
      "user_id": null
  },
  {
      "category_id": 2,
      "category_name": "Car Insurance",
      "category_type": "Personal",
     "user_id": null
  },
  {
      "category_id": 3,
      "category_name": "Gas & Car Maintenance",
      "category_type": "Personal",
      "user_id": null
  }
]
```
### Error Response

Error-Response

```
HTTP 400 MissingToken
{
    "error": "No token provided. Please include a token in your authorization header."
}
```
## Get all categories



	GET categories/

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>User's unique authorization token</p>							|

### Success Response

Success-Response:

```
     HTTP 200 OK
     [
  {
     "category_id": 1,
    "category_name": "Car Payment",
   "category_type": "Personal",
      "user_id": null
  },
  {
      "category_id": 2,
      "category_name": "Car Insurance",
      "category_type": "Personal",
     "user_id": null
  },
  {
      "category_id": 3,
      "category_name": "Gas & Car Maintenance",
      "category_type": "Personal",
      "user_id": null
  }
]
```
### Error Response

Error-Response

```
HTTP 400 MissingToken
{
    "error": "No token provided. Please include a token in your authorization header."
}
```
## Add a new category



	POST categories/

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>User's unique authorization token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| category_name			| String			|  <p>Category's name</p>							|
| category_type			| String			|  <p>Either personal or relocation</p>							|

### Success Response

Success-Response:

```
     HTTP 201 Created
 
  {
  "category_id": 24,
  "category_name": "Test234",
  "category_type": "Personal",
  "user_id": 1
}
```
### Error Response

Error-Response

```
HTTP 400 MissingToken
{
    "error": "No token provided. Please include a token in your authorization header."
}
```
## Edit a specific category



	PUT categories/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>User's unique authorization token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| ID			| Number			|  <p>Category's unique ID</p>							|
| category_name			| String			|  <p>Category's name</p>							|
| category_type			| String			|  <p>Either personal or relocation</p>							|

### Success Response

Success-Response:

```
     HTTP 200 OK
     [
  {
     "category_id": 1,
    "category_name": "Car Payment",
   "category_type": "Personal",
      "user_id": null
  },
  {
      "category_id": 2,
      "category_name": "Car Insurance",
      "category_type": "Personal",
     "user_id": null
  },
  {
      "category_id": 3,
      "category_name": "Gas & Car Maintenance",
      "category_type": "Personal",
      "user_id": null
  }
]
```
### Error Response

Error-Response

```
HTTP 400 MissingToken
{
    "error": "No token provided. Please include a token in your authorization header."
}
```

