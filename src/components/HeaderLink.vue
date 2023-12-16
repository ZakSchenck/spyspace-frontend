<template>
    <router-link class="header-link" v-if="!isOuterLink && !isSignOutLink" :to="routeLink">
        <div class="main-header__icon-text-container">
            <img :src="imgLink" :alt="linkText" class="header-icon" />
            <p class="header-text">{{ linkText }}</p>
        </div>
    </router-link>
    <a v-else-if="isSignOutLink" @click="signOut" class="header-link">
        <div class="main-header__icon-text-container">
            <img :src="imgLink" :alt="linkText" class="header-icon" />
            <p class="header-text">{{ linkText }}</p>
        </div>
    </a>
    <a v-else href="https://github.com/zakschenck" target="_blank" class="header-link">
        <div class="main-header__icon-text-container">
            <img :src="imgLink" :alt="linkText" class="header-icon" />
            <p class="header-text">{{ linkText }}</p>
        </div>
    </a>
</template>

<script>
export default {
    name: 'HeaderLink',
    props: {
        // Src link for each header icon
        imgLink: {
            type: String,
            default: ''
        },
        // Text for the link
        linkText: {
            type: String,
            default: ''
        },
        // Link to navigate to a certain route
        routeLink: {
            type: String,
            default: ''
        },
        // Checks if your signed in. if not, disable links needed to sign in
        isSignedIn: {
            type: Boolean,
            default: false
        },
        // If the header link is a link to an outer website, display its template differently
        isOuterLink: {
            type: Boolean,
            default: false
        },
        // Adds click event if link is the sign out button
        isSignOutLink: {
            type: Boolean,
            default: false
        },
        // Adds toggle click event if link is "Post"
        isPostLink: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
        if (this.isPostLink) console.log(true)
    },

    methods: {

        // Signs user out and removes the stored data
        signOut() {
            this.$router.push('/');
            window.location.reload();
            localStorage.removeItem('csrf');
            localStorage.removeItem('username');
            localStorage.removeItem('picture');
            localStorage.removeItem('signedIn');
        },
    }
}
</script>

<style lang="scss">
.main-header__icon-text-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-items: center;
    gap: 24px;
}

.header-link {
    box-sizing: content-box;
    position: relative;
    padding: 6px;
    text-decoration: none;
    max-width: 150px;

    &::after {
        height: 2px;
        background-color: rgb(189, 189, 255);
        width: 0;
        bottom: -6px;
        right: 0;
        position: absolute;
        content: '';
        transition: .4s;
        box-shadow: 0 0 5px rgba(255, 255, 255, 1);
    }

    &::before {
        height: 1.5px;
        background-color: rgb(189, 189, 255);
        width: 0;
        top: -6px;
        left: 0;
        position: absolute;
        content: '';
        transition: .4s;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.75);
    }

    &:hover {
        transition: .4s;
        cursor: pointer;
        background-color: rgb(27, 27, 27);
    }

    &:hover::before {
        width: 100%;
        transition: .4s;
    }

    &:hover::after {
        width: 100%;
        transition: .4s;
    }
}

.header-icon {
    width: auto;
    height: 28px;
    filter: invert(1)
}

.header-text {
    font-weight: bold;
    font-size: 18px;
    color: white;
}

@media all and (max-width: 1260px) {
    .header-text {
        display: none;
    }
}
</style>