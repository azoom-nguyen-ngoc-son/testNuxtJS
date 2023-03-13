<template>
  <div class="loginForm">
    <h2 class="title">ĐĂNG NHẬP USER</h2>
    <v-form ref="form" lazy-validation>
      <v-text-field 
        v-model="email" 
        label="Email" 
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <div class="text-errors">
        <p 
          v-if="!$v.email.required && $v.email.$dirty" 
          class="text-danger"
        >
          Email is required!
        </p>
        <p 
          v-if="!$v.email.email && $v.email.$dirty" 
          class="text-danger"
        >
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
          class="text-danger"
        >
          Password must be 8 chacrater
        </p>
        <p 
          v-if="passWrong" 
          class="text-danger"
        >
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
          <NuxtLink 
            class="contentLink" 
            to="/register"
          > 
          Tạo tài khoản mới
          </NuxtLink>
        </v-btn>
      </div>

    </v-form>
    <BaseLoading :loading="isLoading" />

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
import { commit, dispatch, sync, call } from 'vuex-pathify';
import BaseLoading from '../../components/base-loading.vue'
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
    BaseLoading,
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
    async loginUser() {
      this.$v.$touch()
      this.isLoading = true
      const users = await this.$store.dispatch("manager/getUsers")
      console.log("ddd", this.email)
      const loginUser = users.filter(item =>
        item.email === this.email
        && item.password === this.password)
      console.log("login", loginUser)
      if(loginUser && loginUser.length > 0) {
        localStorage.setItem("loginUser", JSON.stringify(loginUser[0]))
        this.$router.push(`/trang-chu/${loginUser.name}`)
        this.isLoading = false
      }
      else {
        this.passWrong = true
        this.isLoading = false
        alert("Sai tên đăng nhập hoặc mật khẩu !!!")
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loginForm {
  display: flex;
  margin: auto;
  justify-content: center;
  width: 500px;
  flex-direction: column;
  margin-top: 150px;
  border: 4px solid #55bbf3;
  padding: 20px;
  border-radius: 8px;

  >.title {
    margin: auto;
  }
}

.footerLoginPage>.btnRegister {
  display: flex;
  margin: auto;
  margin-top: 20px;
  background-color: #55bbf3 !important;
}

.text-errors {
  color: red;
  font-size: 12px;
}

.center {
  display: flex;
  margin: auto;
}
</style>