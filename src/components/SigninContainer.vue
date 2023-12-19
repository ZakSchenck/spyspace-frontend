<template>
    <div class="auth-container">
        <form @submit.prevent="signin">
            <h2 style="margin: 0 auto;">Welcome back!</h2>
            <img src="../assets/user-icon.png" alt="user logo icon">
            <div class="signin-container__input-container auth-input">
                <label for="email">Email address:</label>
                <input type="email" v-model="email" class="signin-container__input" placeholder="Enter your email" />
            </div>
            <div class="signin-container__input-container auth-input">
                <label for="password">Password:</label>
                <input type="password" v-model="password" class="signin-container__input"
                    placeholder="Enter your password" />
            </div>


            <button type="submit">Sign in</button>
            <router-link to="/signup">Don't have an account? Register!</router-link>
        </form>
    </div>
</template>

<script>
import { signIn } from '../api/postData'
export default {
    name: 'SigninContainer',
    data() {
        return {
            email: '',
            password: '',
            error: '',
            response: null,
        }
    },

    // When component is created, check if the user is signed in
    created() {
        this.isSignedIn()
    },
    // When component is updated, check if the user is signed in
    updated() {
        this.isSignedIn()
    },

    methods: {
        // Triggers sign in request to API
        async signin() {
            try {
                const response = await signIn({ email: this.email, password: this.password });

                console.log(response);

                // If everything is successfully stored, proceed to redirect
                this.signinApproved(response);

            } catch (error) {
                // Handle any errors from the signIn function
                console.error('Sign-in error:', error);
                this.signinFailed(error.message);
            }
        },

        // If the sign in is successful, redirect to log in and set signed in to true
        signinApproved(response) {
            if (!response.token.access) {
                this.signinFailed(response);
                return;
            }

            localStorage.setItem('csrf', response.csrf);
            localStorage.setItem('username', response.username);
            localStorage.setItem('picture', response.picture);
            localStorage.setItem('accessToken', response.token.access);
            localStorage.setItem('signedIn', true);
            console.log(localStorage.getItem('accessToken'))
            this.error = '';
            this.$router.push('/');
        },

        signinFailed(error) {
            this.error = (error.response && error.response.data && error.response.data.error) || '';
            delete localStorage.csrf
            delete localStorage.usernamed
            delete localStorage.picture
            delete localStorage.token.access
            delete localStorage.signedIn
        },

        isSignedIn() {
            if (localStorage.isSignedIn) {
                this.$router.push("/")
            }
        }
    }
}
</script>
// Most form/input styling for this component is done in "SignupContainer.vue"