
### 获取房屋详情接口

#### request请求

    GET /house/get_detail/<int:house_id>/
    
##### params参数

    house_id str 房屋编号
    
#### response响应

##### 成功响应:

    {
    'code':'200',
    'image_list':'xxxxx',
    'house':'xxxxx',
    'mine':'xxxxx'
    }