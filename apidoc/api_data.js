define({ "api": [
  {
    "type": "post",
    "url": "auth/login",
    "title": "Login registered user",
    "name": "PostLogin",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
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
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Welcome username!</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User's authorization token</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User's unique user_id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 201 Created\n{\n    \"user_id\": 3,\n    \"username\": \"abc123\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
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
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidCredentials",
            "description": "<p>Either the username or password is incorrect</p>"
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
        "url": "https://dv-empathy.herokuapp.com/auth/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "auth/register",
    "title": "Register new user",
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
  },
  {
    "type": "del",
    "url": "budgets/:id",
    "title": "Delete a budget",
    "name": "DelBudgets",
    "group": "Budgets",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "budget",
            "description": "<p>Array of budget objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.budget_name_id",
            "description": "<p>ID of budget</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.created_at",
            "description": "<p>Date budget was created</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.updated_at",
            "description": "<p>Date budget was updated</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.user_id",
            "description": "<p>ID of the user owning the budget</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP 200 OK\n[\n   {\n       \"budget_name_id\": 1,\n       \"budget_name\": \"Denver\",\n       \"created_at\": \"2019-08-26T19:49:28.206Z\",\n       \"updated_at\": \"2019-08-26T19:49:28.206Z\",\n       \"user_id\": 1\n   }\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/budgets/budgetsRouter.js",
    "groupTitle": "Budgets",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/budgets/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "budgets/:id",
    "title": "Get all lines for specific budget",
    "name": "GetBudgetLines",
    "group": "Budgets",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "budget",
            "description": "<p>Array of line objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.line_id",
            "description": "<p>ID of line</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.amount",
            "description": "<p>Amount allocated for line</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.category_id",
            "description": "<p>ID of category line is connected to</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.category_name",
            "description": "<p>Name of category line is connected to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP 200 OK\n[\n   {\n       \"line_id\": 1,\n       \"amount\": 80,\n       \"category_id\": 1,\n       \"category_name\": \"Car Payment\"\n   },\n   {\n       \"line_id\": 4,\n       \"amount\": 0,\n       \"category_id\": 2,\n       \"category_name\": \"Car Insurance\"\n   },\n   {\n       \"line_id\": 7,\n       \"amount\": 0,\n       \"category_id\": 3,\n       \"category_name\": \"Gas & Car Maintenance\"\n   },\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/budgets/budgetsRouter.js",
    "groupTitle": "Budgets",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/budgets/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "budgets/",
    "title": "Get all budgets",
    "name": "GetBudgets",
    "group": "Budgets",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "budget",
            "description": "<p>Array of budget objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.budget_name_id",
            "description": "<p>ID of budget</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.created_at",
            "description": "<p>Date budget was created</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.updated_at",
            "description": "<p>Date budget was updated</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.user_id",
            "description": "<p>ID of the user owning the budget</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP 200 OK\n[\n   {\n       \"budget_name_id\": 1,\n       \"budget_name\": \"Denver\",\n       \"created_at\": \"2019-08-26T19:49:28.206Z\",\n       \"updated_at\": \"2019-08-26T19:49:28.206Z\",\n       \"user_id\": 1\n   }\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/budgets/budgetsRouter.js",
    "groupTitle": "Budgets",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/budgets/"
      }
    ]
  },
  {
    "type": "post",
    "url": "budgets/:id",
    "title": "Create lines for specific budget",
    "name": "PostBudgetLines",
    "group": "Budgets",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "budget",
            "description": "<p>Array of line objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.line_id",
            "description": "<p>ID of line</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.amount",
            "description": "<p>Amount allocated for line</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.category_id",
            "description": "<p>ID of category line is connected to</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.category_name",
            "description": "<p>Name of category line is connected to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP 200 OK\n[\n   {\n       \"line_id\": 1,\n       \"amount\": 80,\n       \"category_id\": 1,\n       \"category_name\": \"Car Payment\"\n   },\n   {\n       \"line_id\": 4,\n       \"amount\": 0,\n       \"category_id\": 2,\n       \"category_name\": \"Car Insurance\"\n   },\n   {\n       \"line_id\": 7,\n       \"amount\": 0,\n       \"category_id\": 3,\n       \"category_name\": \"Gas & Car Maintenance\"\n   },\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/budgets/budgetsRouter.js",
    "groupTitle": "Budgets",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/budgets/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "budgets/",
    "title": "Post new budget",
    "name": "PostBudgets",
    "group": "Budgets",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "budget",
            "description": "<p>Newly created budget object</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.budget_name_id",
            "description": "<p>ID of budget</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.created_at",
            "description": "<p>Date budget was created</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.updated_at",
            "description": "<p>Date budget was updated</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.user_id",
            "description": "<p>ID of the user owning the budget</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP 200 OK\n\n{\n    \"budget_name_id\": 1,\n    \"budget_name\": \"Denver\",\n    \"created_at\": \"2019-08-26T19:49:28.206Z\",\n    \"updated_at\": \"2019-08-26T19:49:28.206Z\",\n    \"user_id\": 1\n}",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/budgets/budgetsRouter.js",
    "groupTitle": "Budgets",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/budgets/"
      }
    ]
  },
  {
    "type": "put",
    "url": "budgets/:id/lines",
    "title": "Edit lines for specific budget",
    "name": "PutBudgetLines",
    "group": "Budgets",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "budget",
            "description": "<p>Array of line objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.line_id",
            "description": "<p>ID of line</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.amount",
            "description": "<p>Amount allocated for line</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.category_id",
            "description": "<p>ID of category line is connected to</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.category_name",
            "description": "<p>Name of category line is connected to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP 200 OK\n[\n   {\n       \"line_id\": 1,\n       \"amount\": 80,\n       \"category_id\": 1,\n       \"category_name\": \"Car Payment\"\n   },\n   {\n       \"line_id\": 4,\n       \"amount\": 0,\n       \"category_id\": 2,\n       \"category_name\": \"Car Insurance\"\n   },\n   {\n       \"line_id\": 7,\n       \"amount\": 0,\n       \"category_id\": 3,\n       \"category_name\": \"Gas & Car Maintenance\"\n   },\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/budgets/budgetsRouter.js",
    "groupTitle": "Budgets",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/budgets/:id/lines"
      }
    ]
  },
  {
    "type": "put",
    "url": "budgets/:id",
    "title": "Edit budget name",
    "name": "PutBudgets",
    "group": "Budgets",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "budget",
            "description": "<p>Array of budget objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.budget_name_id",
            "description": "<p>ID of budget</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.created_at",
            "description": "<p>Date budget was created</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "budget.updated_at",
            "description": "<p>Date budget was updated</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "budget.user_id",
            "description": "<p>ID of the user owning the budget</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP 200 OK\n[\n   {\n       \"budget_name_id\": 1,\n       \"budget_name\": \"Denver\",\n       \"created_at\": \"2019-08-26T19:49:28.206Z\",\n       \"updated_at\": \"2019-08-26T19:49:28.206Z\",\n       \"user_id\": 1\n   }\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/budgets/budgetsRouter.js",
    "groupTitle": "Budgets",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/budgets/:id"
      }
    ]
  },
  {
    "type": "delete",
    "url": "categories/:id",
    "title": "Delete a specific category",
    "name": "DeleteCategory",
    "group": "Categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Category's ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Parameters:",
          "content": "ID: 5",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "category",
            "description": "<p>Array of category objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "category.category_id",
            "description": "<p>ID of category</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "category.category_name",
            "description": "<p>Name of category</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "category.category_type",
            "description": "<p>Either personal or relocation</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "category.user_id",
            "description": "<p>Either ID of the user or null for default categories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n[\n     {\n         \"category_id\": 1,\n         \"category_name\": \"Car Payment\",\n         \"category_type\": \"Personal\",\n         \"user_id\": null\n     },\n    {\n        \"category_id\": 2,\n        \"category_name\": \"Car Insurance\",\n        \"category_type\": \"Personal\",\n        \"user_id\": null\n    },\n    {\n        \"category_id\": 3,\n        \"category_name\": \"Gas & Car Maintenance\",\n        \"category_type\": \"Personal\",\n        \"user_id\": null\n    }\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/categories/categoriesRouter.js",
    "groupTitle": "Categories",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/categories/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "categories/",
    "title": "Get all categories",
    "name": "GetCategories",
    "group": "Categories",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "category",
            "description": "<p>Array of category objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "category.category_id",
            "description": "<p>ID of category</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "category.category_name",
            "description": "<p>Name of category</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "category.category_type",
            "description": "<p>Either personal or relocation</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "category.user_id",
            "description": "<p>Either ID of the user or null for default categories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n[\n     {\n         \"category_id\": 1,\n         \"category_name\": \"Car Payment\",\n         \"category_type\": \"Personal\",\n         \"user_id\": null\n     },\n    {\n        \"category_id\": 2,\n        \"category_name\": \"Car Insurance\",\n        \"category_type\": \"Personal\",\n        \"user_id\": null\n    },\n    {\n        \"category_id\": 3,\n        \"category_name\": \"Gas & Car Maintenance\",\n        \"category_type\": \"Personal\",\n        \"user_id\": null\n    }\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/categories/categoriesRouter.js",
    "groupTitle": "Categories",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/categories/"
      }
    ]
  },
  {
    "type": "post",
    "url": "categories/",
    "title": "Add a new category",
    "name": "PostCategory",
    "group": "Categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_name",
            "description": "<p>Category's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_type",
            "description": "<p>Either personal or relocation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Parameters:",
          "content": "{\n\"category_name\": \"Storage unit fees\"\n\"category_type\": \"Relocation\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
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
            "field": "category",
            "description": "<p>Returns the created object</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "category.category_id",
            "description": "<p>Id of category</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "category.category_name",
            "description": "<p>Name of category</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "category.category_type",
            "description": "<p>Either personal or relocation</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "category.user_id",
            "description": "<p>Unique ID of user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 201 Created\n{\n    \"category_id\": 24,\n    \"category_name\": \"Test234\",\n    \"category_type\": \"Personal\",\n    \"user_id\": 1\n }",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/categories/categoriesRouter.js",
    "groupTitle": "Categories",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/categories/"
      }
    ]
  },
  {
    "type": "put",
    "url": "categories/:id",
    "title": "Edit a specific category",
    "name": "PutCategory",
    "group": "Categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Category's unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_name",
            "description": "<p>Category's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_type",
            "description": "<p>Either personal or relocation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Parameters:",
          "content": "ID: 5\n{\n\"category_name\": \"Storage unit fees\"\n\"category_type\": \"Relocation\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's unique authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "category",
            "description": "<p>Array of category objects</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "category.category_id",
            "description": "<p>ID of category</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "category.category_name",
            "description": "<p>Name of category</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "category.category_type",
            "description": "<p>Either personal or relocation</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "category.user_id",
            "description": "<p>Either ID of the user or null for default categories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n[\n     {\n         \"category_id\": 1,\n         \"category_name\": \"Car Payment\",\n         \"category_type\": \"Personal\",\n         \"user_id\": null\n     },\n    {\n        \"category_id\": 2,\n        \"category_name\": \"Car Insurance\",\n        \"category_type\": \"Personal\",\n        \"user_id\": null\n    },\n    {\n        \"category_id\": 3,\n        \"category_name\": \"Gas & Car Maintenance\",\n        \"category_type\": \"Personal\",\n        \"user_id\": null\n    }\n]",
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
            "field": "MissingToken",
            "description": "<p>Must include token with this request.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Must include a valid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP 400 MissingToken\n{\n    \"error\": \"No token provided. Please include a token in your authorization header.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/categories/categoriesRouter.js",
    "groupTitle": "Categories",
    "sampleRequest": [
      {
        "url": "https://dv-empathy.herokuapp.com/categories/:id"
      }
    ]
  }
] });
