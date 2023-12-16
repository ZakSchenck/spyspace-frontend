<template>
<section>
    <ReposHeaderCard />
</section>
</template>

<script>
import ReposHeaderCard from "./ReposHeaderCard.vue"
export default {
    name: 'ReposHeader',
    components: {
        ReposHeaderCard
    }
}
</script>

<style scoped lang="scss">
section {
    top: 0;
    position: sticky;
    width: 513px;
    border-left: 1px solid #2F3336;
    display: flex;
    flex-direction: column;
    padding: 12px;
    height: 100vh;
    box-sizing: content-box;
}

@media all and (max-width: 820px) {
    section {
        display: none;
    }
}
</style>