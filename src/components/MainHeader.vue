<template>
    <header>
        <div class="main-header__full-wrapper">
            <div class="main-header__links-wrapper">
                <img src="../assets/logo.png" id="main-header__logo">
                <HeaderLink :imgLink="require('@/assets/home.png')" :linkText="'Home'" routeLink="/" />
                <!-- The reason this isn't set as a HeaderLink component is boolean reactivity issues. -->
                <a v-if="isSignedIn" class="header-link" @click="showPostInput">
                    <div class="main-header__icon-text-container">
                        <img src="../assets/more.png" alt="Post link" class="header-icon" />
                        <p class="header-text">Post</p>
                    </div>
                </a>
                <HeaderLink v-if="isSignedIn" :imgLink="require('@/assets/user.png')" :linkText="'Profile'" :routeLink="`/users/${username}/posts`"  />
                <HeaderLink :imgLink="require('@/assets/github.png')" :linkText="'Github'" :isOuterLink="true" />
                <HeaderLink v-if="!isSignedIn" :imgLink="require('@/assets/log-in.png')" :linkText="'Sign in'"
                    routeLink="/signin" />
                <HeaderLink v-if="!isSignedIn" :imgLink="require('@/assets/add-user.png')" :linkText="'Sign up'"
                    routeLink="/signup" />
                <HeaderLink v-if="isSignedIn" :imgLink="require('@/assets/logout.png')" :linkText="'Sign out'"
                    :isSignOutLink="true" />
            </div>
        </div>
    </header>
</template>

<script>
import HeaderLink from "./HeaderLink.vue";
import { mapMutations, mapGetters } from 'vuex';
export default {
    name: 'MainHeader',
    components: {
        HeaderLink,
    },
    data() {
        return {
            // Get username of current user
            username: localStorage.getItem('username'),
        }
    },
    computed: {
        ...mapGetters(['getShowPostInput']),
        // Check the existence of localStorage.signedIn
        isSignedIn() {
            return localStorage.signedIn !== undefined;
        },
    },
    methods: {
        // Get setters from store
        ...mapMutations(['setShowPostInput']),
        // Shows post input and re routes to home page
        showPostInput() {
            this.setShowPostInput();
            this.$router.push('/');
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // For smooth scrolling behavior
            });
        }
    }
}
</script>

<style scoped lang="scss">
header {
    width: 425px;
    border-right: 1px solid #2F3336;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;

    .main-header__links-wrapper {
        margin-left: 34%;
        display: flex;
        flex-direction: column;
        gap: 22px;
    }
}

#main-header__logo {
    height: 28px;
    width: 48px;
    margin-top: 16px;
}

.main-header__full-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

@media all and (max-width: 820px) {
    header {
        width: 80px;
    }
}

@media all and (max-width: 820px) {
    header {
        width: 100%;
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        background-color: black;
        flex-direction: row;
        height: 70px;
        z-index: 2;
        justify-content: center;
        align-items: center;
        border-top: 1px solid rgb(67, 67, 67);
    }
    .main-header__links-wrapper {
        margin-left: 0 !important;
        display: flex;
        flex-direction: row !important;
        align-items: center;
        gap: 22px;
        background-color: black;
    } 
    .main-header__full-wrapper {
        flex-direction: row;
    }
    #main-header__logo {
        display: none;
    }
}
</style>