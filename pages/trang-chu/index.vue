<template>
    <div>
        <h1>Trang chủ</h1>
        <div class="headerAddPosr">
            <div > 
            <v-select
                v-model="defaultNumberRows"
                :items="numberRows"
                label="NumberRows"
                dense
                outlined
                class="mt-4 input-numberRows"
            ></v-select> 
            <template>
                Toltal: {{data.length}}
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
            class="mb-4"
            >
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
                    :key=index
                    class="postsItem"
                    @click="showDetailPostitem(item)"
                    >
                        <td> {{ item.id }} </td>
                         <td>{{ item.author }} </td>
                        <td>{{ item.title }}</td>
                        <!-- <td >
                            <v-btn></v-btn>
                        </td> -->
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
     
        </div>
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
                <v-dialog
                v-model="dialog"
                width="700"
                >
                    <v-card class="dialogAddPost">
                        <v-card-title class="text-h5 grey lighten-2">
                        Add new Post
                        </v-card-title>
                        <v-select
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
                        </p>
                        <v-text-field
                            v-model="title"
                            label="Title"
                        ></v-text-field>
                        <!-- <v-text-field
                            v-model="body"
                            label="Content"
                        ></v-text-field> -->
                        <v-textarea 
                            label="Content"
                            v-model="body"
                        ></v-textarea>
                        <v-btn
                            depressed
                            color="primary"
                            class="mt-4 center"
                            @click="savePost()"
                            :disabled="$v.$invalid"
                            >
                                SAVE
                        </v-btn>
                    </v-card>
                </v-dialog>
            </div>
        </template>
        <baseLoading :loading="isLoading"/>
    </div>
</template>

<script>
import { commit, dispatch, sync  } from 'vuex-pathify';
import baseLoading from '../../components/baseLoading.vue'
import { required } from "vuelidate/lib/validators";
    export default {
        data(){
            return{
                page: 1,
                posts: [],
                defaultNumberRows: 5,
                numberRows: [
                    5, 10, 15, 20
                ],
                data: [],
                lengthPagination: null,
                dialog: false, 
                title: '',
                body: '',
                author: "",
                authors: [
                    "Ronaldo",
                    "Messi",
                    "Mbappe",
                    "Ramos",
                    "Modric",
                    "Kroos",
                    "Neymar",
                    "Saka",
                    "Lukaku",
                    "Dybala",
                    "Isco",
                    "Marcelo",
                ],
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
        validations: {
            author: {
                required
            }, 
            // title: {
            //     required
            // },
            // body: {
            //     required
            // }
        },
        components: {
            baseLoading,
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
        computed:  {
            active: sync('manager/active'),
            dataPosts : sync('manager/posts')
        },  
        created(){
            this.getLayout()
            this.getData()
        },
        methods: {
            // delPost(val) {
            //     console.log("Ad");
            //     this.data = this.data.filter(x => x.id !== val.id) 
            //     localStorage.setItem("allData", JSON.stringify(this.data))
            //     this.changePagination
            // },
            search() {
                this.data = JSON.parse(localStorage.getItem("allData"))
                this.data = this.data.filter(x => 
                                    x.author.toLowerCase()
                                    .startsWith(this.input_search.toLowerCase())) 
                 
                this.changePagination()
            },
            changePagination(){
                this.isLoading = true
                this.posts = []
                if(this.data.length === 0) {
                    this.defaultNumberRows = 5
                    this.page = 1
                }
                else {
                    if(this.page > Math.floor(this.data.length / this.defaultNumberRows) 
                        && this.data.length % this.defaultNumberRows !== 0) {
                        this.page = Math.floor(this.data.length / this.defaultNumberRows) + 1
                    }
                    if(
                    this.page > Math.floor(this.data.length / this.defaultNumberRows) 
                        && this.data.length % this.defaultNumberRows === 0){
                            this.page = Math.floor(this.data.length / this.defaultNumberRows) 

                        }
                    this.posts = this.data.slice(
                        (this.page - 1 ) * this.defaultNumberRows,
                        (this.page ) * this.defaultNumberRows
                    )
                    this.lengthPagination = Math.ceil( this.data.length / this.defaultNumberRows )
                }
                setTimeout(() => {
                    this.isLoading = false
                }, 200);
            },
            async getData() {
                let id = ''
                let author = ''
                let title = ''
                let body = ''
                const posts = await JSON.parse(localStorage.getItem("posts"))
                const users = await JSON.parse(localStorage.getItem("users"))

                for(let k = 0 ; k < posts.length; k++) {
                    id = posts[k].id
                    title = posts[k].title
                    body = posts[k].body
                    for(let j = 0; j < users.length; j++ ) {
                        if(posts[k].userId === users[j].id){
                            author = users[j].name
                            const item = {
                                id: id,
                                title: title,
                                body: body,
                                author: author
                            }
                        this.data.push(item)
                        continue;
                        }
                    }
                }
                const newPost=  JSON.parse(localStorage.getItem("newPost"))
                if(newPost !==null){
                    this.data = newPost.concat(this.data)
                }
                for(let i = 0; i < 5; i++) {
                    this.posts.push(this.data[i])
                }
                localStorage.setItem("allData", JSON.stringify(this.data))
                this.lengthPagination = Math.ceil(this.data.length / 5 ) 
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
                localStorage.setItem("allData", JSON.stringify(this.data))
            },
            async savePost(){
                this.dialog = false
                this.isLoading = true
                const post = {
                    id: this.data.length +1,
                    title: this.title,
                    body: this.body,
                    author: this.author
                }

                // if(this.title === '' || this.body === '') {
                //     alert("Chưa nhập đủ thông tin nè!!!")
                // }
                // console.log("data", this.data)
                
                this.data.unshift(post)
                // console.log("data", this.data)
                if(JSON.parse(localStorage.getItem("newPost")) === null){
                    localStorage.setItem("newPost", JSON.stringify([post]))
                }
                else {
                    let newPost = JSON.parse(localStorage.getItem("newPost"))
                    newPost.push(post)
                    localStorage.setItem("newPost", JSON.stringify(newPost))
                }
                localStorage.setItem("allData", JSON.stringify(this.data))
                setTimeout(() => {
                    this.isLoading = false
                }, 7000);
                this.changePagination()
            }
        }
    }
</script>

<style lang="scss" scoped>
.text-danger{
    color: red;
    font-size: 12px;
}
.input-numberRows{
    width: 100px;
}
.dialogAddPost {
    padding: 40px;
}
.btnDel:hover {
    cursor: pointer;
    color: red;
}
.headerAddPosr{
    display: flex;
    justify-content: space-between;
}
</style>