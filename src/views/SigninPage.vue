<template>
    <div>
        <SigninContainer />
    </div>
</template>

<script>
import SigninContainer from '../components/SigninContainer.vue';
export default {
    name: 'SigninPage',
    components: {
        SigninContainer
    },

    beforeMount() {
        // If user is signed in, redirect to home page if on register or sign in page
        if (localStorage.getItem('username')) {
            // this.$router.push('/');
        }
    }
}
</script>

<style lang="scss"></style>