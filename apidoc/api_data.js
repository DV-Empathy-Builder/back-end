define({ "api": [
  {
    "type": "post",
    "url": "auth/register",
    "title": "Register New User",
    "name": "PostRegister",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Parameters:",
          "content": "{\n\"username\": \"test1\"\n\"password\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "newUser",
            "description": "<p>User's id and username</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 201 Created\n{\n    \"user_id\": 3,\n    \"username\": \"abc123\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>The username or password was not submitted.</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "TakenUsername",
            "description": "<p>The username is already in use.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingData\n{\n    \"error\": \"Please send both username and password.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/auth/authRouter.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/auth/register"
      }
    ]
  }
] });
