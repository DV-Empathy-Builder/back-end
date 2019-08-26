define({ "api": [
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register New User",
    "name": "PostRegister",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "newUser",
            "description": "<p>User's id and username.</p>"
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
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingData",
            "description": "<p>The username or password was not submitted.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TakenUsername",
            "description": "<p>The username is already in use.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 Bad Request\n{\n    \"error\": \"Please send both username and password.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "url"
      }
    ],
    "version": "0.0.0",
    "filename": "api/auth/authRouter.js",
    "groupTitle": "Auth"
  }
] });
