# Domestic Violence Empathy Builder v1.0.0

API for the empathy builder calculator for freeform.org.

- [Auth](#auth)
	- [Register New User](#register-new-user)
	


# Auth

## Register New User



	POST /auth/register


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
HTTP 400 Bad Request
{
    "error": "Please send both username and password."
}
```

