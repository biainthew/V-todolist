<template>
    <nav>
        <!-- <router-link to="{name:'Home'}">Home</router-link>
        <router-link to="{name: 'Todos'}">Todos</router-link> -->
        <router-link to="/">Home</router-link>
        <router-link to="/todos">Todos</router-link>
    </nav>
    <router-view/>
</template>

<script>
    export default {

    }
</script>


<style>
    nav {
    padding: 30px;
    text-align: center;
    margin: 0 auto;
    }

    nav a {
    font-weight: bold;
    color: #2c3e50;
    padding:  0 10px;
    }

    nav a.router-link-exact-active {
    color: #42b983;
    }
</style>