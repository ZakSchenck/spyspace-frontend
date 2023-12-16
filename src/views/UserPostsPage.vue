<template>
    <div class="user-posts-page__wrapper">
        <MainHeader />
        <div ref="myTextElement" class="user-posts-page__container">
            <h2>@{{ this.$route.params.username }}'s posts</h2>
            <PostsCard :data="postData" />
        </div>
        <ReposHeader />
    </div>
</template>
  
<script>
import { getUserPosts } from '../api/postData';
import PostsCard from '../components/PostsCard.vue';
import MainHeader from '../components/MainHeader.vue';
import ReposHeader from '../components/ReposHeader.vue';
export default {
    name: 'UserPostsPage',
    components: {
        MainHeader,
        PostsCard,
        ReposHeader
    },
    data() {
        return {
            postData: null,
            currentLink: this.$route.params.username
        }
    },

    created() {
        this.postData = getUserPosts(this.$route.params.username)
    },
    updated() {
        window.location.reload();

    },
}
</script>
  
<style scoped lang="scss">
div {
    display: flex;
    flex-direction: row;
}

.user-posts-page__container {
    display: flex;
    flex-direction: column;

    h2 {
        padding: 16px;
    }
}

@media all and (max-width: 820px) {
    div {
        display: block;
    }
}
</style>
  