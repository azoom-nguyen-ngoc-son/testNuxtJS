import { make } from 'vuex-pathify'
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
      // const res = await api.get("users").json()
      const data = await this.$fire.firestore.collection("users").get()
      let users = data.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }))
      return users 
    }
    catch(e) {
    }
  },
  async addUsers (context, payload) {
    try {
      // await api.post("users",JSON.stringify(user))
      await this.$fire.firestore.collection("users").add(payload);
      // return res 
    }
    catch(e) {
    }
  },
  async getPosts() {
    try {
      // const res = await api.get("posts").json()
      // localStorage.setItem("posts", JSON.stringify(res))
      const data = await this.$fire.firestore.collection("posts").get()
      let posts = data.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }))
      return posts
    }
    catch(e) {
    }
  },
  async addPosts(context, payload) {
    try {
      // const res = await api.get("posts").json()
      const data = await this.$fire.firestore.collection("posts").add(payload)
      return data 
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
