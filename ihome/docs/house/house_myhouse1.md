
### 我的房源接口

#### request请求

    GET /house/myhouse1/
    
##### params参数

    
#### response响应

##### 失败响应1:

    {
        'code':'1010', 
        'msg':'该用户未认证'
    }
    
##### 失败响应2:

    {
        'code':'1009',
        'msg':'用户未登录'
     }
    
##### 成功响应:

    {
        'code':'200',
        'msg':'请求成功',
        'house_list':'xxxxx'
    }
    