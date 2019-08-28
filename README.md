# Domestic Violence Empathy Builder v1.0.0

API for the empathy builder calculator for freeform.org.

- [Auth](#auth)
	- [Register New User](#register-new-user)
	


# Auth

## Register New User



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

