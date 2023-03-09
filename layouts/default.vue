<template>
  <v-app>
    <div v-if="active"  class="headerLayput">
        <v-toolbar  >
            <v-toolbar-title class="white--text ">
                <div class="text-center">
                    <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                        Menu
                        </v-btn>
                    </template>
                    <v-list>
                        <div>
                            <p class="v-list-item"> {{ infoUser.name }} </p>
                            <p class="v-list-item"> {{ infoUser.email }}</p>
                            <p class="v-list-item" @click="changeInfo()"> Change Information</p>
                        </div>
                    </v-list>
                    </v-menu>
                </div>
            </v-toolbar-title>
            <div class="btnLogOut">
                  <v-btn
                    depressed
                    color="error"
                    @click="logOut()"
                  >
                    Logout
                  </v-btn>
                </div>
        </v-toolbar>
        
        <v-dialog
            v-model="dialog"
            width="700"
         >
            <v-card class="dialogEditUser">
               <v-card-title class="text-h5 grey lighten-2 mb-4">
                  Edit user information
               </v-card-title>
               <v-text-field
                  v-model="infoUser.name"
                  label="Name"
                  :rules="nameRules"
                  required
               ></v-text-field>
               <v-text-field
                  v-model="infoUser.email"
                  label="Email"
                  :rules="emailRules"
                  required
               ></v-text-field>
               <v-text-field
                v-model="infoUser.phone"
                label="Phone"
                :rules="phoneRules"
                required
            ></v-text-field>
               <div class="form-group d-flex align-center">
               <div class="mr-4">
                  <v-menu
                     ref="menu"
                     v-model="menu"
                     :close-on-content-click="false"
                     transition="scale-transition"
                     offset-y
                     min-width="auto"
                     >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="infoUser.dayOfBirth"
                        label="Birthday date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"  
                    
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="infoUser.dayOfBirth"
                    :active-picker.sync="activePicker"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                    
                ></v-date-picker>
                </v-menu>
                <!-- <p class="text-errors" >
                    Day of birth required
                </p> -->
            </div>  
               <label for>Gender:</label>
               <v-checkbox
                  v-model="infoUser.gender"
                  value="male"
                  label="Male"
                  type="radio"
                  class="p-4"
                  required
                  
               > </v-checkbox>
               <v-checkbox
                  v-model="infoUser.gender"
                  value="FeMale"
                  label="Female"
                  type="radio"
                  required
               ></v-checkbox>
            </div>
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
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <baseLoading :loading="isLoading"/>
  </v-app>
</template>

<script>
import { get, sync } from 'vuex-pathify'
import baseLoading from '../components/baseLoading.vue'

export default {
  name: 'DefaultLayout',
    data() {
      return {
        //  infoUser: {},
         dialog: false,
         name: "name",
         email: "email",
         dayOfBirth: "",
         menu: false,
         activePicker: null,
         gender: "",
         nameRules: [
          v => !!v || 'Name is required',
        ],
         emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        
        phoneRules: [
          v => !!v || 'Phone is required',
          v => v.length <= 11 || 'Phone must be 10 - 11 characters' ,
          v => v.length >= 10 || 'Phone must be 10 - 11 characters'
        ],
        isLoading: false
      }
    }, 
    components: {
      baseLoading,
    },
    created() {
        this.getData()
    },
    watch: {
    menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
   },
    computed:  {
      active: sync('manager/active'),
      infoUser: sync('manager/loginUser')
    }, 
    methods: {
      async getData(){
        // this.infoUser = await JSON.parse(localStorage.getItem("loginUser"))
      },
      changeInfo() {
        this.dialog= true
      },
      savePost() {
        this.isLoading = true
        localStorage.setItem("loginUser", JSON.stringify(this.infoUser) )
        setTimeout(() => {
          this.isLoading = false
        }, 400);
        this.dialog = false
      },
      logOut() {
          this.$router.push("/login")
      }
    }
  }
</script>
<style scoped lang="scss">
.default-layout {
  > :deep(.v-application__wrap) > .v-navigation-drawer {
    box-shadow: 3px 0 10px 0 rgb(0 0 0 / 50%);
  }
}
.v-toolbar__content {
    height: 64px;
    display: flex;
    justify-content: space-between !important;
  }

.v-list-item {
    padding: 0 20px;
    margin: 0;
    font-size: 14px;

    &:hover{
        cursor: pointer;
        background-color: #f5f5f5;
    }
}
.dialogEditUser {
   padding: 40px
}
.btnLogOut {
  position: fixed;
  right: 20px;
}
</style>
