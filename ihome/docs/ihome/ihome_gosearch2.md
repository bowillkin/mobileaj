
### 根据时间,区域,排序顺序搜索数据接口

#### request请求

    GET /ihome/gosearch2/
    
##### params参数

    aid str 区域id
    sd str 开始日期
    ed str 结束日期
    std str 排序类型
    
#### response响应

##### 成功响应:

    {
        'code':'200',
        'houses':'xxxxxx'
    }

    