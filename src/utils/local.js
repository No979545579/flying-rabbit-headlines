const KEY = 'hm-toutiao-pc-85-user-key'
const local = {
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    const jsonSty = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonSty)
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
