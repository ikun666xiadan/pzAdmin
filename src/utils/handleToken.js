const setToken = (res) => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
}

const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
}

export { setToken, removeToken }