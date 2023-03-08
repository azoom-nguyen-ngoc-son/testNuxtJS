<template>
    <div class="loginForm">
        <h2 class="title">ĐĂNG NHẬP USER</h2>
        <v-form
            ref="form"
            lazy-validation
            >
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
                    v-if="(!$v.password.minLength) && $v.password.$dirty" 
                    class="text-danger">
                    Password must be 8 chacrater
                </p>
                <p 
                    v-if="passWrong" 
                    class="text-danger">
                    Password wrong !!!
                </p>
            </div>
            <div class="footerLoginPage">
                 <v-btn
                    :disabled="!$v.$invalid"
                    color="primary"
                    class="center"
                    @click="loginUser()"
                    >
                    Đăng nhập
                </v-btn>
                <v-btn 
                    color="primary"
                    class="btnRegister"
                    >
                    <NuxtLink class="contentLink" to="/register"> Tạo tài khoản mới</NuxtLink>
                </v-btn>
            </div>
       
        </v-form>
        <baseLoading :loading="isLoading"/>

    </div>
</template>

<script>
import {
  required,
  alpha,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { commit, dispatch, sync, call  } from 'vuex-pathify';
import baseLoading from '../../components/baseLoading.vue'
    export default {
        data: () => ({
            name: "",
            email: "",
            password: "",
            users: [], 
            passWrong: false,
            isLoading: false
        }),
        components: {
            baseLoading,
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
            password: {
                required,
                maxLength: maxLength(12),
                minLength: minLength(6)
                },
            },
        created() {
            this.$store.commit("manager/disableLayout");
        },
        methods: {
                // loginUser:  call('manager/addUsers  ')
            async loginUser(){
                    // const dataLocal = JSON.parse(localStorage.getItem("users"))
                this.$v.$touch()
                this.isLoading = true
                const user = {
                    email: this.email,
                    password: this.password,
                }
                const result = JSON.parse(localStorage.getItem("users"))
                    .filter(item => 
                        item.email === user.email 
                        && item.password === user.password)
                if(result && result.length > 0) {
                    await this.$store.dispatch("manager/getPosts")
                    await localStorage.setItem("loginUser", JSON.stringify(result[0]))
                    this.isLoading = false
                    this.$router.push("/trang-chu")
                }
                else{
                    this.passWrong = true
                    this.isLoading = false
                    alert("Sai tên đăng nhập hoặc mật khẩu !!!" )
                    this.isLoading = false
                }
                this.isLoading = false
            }
        }   
    }
</script>

<style lang="scss" scoped>
.loginForm{
    display: flex;
    margin: auto;
    justify-content: center;
    width: 500px;
    flex-direction: column;
    margin-top: 150px;
    border: 4px solid #55bbf3;
    padding: 20px;
    border-radius: 8px;
    > .title{
        margin: auto;
    }
}
.footerLoginPage > .btnRegister {
    display: flex;
    margin: auto;
    margin-top: 20px;
    background-color: #55bbf3 !important;
}
.text-errors{
    color: red;
    font-size: 12px;
}
.center{
    display: flex;
    margin: auto;
}

</style>