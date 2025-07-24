import request from "../utils/request";

// 获取账号管理列表数据
const getAuthDataAPI = (params) => {
  return request.get("/auth/admin", { params });
};

// 获取权限下拉列表数据
const getSelectListAPI = () => {
  return request.get("/menu/selectlist");
};

// 用户信息修改
const updateUserInfo = (data) => {
  return request.post("/update/user", data);
};

export { getAuthDataAPI, getSelectListAPI, updateUserInfo };
