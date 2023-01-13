import {createApp} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// var stud = [{
//     "id" : 1,
//     "pib" : "Andrii Kurkov",
//     "zdav" : true,
//     "group" : "RPZ 19 2/9",
//     "src": "https://orig00.deviantart.net/ee08/f/2009/073/e/d/free_red_panda_icon_100x100_by_supertuffpinkpuff.png"
// },
// {
//     "id" : 2,
//     "pib" : "Serhii Plohij",
//     "zdav" : false,
//     "group" : "RPZ 19 1/9",
//     "src": "https://cdn-learn.adafruit.com/assets/assets/000/012/878/thumb100/led_strips_doge.bmp?1386611464"
// },
// {
//     "id" : 3,
//     "pib" : "Yurko Izdryk",
//     "zdav" : true,
//     "group" : "RPZ 19 2/9",
//     "src": "https://vignette.wikia.nocookie.net/adventuretime/images/9/99/AT_Icons_100x100_Jake.jpg/revision/latest?cb=20120919222926&path-prefix=ar"
// }
// ]

createApp({
     data(){
        return {
        students: [],
        student: [{"_id": "","name": "", "isDonePr": false,"mark": "", "group": ""}],
        search:'',
        searchedStudents:[],
        }
         
     },	 
     mounted: function(){
        axios.get("http://34.82.81.113:3000/students").then((response)=>{
            console.log(response.data);
            this.students = response.data;
            this.searchedStudents=response.data;
            
        })
         
     },
     methods: {
        deleteStudent(a){
            this.searchedStudents=this.searchedStudents.filter(element=>{
                return element._id!=a
            })
            this.students=this.students.filter(element=>{
                return element._id!=a
            })
        },
        searchStudent(){
            this.searchedStudents=this.students.filter(element=>{
                return element.name.includes(this.search)==true
            })
        },
        addStudent(){
            this.student._id = this.students.length+1;
            this.students.push({...this.student});
            console.log(this.students);
            this.searchedStudents=this.students;
            this.student= {"_id":"","name": "", isDonePr: false, group: ""}
        },
     },
  
 }).mount('#app');

