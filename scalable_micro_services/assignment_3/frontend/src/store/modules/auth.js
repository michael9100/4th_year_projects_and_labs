import axios from "axios" 
import router from '../../router'

export default {
  state: {
 
  },
  mutations: {

  },
  actions: {
    login: (e, payload) => { 
      let login = (p) => {    
        let data = {
          email: p.email,    
          password: p.password    
        }
        console.log(data)    
        return axios.post('/api/login', data).then((res) => {    
          console.log("Logged in")
          sessionStorage.setItem('tattbooksAuth', true);
        })    
        .catch((errors) => {    
          console.log("Cannot log in", errors)    
        })    
      }
      return login(payload)
    }
  }
}