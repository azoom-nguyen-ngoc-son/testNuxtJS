import { make } from 'vuex-pathify'
import { useApi } from '../../plugins/api'
import ky from 'Ky'
function state () {
  return {
    active: false,
    posts: []
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
      console.log("sss")
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
      console.log("res", res)
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
  }
 }


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
