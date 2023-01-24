<template>
        <div id="app">
            <button @click="logout">Вийти</button>
            <p>Кількість студентів: {{ studentsCount }}</p>
		<div class="addStud">
			<input type="text" placeholder="ПІБ" v-model="student.name">
			<select id="select" v-model="student.group">
				<option value="RPZ 19 1/9">RPZ 19 1/9</option>
				<option value="RPZ 19 2/9">RPZ 19 2/9</option>
			</select>
			<input type="text" placeholder="Оцінка" v-model="student.mark">
			<input type="checkbox" name="" id="" v-model="student.isDonePr">Наявність роботи
			<pre></pre>
			<button @click="addStudent">Додати студента</button>
		</div>
		<pre></pre>
		<input type="text" @input="searchStudent" v-model="search" placeholder="Пошук">
		<pre></pre>
		<table>
			<thead>
				<tr>
					<td>ПІБ</td>
					<td>Група</td>
					<td>Оцінка</td>
					<td>Наявність роботи</td>
					<td colspan="2">Дії</td>
				</tr>
			</thead>
			<tbody :class="theme">
				<tr v-for="st in searchedStudents" :key="st._id">
					<td><router-link :to="'/student-info/'+st._id" v-if="update!=st._id">{{st.name}}</router-link><input type="text" :value="st.name" @input="st.name=$event.target.value" v-else></td>
					<td><span v-if="update!=st._id">{{st.group}}</span>
						<select id="select" v-model="st.group" v-else>
							<option value="RPZ 19 1/9">RPZ 19 1/9</option>
							<option value="RPZ 19 2/9">RPZ 19 2/9</option>
						</select>
					</td>
					<td><span v-if="update!=st._id">{{st.mark}}</span><input type="text" :value="st.mark" @input="st.mark=$event.target.value" v-else></td>
					<td><input type="checkbox" v-model="st.isDonePr" disabled v-if="update!=st._id"><input type="checkbox" v-model="st.isDonePr" v-else></td>
					<td><a @click="deleteStudent(st._id)" v-show="st.group === getCurrentUser.group">Видалити</a></td>
					<td><img src="https://img.icons8.com/plumpy/24/null/pencil-tip.png" v-if="update!=st._id" @click="updateShow(st._id)" v-show="st.group === getCurrentUser.group"/><a v-else @click="updateStudent(st._id)">Підтвердити</a></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
 
    export default {
        data(){
            return {
                students: [],
                student: [{"_id": "","name": "", "isDonePr": false,"mark": "", "group": ""}],
                search:'',
                searchedStudents:[],
                update:'',
                updatedStudent: [],
            }
            
        },	 
        mounted: function(){
            this.axios.get("http://34.82.81.113:3000/students").then((response)=>{
                console.log(response.data);
                this.students = response.data;
                this.searchedStudents=response.data;
                this.$store.commit('setCount', this.students.length);
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
                this.axios.delete(`http://34.82.81.113:3000/students/${a}`).then((response)=>{
                    console.log(response.data);
                    this.$store.commit('setCount', this.students.length);
                })
            },
            searchStudent(){
                this.searchedStudents=this.students.filter(element=>{
                    return element.name.includes(this.search)==true
                })
            },
            addStudent(){
                if(this.student.name &&this.student.mark&&this.student.group){
                    this.axios.post("http://34.82.81.113:3000/students", {
                        "name": this.student.name,
                        "isDonePr": this.student.isDonePr,
                        "mark": this.student.mark,
                        "group": this.student.group
                    }).then((response)=>{
                        console.log(response.data);
                        this.student=response.data;
                        this.students.push({...this.student});
                        this.searchedStudents=this.students;
                        this.student= {"_id":"","name": "", isDonePr: false, "mark": "", group: ""};
                        this.$store.commit('setCount', this.students.length);
                    })
                }
            },
            updateShow(id){
                this.update=id;
                console.log(this.update)
            },
            updateStudent(id){
                this.updatedStudent=this.students.find(element=>{
                    return element._id == id;
                })
                this.axios.put(`http://34.82.81.113:3000/students/${id}`,{
                    "name": this.updatedStudent.name,
                    "isDonePr": this.updatedStudent.isDonePr,
                    "mark": this.updatedStudent.mark,
                    "group": this.updatedStudent.group
                }).then((response)=>{
                    console.log(response);
                })
                this.update='';
            },
            logout(){
                this.$store.commit("setUser", null);
                this.$router.push("/login");
            }
        },
        computed: {
            studentsCount () {
                return this.$store.getters.getCount
            },
            theme(){
                return this.$store.getters.getTheme
            },
            getCurrentUser() {
                return this.$store.getters.getUser
            }
        },
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }
    .dark a{
        color:aliceblue;
    }
    table{
        
        border-collapse: collapse;
        
        width: 100%;
    }
    table input{
        width: 80%;

    }
    td{
        text-align: center;
        padding: 10px;
        border: 1px solid indianred;
    }
    thead{
        font-weight: 600;
    }
    .dark table{
        background-color: cadetblue;
    }
    .light table{
        background-color: blanchedalmond;
        border: 2px indianred solid;
    }
    .light tbody tr:nth-child(odd) {
        background-color:azure;
    }
    .dark tbody tr:nth-child(odd) {
        background-color:darkslategray;
    }
    #app{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
    input[type="text"],button{
        margin: 10px;
    }
</style>