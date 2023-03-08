<template>
    <div>
        <div class="btnBack">
            <NuxtLink to="/trang-chu"> <-- Go back</NuxtLink>  
        </div>
        <v-card
            class="mx-auto my-6"
            max-width="700"
        >
            <v-list-item-avatar color="mr-2  ml-4 grey darken-3">
                <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
                
            </v-list-item-avatar>
            <strong>
                {{ postItem.author }}
            </strong>
            <v-card-title class="text-h5 pt-0">
              {{ postItem.title }}
            </v-card-title>
            <v-card-subtitle>
                {{ postItem.body }}
            </v-card-subtitle>
            <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                <v-img
                    height="300"
                    width="500"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="deep-purple lighten-2"
                    text
                >
                    LIKE
                </v-btn>
                <v-btn
                    color="deep-purple lighten-2"
                    text
                    @click="addComments()"
                >
                    COMMENT
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            class="mx-auto my-6"
            max-width="700"
            v-for="(item, index) in this.postItem.comments"
            :key=index
        >
            <v-list-item-avatar color="mr-2  ml-4 mb-0 grey darken-2">
                <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
                
            </v-list-item-avatar>
            <strong>{{ item.name }}</strong>
            <v-card-subtitle class="pt-0 pb-0 pl-16 overflowCustom" >{{ item.bodycomment }}</v-card-subtitle>
        </v-card>
        <template>
            <div class="text-center">
                <v-dialog
                v-model="dialog"
                width="500"
                >

                <v-card class="p-4">
                    <v-card-title class="text-h5 grey lighten-2">
                    Comment
                    </v-card-title>
                    <v-text-field
                        v-model="contentComment"
                        label="Content Comment"
                        required
                        class="inputComment"
                    ></v-text-field>
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="saveComments()"
                    >
                        SAVE
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
        </template>
        <baseLoading :loading="isLoading"/>
        </div>
</template>

<script>

import baseLoading from '../../components/baseLoading.vue'
    export default {
        data(){
            return {
                posts: [],
                comments: [],
                postItem: {},
                commentsPost: [],
                dialog: false,
                contentComment: '',
                isLoading: false
            }
        },
        components: {
            baseLoading,
        },
        created() {
            this.isLoading=true
            setTimeout(() => {
                this.getData()
                this.isLoading = false
            }, 200);
            
        },
        methods: {
            async getData(){
                await this.$store.dispatch("manager/getCommnents")
                this.comments = JSON.parse(localStorage.getItem("comments"))
                if(JSON.parse(localStorage.getItem("localComments")) !== null){
                    this.comments = this.comments.concat(JSON.parse(localStorage.getItem("localComments")))
                }
                this.posts = JSON.parse(localStorage.getItem("allData"))
                this.postItem = this.posts.filter((x) => x.id == this.$route.params.id)[0] || posts[0]
                console.log("postItem", this.comments)
               
                for(let j = 0; j < this.comments.length; j++ ) {
                    if(this.comments[j].postId === this.postItem.id){
                        const bodyComment = this.comments[j].body
                        const  name = this.comments[j].name
                        const item = {
                            bodycomment: bodyComment,
                            name: name
                        }
                    if(this.commentsPosts ===  []) {
                        this.commentsPost = [item]
                        }
                    else{ 
                        this.commentsPost.push(item)
                        }
                    }
                }
                this.postItem = {
                    id : this.postItem.id,
                    title:  this.postItem.title,
                    body: this.postItem.body,
                    author: this.postItem.author,
                    comments : this.commentsPost
                }
                console.log("cmt", this.postItem )
            },
            addComments() {
                this.dialog = true     
                this.contentComment = ''
            },
            saveComments(){
                const user = JSON.parse(localStorage.getItem("loginUser"))
                const comment = {
                    postId : this.postItem.id,
                    id: this.comments.length +1,
                    name: user.name,
                    email: user.email,
                    body: this.contentComment
                }
                const item = {
                    name: user.name,
                    bodycomment: this.contentComment
                }

                if(!this.postItem.comments && this.contentComment !== "") {
                    this.isLoading = true
                    setTimeout(() => {
                        this.postItem.comments = [item]
                        this.isLoading = false
                    }, 200); 
                }
                if(this.postItem.comments && this.contentComment !== "") {
                    this.isLoading = true
                    setTimeout(() => {
                        this.postItem.comments.push(item)
                        this.isLoading = false
                    }, 200);  
                }
                console.log("ddd", this.contentComment)
                if(!JSON.parse(localStorage.getItem("localComments")) && this.contentComment !== "") {
                    localStorage.setItem("localComments", JSON.stringify([comment]))
                }
                if(JSON.parse(localStorage.getItem("localComments")) && this.contentComment !== "") {
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
.red{ 
    background-color: red;
}
.overflowCustom{
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

.v-progress-circular{
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