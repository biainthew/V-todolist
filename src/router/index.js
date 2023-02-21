import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue'
import todoCreate from '../pages/todos/create/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        },
        {
            path: '/todos/create',
            name: 'todoCreate',
            component: todoCreate
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo
        }

    ]
})

export default router
