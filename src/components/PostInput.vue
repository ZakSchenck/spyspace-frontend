<template>
    <section v-if="isHomePage ? getShowPostInput : true">
        <div>
            <img alt="profile photo" src="../assets/pfp-funny.jpeg" />
            <input type="text" maxlength="280" v-model="inputText" placeholder="Enter your thoughts..." />
        </div>
        <button @click="post" type="button" :class="postButtonClass">Post</button>
    </section>
</template>
    
<script>
import { postData } from '../api/postData';
import { postReplyData } from '../api/postData';
import { mapGetters } from 'vuex';
export default {
    name: 'PostInput',
    data() {
        return {
            inputText: '',
            disabledBtn: true,
        }
    },

    computed: {
        ...mapGetters(['getShowPostInput']),
        // If the input is empty, add disabled class, else, add not-disabled
        postButtonClass() {
            return this.inputText.length > 0 ? 'not-disabled' : 'disabled';
        },

        // Checks if user is signed in
        userIsSignedIn() {
            return localStorage.getItem('isSignedIn')
        },

        // Returns true if on the home page
        isHomePage() {
            return this.$route.path === '/spyspace-frontend/'
        }
    },
    methods: {
        // Adds new post
        async post() {
        if (this.inputText.length > 0) {
            let response;
            if (window.location.pathname === '/' || window.location.pathname === '/spyspace-frontend/') {
                response = await postData({ body: this.inputText });
                if (response && response.success) {
                    // Dispatch to add new post
                    this.$store.dispatch('addPost', response.post);
                    // Clear input field
                    this.inputText = ''; 
                }
            } else {
                response = await postReplyData({ body: this.inputText }, this.$route.params.postId);
            }
        }
    },
    }
}
</script>
<style lang="scss" scoped>
section {
    height: 130px;
    width: 100%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    button {
        border: none;
        outline: none;
        font-size: 16px;
        color: white;
        font-weight: bold;
        padding: 8px 16px;
        width: min-content;
        border-radius: 50px;
        margin-left: auto;

        &.not-disabled {
            background-color: rgb(61, 139, 255);

            &:hover {
                cursor: pointer;
            }
        }

        &.disabled {
            background-color: rgb(107, 107, 107);
            pointer-events: none;

            &:hover {
                cursor: not-allowed;
            }
        }
    }

    div {
        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: center;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    input {
        border-bottom: 1px solid rgb(61, 61, 61);
        background-color: transparent;
        width: 100%;
        border-left: none;
        border-right: none;
        border-top: none;
        height: 60px;
        font-size: 22px;
        color: white;

        &:focus {
            outline: none;

        }
    }
}
</style>
