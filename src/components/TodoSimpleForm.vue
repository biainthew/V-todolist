<template>
    <form v-on:submit.prevent="onSubmit">
        <div class="d-flex">
            <div class="flex-grow-1">
                <input type="text" placeholder="오늘 할 일을 작성해 주세요" v-model="todo">
            </div>
            <div class="b-btn">
                <button class="btn" type="submit">Add</button>
            </div>
        </div >
        <div v-show="hasError" style="color: red;">
            할 일을 적어주세요
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
    export default {
        emits: ['add-todo'],
        setup(props, context){
            const todo = ref('');
            const hasError = ref(false)
            const onSubmit = () => {
                if(todo.value === ''){
                    hasError.value = true
                }else{
                    context.emit('add-todo', {
                        id: Date.now(),
                        subject: todo.value,
                        completed:false,
                    })
                    hasError.value = false
                }
                todo.value = ''
            }
            return{
                todo, hasError, onSubmit
            }
        }
    }
</script>

<style>

</style>