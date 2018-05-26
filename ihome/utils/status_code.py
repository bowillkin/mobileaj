OK = 200
SUCCESS = {'code':'200','msg':'请求成功'}

DATABASE_ERROR = {'code':'900','msg':'数据库访问失败'}
PARAMS_ERROR = {'code':'901','msg':'参数错误'}

USER_AUTH_PARAMS_ERROR = {'code':'902','msg':'信息不能为空'}

# 用户模块

USER_REGISTER_PARAMS_ERROR = {'code':'1000','msg':'注册信息不能为空'}

USER_REGISTER_MOBILE_ERROR = {'code':'1001','msg':'注册手机号码不符合规则'}

USER_REGISTER_MOBILE_IS_EXSITS = {'code':'1002','msg':'手机号码已注册'}

USER_REGISTER_PASSWORD_IS_ERROR = {'code':'1003','msg':'密码与确认密码不一致'}

USERNAME_NOT_EXIST = {'code':'1004', 'msg':'用户名不存在'}

USER_PASSWORD_ERROR = {'code':'1005', 'msg':'密码错误'}

USER_UPLOAD_IMAGE_IS_ERROR = {'code':'1006', 'msg':'上传图片类型有误'}

USER_IDENTIFICATION_INFORMATION_ERROR = {'code':'1007', 'msg':'身份证信息错误'}

USER_NAME_HAS_REGISTERED = {'code':'1008', 'msg':'该名称已经被注册'}

USER_NOT_LOGIN = {'code':'1009', 'msg':'用户未登录'}

USER_NOT_AUTH = {'code':'1010', 'msg':'该用户未认证'}

# 订单模块
END_TIME_IS_ERROR = {'code':'2001', 'msg':'离开时间错误'}

REJECTION_IS_EMPTY = {'code':'2002', 'msg':'拒绝原因不能为空'}


