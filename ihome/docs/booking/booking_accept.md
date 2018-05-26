
### 接受订单接口

#### request请求

    GET /booking/accept/
    
##### params参数

    order_id str 订单编号
    
#### response响应

##### 失败响应:

    {
    'code':'900',
    'msg':'数据库访问失败'
    }
    
##### 成功响应:

    {
    'code':'200',
    'msg':'请求成功'
    }