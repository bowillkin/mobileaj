
### 拒绝订单接口

#### request请求

    GET /booking/refuse/
    
##### params参数

    order_id str 订单编号
    comment str 拒绝原因

#### response响应

##### 失败响应1:

    {
    'code':'2002',
     'msg':'拒绝原因不能为空'
     }
     
##### 失败响应2:
    
    {
    'code':'900',
    'msg':'数据库访问失败'
    }
    
##### 成功响应:

    {
    'code':'200',
    'msg':'请求成功'
    }
    