<template>
    <section>
        <PostInput />
        <PostsCard />
    </section>
</template>
    
<script>
import PostsCard from './PostsCard.vue';
import PostInput from './PostInput.vue'

export default {
    name: 'PostsContainer',
    components: {
        PostsCard,
        PostInput
    }
}
</script>
<style lang="scss" scoped>
</style>
