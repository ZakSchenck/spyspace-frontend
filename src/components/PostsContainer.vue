<template>
    <section>
        <MobileHeader />
        <PostInput />
        <PostsCard :data="postData" />
    </section>
</template>
    
<script>
import { getPostData } from '../api/postData';
import MobileHeader from './MobileHeader.vue';
import PostsCard from './PostsCard.vue';
import PostInput from './PostInput.vue'

export default {
    name: 'PostsContainer',
    data() {
        return {
            postData: null
        }
    },
    components: {
        PostsCard,
        PostInput,
        MobileHeader
    },
    created() {
        this.postData = getPostData()
    }
}
</script>
<style lang="scss" scoped>
</style>
