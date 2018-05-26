
### 发布房源接口

#### request请求

    POST /house/mypublic/

##### params参数

    my_house.title str 房屋标题
    
    my_house.price str 房屋价格
    
    my_house.area_id str 房屋编号
    
    my_house.address str 房屋地址
    
    my_house.room_count str 入住次数
    
    my_house.acreage str 房屋面积
    
    my_house.unit str 房屋格局
    
    my_house.capacity str 宜住人数
    
    my_house.beds str 床位个数
    
    my_house.deposit str 押金金额
    
    my_house.min_days str 最少出租天数
    
    my_house.max_days str 最多出租天数
    
#### response响应

##### 成功响应:

    {
        'code':'200',
        'msg':'请求成功'
    }