import { make } from 'vuex-pathify'
import { useApi } from '../../plugins/api'
import ky from 'Ky'
function state () {
  return {
    active: false,
    posts: [],
    loginUser: {}
  }
}

const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),

  // add manual mutation
  getLayout (state) {
    state.active = true
  },
  disableLayout(state) {
    state.active = false
  },
  getLoginUser(state) {
    state.loginUser = JSON.parse(localStorage.getItem("loginUser"))
    console.log("a" , state.loginUser)
  }

  
  // async getPosts (state) {
  //   const api = ky.create({
  //     prefixUrl: 'https://jsonplaceholder.typicode.com/' || "",
  //     timeout: 30000,
  //     credentials: 'include'
  //   })
  //   const a = await api.get("posts").json()
  //   console.log("a", a);
  //   state.posts = a
  //   console.log("state.log", state.posts)
  //   return state.posts
  
}
const api = ky.create({
    prefixUrl: 'https://jsonplaceholder.typicode.com/' || "",
    timeout: 30000,
  })
const actions = {
  
  async getUsers() {
    try {
      const res = await api.get("users").json()
      return res 
    }
    catch(e) {
    }
  },
  async addUsers () {
    const user = {
      id: 11111,
      name: "abcd"
    }
    try {
      await api.post("users",JSON.stringify(user))
      return res 
    }
    catch(e) {
    }
  },
  async getPosts() {
    try {
      const res = await api.get("posts").json()
      localStorage.setItem("posts", JSON.stringify(res))
      return res 
    }
    catch(e) {
    }
  },
  async addPosts() {
    try {
      // const res = await api.get("posts").json()
      localStorage.setItem("allData", JSON.stringify())
      const res = await api.post("posts", JSON.stringify())
      return res 
    }
    catch(e) {
    }
  },
 
  async getCommnents(payload) {
    try {
      const res = await api.get("comments").json()
      localStorage.setItem("comments", JSON.stringify(res))
      return res 
    }
    catch(e) {
    }
  },
  async getLoginUser() {
    try {
      const res = await api.get("loginUser").json()
      console.log("user", res)
    }
    catch(e) {
    }
  }
 }


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
