<template>
    <div class="home">
        <v-btn
            class="btnHome"
            color="primary"
        >
            <NuxtLink to="/login"> Đăng nhập </NuxtLink>
        </v-btn>
        <v-btn
            class="btnHome"
            color="primary"
        >
            <NuxtLink to="/register"> Đăng kí </NuxtLink>
        </v-btn>
       
    </div>
</template>

<script>
    export default {
        created(){
            this.getData()
        },
        methods: {
            getData(){
            this.$store.dispatch("manager/getUsers")
            console.log(123)
            }
        }
    }
</script>

<style lang="scss" scoped>
a{
    text-decoration: none !important;
    color: #fff !important;
}
.home {
    display: flex;
    margin: auto;
    justify-content: center;
    margin-top: 100px;
    > .btnHome {
        color: #fff;
        margin: 10px;
    }
}
</style>