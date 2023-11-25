<template>
    <div>
        <SignupContainer />
    </div>
    </template>
    
    <script>
    import SignupContainer from '../components/SignupContainer.vue';
    export default {
        name: 'SignupPage',
        components: {
            SignupContainer
        },

        beforeMount() {
            // If user is signed in, redirect to home page if on register or sign in page
            if (localStorage.getItem('csrf')) {
                // this.$router.push('/');
            }
        }
    }
    </script>
    
    <style lang="scss">
    
    </style>