<template>
  <div>
    <div class="btnBack">
      <NuxtLink 
        to="/trang-chu"> 
        <-- Go back
      </NuxtLink>
    </div>
    <CardItem 
      :postItem="postItem"
      :comments="comments"
    />
    <BaseLoading :loading="isLoading" />
  </div>
</template>

<script>
import CardItem from '../../components/card-item.vue'
import BaseLoading from '../../components/base-loading.vue'
export default {
  data() {
    return {
      posts: [],
      comments: [],
      postItem: {},
      commentsPost: [],
      dialog: false,
      contentComment: '',
      isLoading: false,    }
  },
  components: {
    BaseLoading,
    CardItem
  },
  created() {
    this.isLoading = true
    setTimeout(() => {
      this.getData()
      this.isLoading = false
    }, 200);

  },
  methods: {
    async getData() {
      await this.$store.dispatch("manager/getCommnents")
      this.comments = JSON.parse(localStorage.getItem("comments"))
      if (JSON.parse(localStorage.getItem("localComments")) !== null) {
        this.comments = this.comments.concat(JSON.parse(localStorage.getItem("localComments")))
      }
      this.posts = JSON.parse(localStorage.getItem("allData"))
      this.postItem = this.posts.filter((x) => x.id == this.$route.params.id)[0] || posts[0]

      for (let j = 0; j < this.comments.length; j++) {
        if (this.comments[j].postId === this.postItem.id) {
          const bodyComment = this.comments[j].body
          const name = this.comments[j].name
          const item = {
            bodycomment: bodyComment,
            name: name
          }
          if (this.commentsPosts === []) {
            this.commentsPost = [item]
          }
          else {
            this.commentsPost.push(item)
          }
        }
      }
      this.postItem = {
        id: this.postItem.id,
        title: this.postItem.title,
        body: this.postItem.body,
        author: this.postItem.author,
        comments: this.commentsPost
      }
    },
    addComments() {
      this.dialog = true
      this.contentComment = ''
    },
    saveComments() {
      const user = JSON.parse(localStorage.getItem("loginUser"))
      const comment = {
        postId: this.postItem.id,
        id: this.comments.length + 1,
        name: user.name,
        email: user.email,
        body: this.contentComment
      }
      const item = {
        name: user.name,
        bodycomment: this.contentComment
      }

      if (!this.postItem.comments && this.contentComment !== "") {
        this.isLoading = true
        setTimeout(() => {
          this.postItem.comments = [item]
          this.isLoading = false
        }, 200);
      }
      if (this.postItem.comments && this.contentComment !== "") {
        this.isLoading = true
        setTimeout(() => {
          this.postItem.comments.push(item)
          this.isLoading = false
        }, 200);
      }
      if (!JSON.parse(localStorage.getItem("localComments")) && this.contentComment !== "") {
        localStorage.setItem("localComments", JSON.stringify([comment]))
      }
      if (JSON.parse(localStorage.getItem("localComments")) && this.contentComment !== "") {
        let a = JSON.parse(localStorage.getItem("localComments"))
        a.push(comment)
        localStorage.setItem("localComments", JSON.stringify(a))
      }
      this.dialog = false
    }
  }
}

</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.red {
  background-color: red;
}

.overflowCustom {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.btnBack {
  position: fixed;
  left: 100px;
  font-size: 30px;
  text-decoration: underline !important;
}

.v-progress-circular {
  display: fixed;
  margin: auto;
  background-color: #f5f5f5;
  width: 100vh;
  height: 100vh;
}

.inputComment {
  padding: 20px 28px;
}
</style>