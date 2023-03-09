<template>
    <div class="registerForm">
        <h2 class="title">ĐĂNG KÍ USER</h2>
        <v-form
            ref="form"
            lazy-validation
            >
            <v-text-field
                v-model="name"
                label="Name"
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
            ></v-text-field>
            <div class="text-errors">
                <p 
                    v-if="!$v.name.required && $v.name.$dirty" 
                    class="text-danger">
                    Name is required!
                </p>
                <p 
                    v-if="(!$v.name.alpha) && $v.name.$dirty" 
                    class="text-danger">
                    Name must be alpha!
                </p>
                <!-- <p 
                    v-if="!$v.name.minlength && $v.name.$dirty" 
                    class="text-danger">
                    Name must be 3 chacraters!
                </p> -->
            </div>
            <v-text-field
                v-model="email"
                label="Email"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            ></v-text-field>
            <div class="text-errors">
                <p 
                    v-if="!$v.email.required && $v.email.$dirty" 
                    class="text-danger">
                    Email is required!
                </p>
                <p 
                    v-if="!$v.email.email && $v.email.$dirty" 
                    class="text-danger">
                    email is not email!
                </p>
            </div>
            <v-text-field
                v-model="phone"
                label="Phone"
                @input="$v.phone.$touch()"
                @blur="$v.phone.$touch()"
            ></v-text-field>
            <div class="text-errors">
                <p 
                    v-if="!$v.phone.required && $v.phone.$dirty" 
                    class="text-danger">
                    Phone is required!
                </p>
                <p 
                    v-if="(!$v.phone.numeric || !$v.phone.maxLength || !$v.phone.minLength  ) && $v.phone.$dirty && $v.phone.required" 
                    class="text-danger">
                    Phone is not phone! (10 - 11 characrers)
                </p>
            </div>
            <v-text-field
                v-model="password"
                label="Password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            ></v-text-field>
            <div class="text-errors">
                <p 
                    v-if="!$v.password.required && $v.password.$dirty" 
                    class="text-danger">
                    Password is required!
                </p>
                <p 
                    v-if="(!$v.password.specialCharacters || !$v.password.minLength) && $v.password.$dirty" 
                    class="text-danger">
                    Password must be 8 chacraters and includes special characters
                </p>
            </div>
            <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                @input="$v.confirmPassword.$touch()"
                @blur="$v.confirmPassword.$touch()"
            ></v-text-field>
            <div class="text-errors">
                <p 
                    v-if="!$v.confirmPassword.required && $v.confirmPassword.$dirty" 
                    class="text-danger">
                    Confirm password is required!
                </p>
                <p  
                    v-if="(confirmPassword !== password) && $v.confirmPassword.$dirty" 
                    class="text-danger">
                    Not match
                </p>
            </div>
            <div>
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
                        v-model="dayOfBirth"
                        label="Birthday date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"  
                        @input="$v.dayOfBirth.$touch()"
                        @blur="$v.dayOfBirth.$touch()" 
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="dayOfBirth"
                    :active-picker.sync="activePicker"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                ></v-date-picker>
                </v-menu>
                <p class="text-errors" v-if="!$v.dayOfBirth.required && $v.dayOfBirth.$dirty">
                    Day of birth required
                </p>
            </div>     
            <div class="form-group d-flex align-center">
                <label for>Gender:</label>
                <v-checkbox
                    v-model="gender"
                    value="male"
                    label="Male"
                    type="radio"
                    class="p-4"
                    required
                    @input="$v.gender.$touch()"
                    @click="$v.gender.$touch()"
                > </v-checkbox>
                <v-checkbox
                    v-model="gender"
                    value="FeMale"
                    label="Female"
                    type="radio"
                    required
                ></v-checkbox>
            </div>
            <span 
                v-if="!$v.gender.required && $v.gender.$dirty" 
                class="text-errors">Gender is required!
            </span>
            <v-btn      
                :disabled="$v.$invalid"
                color="primary"
                class="center"
                @click="registerUser"
                >
                Đăng kí
            </v-btn>
        </v-form>
        <baseLoading :loading="isLoading"/>
    </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  numeric,
  alpha,
  email,helpers
} from "vuelidate/lib/validators";
import { get, sync, commit, call } from 'vuex-pathify'
const specialCharacters = (value) =>  /[#?!@$%^&*-]/.test(value)
import baseLoading from '../../components/baseLoading.vue'

export default {
  data: () => ({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dayOfBirth: "",
    gender: "",
    checkConfirmPassword: false,
    activePicker: null,
    menu: false,
    isLoading: false
  }),
    watch: {
    menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
  },
  components: {
            baseLoading,
        },
    computed: {
      // wildcards can be problematic as state needs to exist before creating
    //   active : get('manager'),
    //   ...sync('manager/*')
    },
    validations: {
        name: {
            required,
            alpha,
        },
        email: {
            required,
            email,
        },
        phone: {
            required,
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(11) ,
        },
        password: {
            required,
            minLength: minLength(8),
            specialCharacters,
        },
        confirmPassword: {
        required,
        },
        dayOfBirth: {
            required,
        },
        gender: {
        required
        }, 
  },
  methods: { 
    save (date) {
        this.$refs.menu.save(date)
      },
    // callApi: call('manager/getUsers'),
    async registerUser() {
        this.$v.$touch();
        this.isLoading = true
        const users = await this.$store.dispatch("manager/getUsers")
        const infoUser = {
            id: users.length + 1,
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            dayOfBirth: this.dayOfBirth,
            gender: this.gender,
        }
        users.push(infoUser)
         await localStorage.setItem("users", JSON.stringify(users))
         await localStorage.setItem("loginUser", JSON.stringify(infoUser))
         await this.$store.dispatch("manager/getPosts")
         this.$store.commit("manager/getLoginUser")
         this.loading = false
         this.$router.push("/trang-chu")
        
    },
  }
};
</script>

<style lang="scss" scoped>
.text-errors{
    color: red;
    font-size: 12px;
}
.registerForm{
    display: flex;
    margin: auto;
    justify-content: center;
    width: 500px;
    flex-direction: column;
    margin-top: 50px;
    border: 4px solid #55bbf3;
    padding: 20px;
    border-radius: 8px;
    > .title{
        margin: auto;
    }
}
.center{
    display: flex;
    margin: auto;
}
</style>