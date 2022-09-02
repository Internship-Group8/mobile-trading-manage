const KEY = 'token'

export const getToken = ()=> {
  return sessionStorage.getItem(KEY)
}

export const setToken = (token)=> {
  return sessionStorage.setItem(KEY, token)
}

export const delToken = ()=> {
  return sessionStorage.removeItem(KEY)
}