
### 个人信息接口

#### request请求

    PUT /ihome/profile/
    
##### params参数:

    file_dict dict 表单字典对象
    
    username str 用户名
    
    f1 str 头像路径
    
    url str 文件的绝对路径
    
    image_url 图片相对路径
    
#### response响应

##### 失败响应1:

    {
        'code':'1006', 
        'msg':'上传图片类型有误'
    }

##### 失败响应2:

    {
        'code':'1008', 
        'msg':'该名称已经被注册',
        'user_name', 'xxxx'
    }
    
##### 失败响应3;

    {
        'code':'900',
        'msg':'数据库访问失败'
    }
    
##### 成功响应:

    {
        'code':200,
        'msg':'请求成功',
        'url':'xxxxxx',
        'name':'xxxxxx'
    }