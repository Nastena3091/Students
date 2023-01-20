<template>
   <main :class="theme">
    <button @click="changeTheme">Змінити тему</button>
       <h1>Students</h1>
       <div class="content">
           <router-view></router-view>
       </div>
   </main>
   
</template>

<script>
    export default {
        computed:{
            theme(){
                return this.$store.getters.getTheme
            }
        },
        methods:{
            changeTheme(){
                this.$store.commit('setTheme');
            }
        }
    }
</script>

<style scoped>
    .light{
        background-color:beige;
        color: indianred;
    }
    .dark{
        background-color: darkgrey;
        color:aliceblue
    }
    
</style>