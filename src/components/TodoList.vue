<template>
    <div class="card" v-for="(todo, index) in todos" :key="todo.id">
        <div class="card-body" @click="moveToPage(todo.id)">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" :checked="todo.completed" @change="toggleTodo(index, $event)" @click.stop>
                <!-- <label class="form-check-label" :style="todo.completed ? todoStyle : {}"> -->
                <label class="form-check-label" :class="{todoStyle:todo.completed}">
                    {{ todo.subject }}
                </label>
            </div>
            <div>
                <button class="btnR" v-on:click.stop="deleteTodo(index)">Del</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRouter } from 'vue-router'
    export default {
        emits: ['deleteTodo','toggle-Todo'],
        props: {
            'todos':{
                type: Array,
                required: true
            }
        },
        setup(props, context){
            const router = useRouter()
            const toggleTodo = (index, event) => {
                context.emit('toggle-todo', index, event.target.checked)
            }
            const deleteTodo = (index) => {
                context.emit('deleteTodo', index)
            }
            const moveToPage = (todoId) => {
                // console.log(todoId)
                //router.push('/todos/' + todoId)
                router.push({
                    name: 'Todo',
                    params: {
                        id: todoId
                    }
                })
            }
            return {
                deleteTodo, toggleTodo, moveToPage
            }
        }
    }
</script>
<style>
</style>