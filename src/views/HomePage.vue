<template>
    <div>
        <MainHeader />
        <PostsContainer />
        <ReposHeader />
    </div>
</template>

<script>
import PostsContainer from '@/components/PostsContainer.vue';
import MainHeader from '../components/MainHeader.vue';
import ReposHeader from '../components/ReposHeader.vue';
export default {
    name: 'HomePage',
    components: {
    MainHeader,
    ReposHeader,
    PostsContainer
}
}
</script>
<style scoped lang="scss">
div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>