<template>
    <div>
        <input v-model="inputUser" type="text" placeholder="ім'я студента" required />
        <button @click="login">Ввійти</button>
    </div>
 </template>
 
 
 <script>
 export default {
    data() {
        return {
            inputUser: '',
        }
    },
    methods: {
        login() {
            this.axios.get("http://34.82.81.113:3000/students/name/"+this.inputUser).then((response) => {
                if((response.data === null) || (response.data.name == "CastError")) {
                    alert("Такого студента не існує");
                    this.inputUser = '';
                    return
                }
                this.$store.commit('setUser', response.data)
                this.$router.push('/');
            })
        }
    }
 }
 </script>
 
 
 <style module>
 </style>