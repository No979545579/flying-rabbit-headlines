import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
import JSONBIG from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // 后台的原始数据   理想情况 json字符串
  const result = JSONBIG.parse(data)
  return result
}]
axios.interceptors.request.use(config => {
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => res, err => {
  if (err.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
