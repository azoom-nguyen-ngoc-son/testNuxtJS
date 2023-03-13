<template>
    <div>
			<v-card 
      class="mx-auto my-6" 
      max-width="700">
      <v-list-item-avatar 
        color="mr-2 ml-4 grey darken-3">
        <v-img 
          class="elevation-6" 
          alt=""
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        >
      </v-img>
      </v-list-item-avatar>
      <strong>
        {{ postItem.author }}
      </strong>
      <v-card-title class="text-h5 pt-0">
        {{ postItem.title }}
      </v-card-title>
      <v-card-subtitle class="overflowCustom">
        {{ postItem.body }}
      </v-card-subtitle>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-img 
            height="300" 
            width="500" 
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          >
          </v-img>
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
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
      </v-list-item-avatar>
      <strong>
        {{ item.name }}
      </strong>
      <v-card-subtitle 
        class="pt-0 pb-0 pl-16 overflowCustom"
      >
        {{ item.bodycomment }}
      </v-card-subtitle>
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
            <v-textarea 
              label="Content Comment" 
              class="inputComment" 
              required 
              v-model="contentComment"
            ></v-textarea>
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
    </div>
</template>

<script>
  export default {
	  data(){
			return {
				dialog: false,
				contentComment: '',
			}
		},
		name:"CardItem",
		props: {
			postItem: {
			  type: Object,
			},
			comments: {
				type: Array
			}
		},
		methods: {
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
.inputComment {
  padding: 20px 28px;
}
</style>