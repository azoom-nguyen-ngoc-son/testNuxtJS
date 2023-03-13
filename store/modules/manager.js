import { make } from 'vuex-pathify'
import ky from 'Ky'
function state () {
  return {
    active: false,
    posts: [],
    loginUser: {},

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
  async getComments(context, payload) {
    // const posts = await this.getPosts()
    let postsConst = await this.$fire.firestore.collection("posts").get()
    let posts = postsConst.docs.map((post) => ({
      id: post.id,
      ...post.data(),
    }))
    let usersConst = await this.$fire.firestore.collection("users").get()
    let users= usersConst.docs.map((user) => ({
      id: user.id,
      ...user.data(),
    }))
    let commentsConst = await this.$fire.firestore.collection("comments").get()
    let comments= commentsConst.docs.map((comment) => ({
      id: comment.id,
      ...comment.data(),
    }))
    let filterComments = []
    let dataPosts = []
    let id = null
    let title = ''
    let body = ''
    let author = ''
    try {
      // gộp thông tin bài Post với user, trả về dl đầy đủ: author + posts
      for (let k = 0; k < posts.length; k++) {
        id = posts[k].id
        title = posts[k].title
        body = posts[k].body
        for (let j = 0; j < users.length; j++) {
          if (posts[k].userId === users[j].id) {
            author = users[j].name
            const item = {
              id: id,
              title: title,
              body: body,
              author: author,
            }
            dataPosts.push(item)
            continue;
          }
        }
      }
      // Gộp user+comment trả về thông tin 
      const dataComments = []
      let idCmt = ''
      let authorCmt = ''
      let bodyCmt = ''
      for (let k = 0; k < comments.length; k++) {
        idCmt = posts[k].postId
        bodyCmt = posts[k].body
        for (let j = 0; j < users.length; j++) {
          if (comments[k].userId === users[j].id) {
            authorCmt = users[j].name
            const item = {
              postId: idCmt,
              authorCmt: authorCmt,
              bodyCmt: bodyCmt,
            }
            dataComments.push(item)
            continue;
          }
        }
      }
      console.log("dataComment", dataComments)
      // Lấy ra thông tin bài post + comment
      dataPosts = dataPosts.filter((x) => x.id == payload)
      for (let j = 0; j < dataComments.length; j++) {
        console.log("dataComments[j].postId", dataComments[j].postId)
        if (dataComments[j].postId == payload) {
          const bodyComment = dataComments[j].bodyCmt
          const name = dataComments[j].authorCmt
          const item = {
            bodycomment: bodyComment,
            name: name
          }
          console.log("yes")
          // if (filterComments === []) {
          //   filterComments = [item]
          // }
          // else {
          //   filterComments.push(item)
          // }
        }
        else{
          console.log("noe")
        }
      }
      console.log("dataPost", dataPosts)
      console.log("filterComments", filterComments)
      const resultPosts = {
        id: dataPosts[0].id,
        title: dataPosts[0].title,
        body: dataPosts[0].body,
        author: dataPosts[0].author,
        comments: filterComments,
        
      }
      return resultPosts
    }
    catch(e) {
      console.log("erros")
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
