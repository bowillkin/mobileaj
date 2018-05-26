
### 登录接口

#### request请求

    POST /ihome/login/
    
##### params参数:
    
    moblie str 电话号码
    password str 密码
    
#### response响应:

##### 失败响应1:

    {
    "code": "1004",
    "msg": "用户名不存在"
    }

##### 失败响应2:
    
    {
    "code": "1005",
    "msg": "密码错误"
    }
    
##### 成功响应:
    
    {
    "code": "200",
    "msg": "请求成功",
    "user_id": "3"
    }
