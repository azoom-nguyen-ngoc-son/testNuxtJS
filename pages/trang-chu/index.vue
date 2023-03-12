<template>
  <div>
    <h1>Trang chủ</h1>
    <div class="headerAddPosr">
      <div>
        <v-select 
          v-model="defaultNumberRows" 
          :items="numberRows" 
          label="NumberRows" 
          dense 
          outlined
          class="mt-4 input-numberRows"
        ></v-select>
        <template>
          Toltal: {{ dataPosts.length }}
        </template>
      </div>
      <v-btn 
        depressed 
        color="primary" 
        class="mt-4" 
        @click="addPost()"
      >
        Add new Post
      </v-btn>
    </div>
    <div>
      <v-text-field 
        label="Search" 
        v-model="input_search" 
        hide-details="auto" 
        class="mb-4">
      </v-text-field>
      <div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Id
                </th>
                <th class="text-left">
                  Author
                </th>
                <th class="text-left">
                  Title
                </th>
                <!-- <th class="text-left">
                        Action
                    </th> -->
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in posts" 
                :key=index class="postsItem" 
                @click="showDetailPostitem(item)">
                <td> {{ item.id }} </td>
                <td>{{ item.author }} </td>
                <td>{{ item.title }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
    <hr>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination 
                v-model="page" 
                class="my-4" 
                :length="lengthPagination"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog" width="700">
          <v-card class="dialogAddPost">
            <v-card-title class="text-h5 grey lighten-2">
              Add new Post
            </v-card-title>
            <!-- <v-select 
              v-model="author"
              class="mt-4" 
              :items="authors" 
              label="Choose author" 
              solo
              @blur="$v.author.$touch()"
            ></v-select>
            <p 
              v-if="!$v.author.required && $v.author.$dirty" 
              class="text-danger">
              Author is required!
            </p> -->
            <v-text-field 
              v-model="title" 
              label="Title"
              class="mt-4"
              >
            ></v-text-field>
            <v-textarea 
              label="Content" 
              v-model="body"
            ></v-textarea>
            <v-btn  
              depressed 
              color="primary" 
              class="mt-4 center" 
              @click="savePost()" 
            >
              SAVE
            </v-btn>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <BaseLoading :loading="isLoading" />
  </div>
</template>

<script>
import { commit, dispatch, sync } from 'vuex-pathify';
import BaseLoading from '../../components/base-loading.vue'
export default {
  data() {
    return {
      page: 1,
      posts: [],
      defaultNumberRows: 5,
      numberRows: [
        5, 10, 15, 20
      ],
      dataPosts: [],
      lengthPagination: null,
      dialog: false,
      title: '',
      body: '',
      users: '',
      dataTable: [],
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      input_search: null,
      isLoading: false
    }
  },
  components: {
    BaseLoading,
  },
  watch: {
    page() {
      this.changePagination()
    },
    defaultNumberRows() {
      this.changePagination()
    },
    input_search() {
      this.search()
    }
  },
  computed: {
    active: sync('manager/active'),
  },
  created() {
    this.getLayout()
    this.getDataPost()
  },
  methods: {
    search() {
      this.dataPosts = JSON.parse(localStorage.getItem("dataPosts"))
      this.dataPosts = this.dataPosts.filter(x =>
        x.author.toLowerCase()
          .startsWith(this.input_search.toLowerCase()))
      console.log("this.dataPost", this.data)
      this.changePagination()
    },
    changePagination() {
      this.isLoading = true
      this.posts = []
      if (this.dataPosts.length === 0) {
        this.defaultNumberRows = 5
        this.page = 1
      }
      else {
        console.log("this.dataPost", this.dataPosts.length)
        if (this.page > Math.floor(this.dataPosts.length / this.defaultNumberRows)
          && this.dataPosts.length % this.defaultNumberRows !== 0) 
        {
          this.page = Math.floor(this.dataPosts.length / this.defaultNumberRows) + 1
        }
        if (
          this.page > Math.floor(this.dataPosts.length / this.defaultNumberRows)
          && this.dataPosts.length % this.defaultNumberRows === 0) 
        {
          this.page = Math.floor(this.dataPosts.length / this.defaultNumberRows)

        }
        this.posts = this.dataPosts.slice(
          (this.page - 1) * this.defaultNumberRows,
          (this.page) * this.defaultNumberRows
        )
        console.log("this.posts", this.posts)
        this.lengthPagination = Math.ceil(this.posts.length / this.defaultNumberRows)
      }
      setTimeout(() => {
        this.isLoading = false
      }, 200);
    },
    async getDataPost() {
      this.isLoading = true
      let id = ''
      let author = ''
      let title = ''
      let body = ''
      const posts = await this.$store.dispatch("manager/getPosts")
      const users = await this.$store.dispatch("manager/getUsers")
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
              author: author
            }
            this.dataPosts.push(item)
            continue;
          }
        }
      }
      for(let i = 0; i < 5; i++) {
          this.posts.push(this.dataPosts[i])
      }
      console.log("this.post", this.posts)
      localStorage.setItem("dataPosts", JSON.stringify(this.dataPosts))
      this.lengthPagination = Math.ceil(this.dataPosts.length / 5)
      this.isLoading = false
    },
    getLayout() {
      this.$store.commit("manager/getLayout");
    },
    showDetailPostitem(val) {
      this.$router.push(`trang-chu/${val.id}`)
    },
    addPost() {
      this.dialog = true
      this.title = ''
      this.author = ""
      this.body = ''
    },
    async savePost() {
      this.dialog = false
      this.isLoading = true
      const loginUser = JSON.parse(localStorage.getItem("loginUser"))
      const post = {
        id: this.dataPosts.length + 1,
        title: this.title,
        body: this.body,
        userId: loginUser.id
      }
      const dataPost= {
        id: this.dataPosts.length + 1,
        title: this.title,
        body: this.body,
        author: loginUser.name
      }
      this.dataPosts.unshift(dataPost)
      localStorage.setItem("dataPosts", JSON.stringify(this.dataPosts))
      this.$store.dispatch("manager/addPosts", post)
      this.isLoading = false
      this.changePagination()
    }
  }
}
</script>

<style lang="scss" scoped>
.text-danger {
  color: red;
  font-size: 12px;
}

.input-numberRows {
  width: 100px;
}

.dialogAddPost {
  padding: 40px;
}

.btnDel:hover {
  cursor: pointer;
  color: red;
}

.headerAddPosr {
  display: flex;
  justify-content: space-between;
}
</style>