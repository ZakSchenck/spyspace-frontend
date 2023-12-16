<template>
    <section>
        <router-link to="/" >
            <h5>For you</h5>
        </router-link>
    </section>
</template>
    
<script>
export default {
    name: 'MobileHeader',
    computed: {
        isSignedIn() {
            return localStorage.getItem('username') !== null;
        }
    }
}
</script>
    
<style scoped lang="scss">
section {
    width: 100%;
    display: none;
    flex-direction: row;
    height: 60px;
    justify-content: space-around;
    background-color: black;
    z-index: 2;
    align-items: center;
    border-bottom: 1px solid rgb(63, 63, 63);
}

a {
    text-decoration: none;
    color: white;
    position: relative;
    &::before {
        content: '';
        bottom: -8px;
        left: 0;
        width: 100%;
        background-color: rgb(34, 123, 255);
        height: 4px;
        position: absolute;
    }
}

@media all and (max-width: 820px) {
    section {
        display: flex;
    }
}
</style>