<template>
    <div class="post-replies-page__container">
        <MainHeader />
        <SinglePostAndReplies />
        <ReposHeader />
    </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import ReposHeader from '../components/ReposHeader.vue';
import SinglePostAndReplies from '@/components/SinglePostAndReplies.vue';
export default {
    name: 'UserPostsPage',
    components: {
        MainHeader,
        ReposHeader,
        SinglePostAndReplies
    },
}
</script>

<style lang="scss" scoped>
.post-replies-page__container {
    display: flex;
    flex-direction: row;
}

h4 {
    margin-top: 12px;
}

@media all and (max-width: 820px) {
    .post-replies-page__container {
        display: block;
    }
}
</style>