<template>
    <div class="auth-container">
        <form @submit.prevent="signup">
            <img src="../assets/user-icon.png">
            <div class="signin-container__input-container auth-input">
                <label for="create-email">Email</label>
                <input type="email" v-model="createEmail" placeholder="Enter your email" class="signin-container__input"
                    id="create-email" />
            </div>
            <div class="signin-container__input-container auth-input">
                <label for="create-username">Username</label>
                <input type="text" v-model="createUsername" placeholder="Create a username" class="signin-container__input"
                    id="create-username" />
            </div>
            <div class="signin-container__input-container auth-input">
                <label for="create-password">Password</label>
                <input type="password" v-model="createPassword" placeholder="Create a password"
                    class="signin-container__input" id="create-password" />
            </div>
            <div class="signin-container__input-container auth-input">
                <label for="confirm-password">Password confirmation</label>
                <input type="password" v-model="confirmPassword" placeholder="Confirm your password"
                    class="signin-container__input" id="confirm-password" />
            </div>

            <button type="submit">Register</button>
            <router-link to="/signin">Already have an account? Log in!</router-link>
        </form>
    </div>
</template>

<script>
import { signUp } from '../api/postData'
export default {
    name: 'SigninContainer',
    data() {
        return {
            createEmail: '',
            createUsername: '',
            createPassword: '',
            confirmPassword: '',
            error: ''
        }
    },

    created() {
        this.isSignedIn()
    },
    updated() {
        this.isSignedIn()
    },

    methods: {
        // Triggers sign up request to API
        async signup() {
            try {
                const response = await signUp({ email: this.createEmail, username: this.createUsername, password: this.createPassword, password_confirmation: this.confirmPassword });

                    console.log(response)
                    // this.signinApproved();
                
            } catch (error) {
                // Handle any errors from the signIn function
                console.error('Sign-in error:', error);
                this.signupFailed(error.message);
            }

        },
        // If sign up request is successful, it sends csrf to local storage and allows user to sign in
        signupApproved() {
        //     if (!response.data.csrf) {
        //         this.signupFailed(response);
        //         return;
        //     }

        //     localStorage.csrf = response.data.csrf
            this.error = '';

            this.$router.push('/signin')
        },

        // If sign up fails, remove the csrf and signedIn items and returns an error msg
        signupFailed(error) {
            this.error = (error.response && error.response.data && error.response.data.error) || '';
            delete localStorage.csrf
            delete localStorage.signedIn
        },

        // If the user is already signed in, redirect to home
        isSignedIn() {
            if (localStorage.isSignedIn) {
                this.$router.push("/")
            }
        }
    }
}
</script>

<style lang="scss">
.auth-container form {
    background-color: rgb(55, 55, 55);
    display: flex;
    flex-direction: column;
    width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2% 4% 4% 4%;
    border-radius: 7px;
    gap: 20px;
    box-shadow: 0 0 20px rgba(128, 128, 128, 0.9);

    img {
        width: 170px;
        height: 170px;
        margin: 0 auto;
        filter: invert(1);
    }

    .auth-input {
        display: flex;
        flex-direction: column;
        gap: 9px;

        label {
            font-size: 14px;
        }

        input {
            height: 42px;
            background-color: rgb(36, 36, 36);
            color: white;
            border: none;
            outline: none;
            padding-left: 12px;
            box-shadow: 0px 0px 7px rgb(190, 190, 190, 0.6);
        }
    }

    button {
        background-color: rgb(0, 89, 255);
        font-size: 20px;
        color: white;
        border: none;
        outline: none;
        width: 200px;
        padding: 12px 12px;
        margin-top: 24px;
        transition: .4s;
        position: relative;
        &::after {
            height: 2px;
            background-color: rgb(189, 189, 255);
            width: 0;
            bottom: 0;
            right: 0;
            position: absolute;
            content: '';
            transition: .4s;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.75);
        }
        &::before {
            height: 1.5px;
            background-color: rgb(189, 189, 255);
            width: 0;
            top: 0;
            left: 0;
            position: absolute;
            content: '';
            transition: .4s;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.75);
        }
        &:hover {
            background-color: rgb(25, 81, 186);
            transition: .4s;
            cursor: pointer;
        }

        &:hover::before {
            width: 100%;
            transition: .4s;
        }
        &:hover::after{
            width: 100%;
            transition: .4s;
        }
    }

    a {
        text-decoration: none;
        color: rgb(27, 107, 255);
        &:hover {
            text-decoration: underline;
        }
    }
}</style>