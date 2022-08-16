import Cookies from 'js-cookie'

const TokenKey = 'admin_token'
const UserName = 'user_name'
const PassWord = 'pass_word'
const User = {}
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getUserName() {
    return Cookies.get(User)
}
export function setUserName(name) {
    return Cookies.set(User, name,{expires:7})
}

export function removeUserName() {
    return Cookies.remove(User)
}
