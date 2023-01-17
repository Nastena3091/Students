<template>
    <div class="student">
        <div class="photo">
            <img :src="student.photo" alt="" @click="isOpen = true">
        </div>
        <div class="info">
            <p>{{ student.name }}</p>
            <p>{{ student.group }}</p>
            <p>Робота {{ isDonePrOfStudent }}</p>
        </div>
    </div>
    <Modal :open="isOpen" @close="isOpen = !isOpen">
        <img :src="student.photo" alt="" width="600">
    </Modal>
    
    
</template>

<script>
    import Modal from "./modal/Modal.vue";
    import axios from 'axios';
    import { ref } from "vue";

    export default {
       props: {
           id: '',
       },
       components: { Modal },
       setup() {
            const isOpen = ref(false);

            return { isOpen };
        },
       data() {
           return {
               student: {},
           };
       },
       mounted(){
        axios.get(`http://34.82.81.113:3000/students/${this.id}`).then((res) => {
            this.student = res.data;
            console.log(res.data)
        })
       },
       computed: {
        isDonePrOfStudent(){
            return this.student.isDonePr? 'здана':'не здана'
        }
       }
    }
</script>

<style scoped>

</style>