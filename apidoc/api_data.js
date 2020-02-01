define({ "api": [
  {
    "type": "GET",
    "url": "/dm",
    "title": "代码列表",
    "description": "<p>获取所有统计代码列表</p>",
    "name": "dm",
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/dm"
      }
    ],
    "group": "代码管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "代码管理"
  },
  {
    "type": "POST",
    "url": "/dmDoAdd",
    "title": "增加代码",
    "description": "<p>增加一个统计代码</p>",
    "name": "dmDoAdd",
    "parameter": {
      "fields": {
        "form-data参数": [
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "linkname",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "cnzzdm",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "utq2",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "utq3",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "byjc",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "byzh",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "bPC",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回:",
          "content": "{\n    \"linkname\": linkname,\n    \"code\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败返回:",
          "content": "{\n    \"linkname\": linkname,\n    \"code\": 0\n}",
          "type": "json"
        }
      ]
    },
    "group": "代码管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "代码管理",
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/dmDoAdd"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/dmDoEdit",
    "title": "修改代码",
    "description": "<p>根据ID修改某个统计代码</p>",
    "name": "dmDoEdit",
    "parameter": {
      "fields": {
        "form-data参数": [
          {
            "group": "form-data参数",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>必填</p>"
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "linkname",
            "description": "<p>必填</p>"
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "cnzzdm",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "utq2",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "utq3",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "byjc",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "byzh",
            "description": ""
          },
          {
            "group": "form-data参数",
            "type": "String",
            "optional": false,
            "field": "bPC",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回:",
          "content": "{\n    \"id\": id,\n    \"linkname\": linkname,\n    \"code\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败返回:",
          "content": "{\n    \"id\": id,\n    \"linkname\": linkname,\n    \"code\": 0\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/dmDoEdit"
      }
    ],
    "group": "代码管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "代码管理"
  },
  {
    "type": "POST",
    "url": "/dmdelete",
    "title": "删除代码",
    "description": "<p>根据ID删除一个统计代码</p>",
    "name": "dmdelete",
    "parameter": {
      "fields": {
        "path参数": [
          {
            "group": "path参数",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回:",
          "content": "{\n    \"id\": id,\n    \"code\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败返回:",
          "content": "{\n    \"id\": id,\n    \"code\": 0\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/dmdelete"
      }
    ],
    "group": "代码管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "代码管理"
  },
  {
    "type": "POST",
    "url": "/multicr",
    "title": "批量建表",
    "description": "<p>输入前缀和后缀起止数字，批量建表</p>",
    "name": "multicr",
    "parameter": {
      "fields": {
        "path参数": [
          {
            "group": "path参数",
            "type": "String",
            "optional": false,
            "field": "prefix_name",
            "description": ""
          },
          {
            "group": "path参数",
            "type": "Number",
            "optional": false,
            "field": "fromindex",
            "description": ""
          },
          {
            "group": "path参数",
            "type": "Number",
            "optional": false,
            "field": "toindex",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回:",
          "content": "{\n    \"code\": \"1\",\n    \"tpl\": 前缀+开始数字-前缀+结束数字\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败返回:",
          "content": "Error 0:",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/multicr"
      }
    ],
    "group": "基础管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "基础管理"
  },
  {
    "type": "POST",
    "url": "/singlecr",
    "title": "单个建表",
    "description": "<p>输入表名（目录名）一键建表，一次建一个表</p>",
    "name": "singlecr",
    "parameter": {
      "fields": {
        "path参数": [
          {
            "group": "path参数",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/singlecr"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "成功返回:",
          "content": "{\n     \"code\": \"1\",\n     \"tpl\": 表名\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败返回:",
          "content": "Error 0:",
          "type": "json"
        }
      ]
    },
    "group": "基础管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "基础管理"
  },
  {
    "type": "POST",
    "url": "/indexrn",
    "title": "索引方式",
    "description": "<p>批量复制推广页，并按起止后缀重命名（目录）</p>",
    "name": "indexrn",
    "parameter": {
      "fields": {
        "path参数": [
          {
            "group": "path参数",
            "type": "String",
            "optional": false,
            "field": "srcpath",
            "description": ""
          },
          {
            "group": "path参数",
            "type": "String",
            "optional": false,
            "field": "destdir",
            "description": ""
          },
          {
            "group": "path参数",
            "type": "Number",
            "optional": false,
            "field": "fromindex",
            "description": ""
          },
          {
            "group": "path参数",
            "type": "Number",
            "optional": false,
            "field": "toindex",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回:",
          "content": "{\n    \"code\": \"1\",\n    \"tpl\": 开始后缀序号 - 结束后缀序号\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败返回:",
          "content": "{\n    \"code\": \"0\",\n    \"tpl\": 开始后缀序号 - 结束后缀序号\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/indexrn"
      }
    ],
    "group": "推广页管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "推广页管理"
  },
  {
    "type": "POST",
    "url": "/multirn",
    "title": "多个方式",
    "description": "<p>批量复制推广页，并重命名（目录）</p>",
    "name": "multirn",
    "parameter": {
      "fields": {
        "body-json参数": [
          {
            "group": "body-json参数",
            "type": "String",
            "optional": false,
            "field": "srcpath",
            "description": ""
          },
          {
            "group": "body-json参数",
            "type": "String",
            "optional": false,
            "field": "destdir",
            "description": ""
          },
          {
            "group": "body-json参数",
            "type": "String",
            "optional": false,
            "field": "links",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "实例请求:",
          "content": "{\n\"srcpath\":\"/Users/zhengjiamao/Desktop/t2\",\n\"destdir\":\"/Users/zhengjiamao/Desktop\",\n\"links\":[\"newdir1\",\"newdir2\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回:",
          "content": "[\n    {\n        \"destdir\": 新目录所在目录,\n        \"link\": 重命名目录1\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败返回:",
          "content": "{\n    \"code\": 错误原因\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/multirn"
      }
    ],
    "group": "推广页管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "推广页管理"
  },
  {
    "type": "POST",
    "url": "/singlern",
    "title": "单个方式",
    "description": "<p>单个复制推广页，并重命名（目录）</p>",
    "name": "singlern",
    "parameter": {
      "fields": {
        "path参数": [
          {
            "group": "path参数",
            "type": "String",
            "optional": false,
            "field": "srcpath",
            "description": ""
          },
          {
            "group": "path参数",
            "type": "String",
            "optional": false,
            "field": "destdir",
            "description": ""
          },
          {
            "group": "path参数",
            "type": "String",
            "optional": false,
            "field": "newfilename",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回:",
          "content": "推广页（目录）名",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败返回:",
          "content": "{\n    \"code\": 错误原因\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ent.npmjs.top/apiv1/singlern"
      }
    ],
    "group": "推广页管理",
    "version": "1.0.0",
    "filename": "routes/apiv1.js",
    "groupTitle": "推广页管理"
  }
] });
