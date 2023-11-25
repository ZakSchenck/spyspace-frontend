<template>
    <header>
        <div class="main-header__full-wrapper">
            <div class="main-header__links-wrapper">
                <img src="../assets/logo.png" id="main-header__logo">
                <HeaderLink :imgLink="require('@/assets/home.png')" :linkText="'Home'" routeLink="/" />
                <HeaderLink v-if="isSignedIn" :imgLink="require('@/assets/more.png')" :linkText="'Post'" routeLink="/" />
                <HeaderLink v-if="isSignedIn" :imgLink="require('@/assets/user.png')" :linkText="'Profile'" routeLink="" />
                <HeaderLink :imgLink="require('@/assets/github.png')" :linkText="'Github'" :isOuterLink="true" />
                <HeaderLink v-if="!isSignedIn" :imgLink="require('@/assets/log-in.png')" :linkText="'Sign in'"
                    routeLink="/signin" />
                <HeaderLink v-if="!isSignedIn" :imgLink="require('@/assets/add-user.png')" :linkText="'Sign up'"
                    routeLink="/signup" />
                <HeaderLink v-if="isSignedIn" :imgLink="require('@/assets/logout.png')" :linkText="'Sign out'"
                    :isSignOutLink="true" />
            </div>
            <UserProfile v-if="isSignedIn" />
        </div>
    </header>
</template>

<script>
import HeaderLink from "./HeaderLink.vue"
import UserProfile from "./UserProfile.vue"
export default {
    name: 'MainHeader',
    components: {
        HeaderLink,
        UserProfile
    },
    computed: {
        // Check the existence of localStorage.signedIn
        isSignedIn() {
            return localStorage.signedIn !== undefined;
        },
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
</style>