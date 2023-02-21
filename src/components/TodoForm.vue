<template>
    <div class="container">
        <div v-if="loading">
            Loading...
        </div>
        <form v-else @submit.prevent="onSave">
            <div class="row1">
                <div>
                    <div class="form-group">
                        <label>Todo Subject</label>
                        <input type="text" class="form-control" v-model="todo.subject">
                        <span>{{ subjectError }}</span>
                    </div>
                </div>
                <div v-if="editing">
                    <div class="form-group">
                        <label class="mb">Status</label>
                        <div>
                            <button @click="toggleTodoStatus" type="button" class="btn" :class="todo.completed ? 'btnGG':'btnRR'">{{todo.completed ? '완료':'미완료'}}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bodyWrap">
                <div class="form-groupB">
                    <label>Body</label>
                    <textarea v-model="todo.body" cols="30" rows="10"></textarea>
                </div>
            </div>
            <button class="btnD btn" type="submit"  :disabled="!todoUpdated">{{ editing ? '저장' : '만들기' }}</button>
            <button class="btn btnN" @click="moveToTodoListPage">취소</button>
        </form>
    </div>
</template>

<script>
    import {useRoute, useRouter} from 'vue-router';
    import axios from 'axios';
    import { ref, computed} from 'vue';
    import _ from 'lodash';
    export default {
        props:{
            editing: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            const route=useRoute();
            const router=useRouter();
            const todo=ref({
                subject: '',
                completed: false,
                body: ''
            });
            const loading= ref(true);
            const originalTodo=ref(null);
            const todoId=route.params.id
            const subjectError = ref('')

            //console.log(route.params.id)
            const getTodo = async () =>{
                const res = await axios.get(`http://localhost:3000/todos/${todoId} ` );
                todo.value=res.data;
                loading.value=false;
                originalTodo.value = {...res.data}
            }
           

            const toggleTodoStatus = () =>{
                todo.value.completed = !todo.value.completed;
            }
            const moveToTodoListPage =() =>{
                router.push({
                    name:'Todos'
                })
            }
            if(props.editing){
                getTodo();
            }
            

            const onSave = async () => {
                subjectError.value=''
                if(!todo.value.subject){
                    subjectError.value = '내용을 작성해 주세요'
                    // console.log(subjectError.value)
                    return
                }
                try{
                    let res;
                    const data = {
                        subject:todo.value.subject,
                        completed:todo.value.completed,
                        body: todo.value.body
                    }
                    if(props.editing){
                        res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
                    }else{
                        res = await axios.post(`http://localhost:3000/todos`, data);
                        todo.value.subject = '',
                        todo.value.body = ''
                    }
                    originalTodo.value = {...res.data}
                }catch(e){
                    console.log(e)
                }
               
            }
            const todoUpdated = computed(() => {
                return !_.isEqual(todo.value, originalTodo.value)
            }) 
            return {
                todo,
                toggleTodoStatus,
                moveToTodoListPage,
                onSave,
                todoUpdated,
                subjectError
            }
        }
    }
</script>
<style>
    h1{
        margin-bottom: 20px;
    }
    .form-control{
        margin-top: 10px;
    }
    label{
        font-weight: bold;
    }
    .row1{
        display: flex;
        justify-content: space-between;
    }
    .row1>div{
        flex-basis: 49%;
    }
    .btnD{
        margin-right: 5px;
        background: rgb(47, 177, 47);
    }
    .btnD:disabled{
        background: #ddd;
    }
    .btnN{
        background: rgb(202, 18, 18);
    }
    .mb{
        margin-bottom: 6px;
        display: block;
    }
    .form-groupB{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        
    }
    .form-groupB label{
        margin-bottom: 10px;
        display: block;
    }
</style>