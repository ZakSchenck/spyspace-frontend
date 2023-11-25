<template>
    <div>
        <img src="../assets/pfp-funny.jpeg" class="user-profile__profile-pic" alt="user's profile picture">
        <p>@{{ storedUsername }}</p>
    </div>
</template>

<script>
export default {
    name: 'UserProfile',
    data() {
        return {
            storedUsername: '',
        }
    },
    // Retrieve the username from localStorage when the component is created
    created() {
        this.storedUsername = localStorage.getItem('username') || '';
    }
}
</script>

<style scoped lang="scss">
div {
    height: 65px;
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding-left: 16px;
    position: fixed;
    width: 250px;
    bottom: 12px;
    left: 16px;
    &:hover {
        background-color: rgb(27, 27, 27);
        border-radius: 50px;
        cursor: pointer;
    }

    &:hover::after {
        content: 'Click to change profile picture!';
        font-size: 12px;
        color: gray;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    p {
        font-weight: bold;
    }
}
</style>