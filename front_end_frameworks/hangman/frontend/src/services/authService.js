import Api from '@/services/api'

export default {
  register(payload) {
    return Api().post('auth', payload)
  },

  login(payload) {
    console.log("payload", payload)
    return Api().post('login', payload)
  }
}