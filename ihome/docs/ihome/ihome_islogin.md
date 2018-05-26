
### 验证是否登录接口

#### request请求

    GET /ihome/islogin/
    
##### params参数

    
#### response响应

##### 失败响应:

    {
        'code':'1010', 
        'msg':'该用户未认证',
        'houselist':'xxxxxx',
        'arealist':'xxxxxxx'
    }   
    
##### 成功响应:

    {
        'code':'200',
        'msg':'请求成功',
        'houselist':'xxxxxx',
        'arealist': 'xxxxxx',
        'user_name':'xxxxxx'
    }