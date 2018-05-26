
### 上传房屋图片接口

#### request请求

    POST /house/upload/
    
##### params参数

    f1 files 房间图片


#### response响应

##### 失败响应1:

    {
    'code':'1006', 
    'msg':'上传图片类型有误'
    }

##### 失败响应2:

    {
    'code':'900',
    'msg':'数据库访问失败'
    }
    
##### 成功响应:

    {
    'code':'200',
    'msg':'请求成功',
    'url':'xxxx'
    }
  