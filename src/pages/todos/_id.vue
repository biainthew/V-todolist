<template>
    <div class="container">
        <h1>Todo Page</h1>
        <TodoForm :editing="true"/>
    </div>
</template>

<script>
    import TodoForm from '@/components/TodoForm.vue'; //@ 를 쓰면 src 기준으로 가져옴
    export default {
        components: {
            TodoForm
        }
    }
</script>
<style>
    
</style>