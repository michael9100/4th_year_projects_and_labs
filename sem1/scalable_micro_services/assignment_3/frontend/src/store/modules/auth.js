import axios from "axios" 
import router from '../../router'

export default {
  state: {
    loggedIn: false
  },
  mutations: {
    setLoggedIn: (state, payload) => {
      state.loggedIn = payload
    }
  },
  actions: {
    register: ({commit, dispatch}, payload) => { 
      let register = (p) => {    
        let data = {
          email: p.email,    
          password: p.password    
        }
        return axios.post('/api/register', data).then((res) => {
          console.log(res)
          dispatch('setLoggedIn', true)
        })    
        .catch((errors) => {    
          console.log("Cannot Register", errors)
        })    
      }
      return register(payload)
    },
    login: ({commit, dispatch}, payload) => { 
      let login = (p) => {    
        let data = {
          email: p.email,    
          password: p.password    
        }
        return axios.post('/api/login', data).then((res) => {    
          sessionStorage.setItem('tattbooksAuth', true);
          dispatch('setLoggedIn', true)
        })    
        .catch((errors) => {    
          console.log("Cannot log in", errors)    
        })    
      }
      return login(payload)
    },
    logout: ({commit, dispatch}, payload) => { 
      let logout = (e) => {    
        return axios.get('/api/logout').then((res) => {    
          sessionStorage.removeItem('tattbooksAuth');
          dispatch('setLoggedIn', false)
        })    
        .catch((errors) => {    
          console.log("Cannot logout", errors)    
        })    
      }
      return logout(payload)
    },
    setLoggedIn: (context, payload) => {
      context.commit('setLoggedIn', payload)
    }
  }
}