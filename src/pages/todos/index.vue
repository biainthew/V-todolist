<template>
    <div class="container">
        <h2>TODO-List</h2>
        <button class="btn" @click="moveToCreatePage">create todo</button>
        <input type="text" placeholder="검색" class="form-control" v-model="serchText">
        <!-- <TodoSimpleForm  @add-todo="addTodo"/> -->
        <div v-if="!todos.length">
            찾는 문장이 없습니다..
        </div>
        <TodoList :todos="todos" @delete-todo="deleteTodo" @toggle-todo="toggleTodo" />
        <br>
        <nav class="nav">
            <ul class="pagination">
                <li v-if="currentPage !==1" class="page-item"><a href="#" class="page-link"  @click="getTodos(currentPage-1)">&lt;</a></li>

               <li v-for="page in numberOfPages" :key="page" class="page-item" :class="currentPage===page ? 'active' : ''">
                    <a href="#" @click="getTodos(page)" class="page-link" :class="currentPage===page ? 'active' : ''">{{ page }}</a>
                </li> 

                <li v-if="numberOfPages !== currentPage" class="page-item"><a href="#" class="page-link" @click="getTodos(currentPage+1)">&gt;</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { computed, ref , watch } from 'vue';
// import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default {
    components: {
        // TodoSimpleForm,
        TodoList,
    },
    setup(){
        const router = useRouter()
        const todos = ref([ ]);
        const serchText= ref('');
        const error=ref('');
        const limit=5;
        const numberOfTodos =ref(0);
        const currentPage=ref(1);
        const numberOfPages=computed(() =>{
            return Math.ceil(numberOfTodos.value/limit)
        });

        const getTodos = async (page = currentPage.value) =>{
            currentPage.value=page;
            try{
                const res=await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${serchText.value}&_page=${page}&_limit=${limit}`);
                //console.log(res.headers)
                numberOfTodos.value=res.headers['x-total-count'];
                todos.value=res.data;
            }catch (err){
                console.log(err);
                error.value="찾는 문장이 없습니다"
            }
        };
        getTodos();
        const addTodo = async (todo) => {
            error.value='';
            try{
                await axios.post('http://localhost:3000/todos', {
                    subject:todo.subject,
                    completed:todo.completed, 
                });
                getTodos(1);
                /* todos.value.push(res.data); */
            }catch (err){
                console.log(err);
                error.value="잘못된 입력입니다."
            }
            
        }
        watch(serchText, (/* current, prev */) => {
            //console.log(current, prev)
            getTodos(1);
        })

        /* const addTodo = (todo) => {
           // todos.value.push(todo);
            error.value='';
           axios.post('http://localhost:3000/todos',{
                subject:todo.subject,
                completed:todo.completed,
           }).then((res) =>{
                console.log(res);
                todos.value.push(res.data)
           }).catch((err) =>{
                console.log(err);
                error.value="잘못된 입력입니다."
           });
        } */
       
        const deleteTodo = async (index) => {
            error.value="";
            const id= todos.value[index].id;
            try{
                await axios.delete('http://localhost:3000/todos/'+ id);
               /*  todos.value.splice(index, 1); */
               getTodos(1);
            }catch(err){
                console.log(err);
                error.value="찾는 문장이 없습니다"
            }
           
        }
        const toggleTodo= async (index, checked) =>{
           // console.log(index)
           error.value="";
           const id= todos.value[index].id;

           try{
                await axios.patch('http://localhost:3000/todos/'+ id, {
                    completed: checked
                });
                todos.value[index].completed= checked
           }catch(err){
                console.log(err);
                error.value="찾는 문장이 없습니다"
           }
        }
        const moveToCreatePage = () => {
            router.push({
                name: 'todoCreate'
            })
        }
        /* const filteredTodos = computed(() =>{
            if(serchText.value){
                return todos.value.filter(todo =>{
                    return todo.subject.includes(serchText.value);
                })
            }
            return todos.value;
        }) */

        return {
            todos,
           /*  todoStyle, */
           deleteTodo,
           addTodo,
           toggleTodo,
           serchText,
         /*   filteredTodos, */
           getTodos,
           numberOfPages,
           currentPage,
           router,
           moveToCreatePage
        }
    }
}
</script>


<style>
*{margin: 0; padding: 0; box-sizing: border-box;}
.container{
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
}
h2{
    text-align: center;
    color: #2a4f9e;
    margin: 50px 0;
}
.form-control{
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;
}
.d-flex{
    display: flex;
}
.flex-grow-1{
    flex-grow: 1;
}
.flex-grow-1 input{
    width: 100%;
    padding: 11px 20px;
    border: 1px solid #7e7e7e;
}
.btn{
    padding: 10px 20px;
    border: none;
    background: #2a4f9e;
    color: #fff;
    outline: none;
    font-size: 17px;
}
.card{
    margin: 10px 0;
}
.card-body{
    padding: 10px 20px;
    background: #ecf4ff;
    color: #7e7e7e;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
form{
    margin-bottom: 30px;
}
.form-check-input{
    display: inline-block;
    margin-right: 20px;
    transform: scale(1.9);
}
.todoStyle{
    text-decoration: line-through;
    color: #ccc;
}
.btnR{
    display: inline-block;
    padding: 10px 15px;
    border: none;
    border-radius: 10px;
    background: rgb(202, 202, 202);
    color: #fff;
    font-size: 16px;
}
.pagination{
    list-style: none;
    display: flex;
    justify-content: center;
}
.page-item{
    padding: 10px;
    margin: 0 5px;
    border: 1px solid #999;
}
.page-link{
    text-decoration: none;
    color: #666;
}
.active{
    background: #666;
    color: #fff;
}
.disabled{
    border-color: #e2e2e2;
    color: #e2e2e2;
}
</style>