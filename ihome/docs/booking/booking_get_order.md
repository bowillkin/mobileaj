
### 创建订单接口

#### request请求

    POST /booking/get_order/
    
##### params参数

    house_id str 房间编号
    
    begin_date date 开始日期
    
    end_date date 结束日期
    
#### response响应

##### 失败响应1:

    {
    'code':'901',
    'msg':'参数错误'
    }    
    
##### 失败响应2:

    {
    'code':'2001', 
    'msg':'离开时间错误'
    }
    
##### 失败响应3:
    
    {
    'code':'900',
    'msg':'数据库访问失败'
    }
    
##### 成功响应:

    {
    'code':'200',
    'msg':'请求成功'
    }