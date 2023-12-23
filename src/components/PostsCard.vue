<template>
    <div>
        <div v-if="!isLoading" class="posts-container__wrapper">
            <div v-for="item in reversedPosts" :key="item.username" class="posts-container__card-container">
                <div class="posts-card__post-container">
                    <img :src="require(`@/assets/pfp-funny.jpeg`)" />
                    <div class="posts-card__col-container">
                        <div class="posts-card__post-title">
                            <router-link :to="`/users/${item.user.username}/posts`">@{{ item.user.username }}</router-link>
                            <p id="date">{{ formatDate(item.created_at) }}</p>
                        </div>
                        <p id="body">{{ item.body }}</p>
                        <div class="posts-card__post-title" @click="viewRepliesPage(item.id)">
                            <img id="reply-btn" src="../assets/feedback.png" alt="reply button" />
                            <p id="replies-num">{{ item.replies.length }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2 v-else>Loading...</h2>
    </div>
</template>
    
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PostsCard',
    data() {
        return {
            // Checks if api data is loading
            isLoading: true,
            // Numbers of data to be shown with infinite scroll
            numberOfData: 10
        }
    },

    // GET data for all posts
    async created() {
        this.isLoading = true;
        try {
            await this.$store.dispatch('fetchPosts');
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            this.isLoading = false;
        }
    },

    watch: {
        // Reactively adds new post without refresh
        async allPosts(newVal, oldVal) {
            // Call API when the watched store item changes
            // Only fetch new posts if a specific condition is met
            if (this.newPostsFetched(newVal, oldVal)) {
                try {
                    await this.$store.dispatch('fetchPosts');
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
    },

    // Add scroll function for infinite scroll
    mounted() {
        window.addEventListener('scroll', this.handleInfiniteScroll);
    },

    // Removing scroll function when unmounted to prevent memory leaks
    unmounted() {
        window.removeEventListener('scroll', this.handleInfiniteScroll);
    },
    computed: {
        ...mapGetters(['allPosts']),
        // Reverses the order of postData and gets the first 10 elements initially
        reversedPosts() {
            return [...this.allPosts].reverse().slice(0, this.numberOfData);
        },
    },
    methods: {
        // Checks if new post has been added to database
        newPostsFetched(newVal, oldVal) {
            return newVal.length !== oldVal.length;
        },
        // Formats created_at api date to mm/dd/yyyy
        formatDate(dateString) {
            const date = new Date(dateString);
            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString()}`;
            return formattedDate;
        },

        // Handling scroll logic for infinite scroll
        handleInfiniteScroll() {
            // Gets Y scroll off set height
            const maxScrollY = document.body.scrollHeight - window.innerHeight;

            // When i reach a certain point at the bottom of the page, load 10 more posts
            if (maxScrollY - window.scrollY < 165) this.numberOfData += 10
        },

        // View all replies for a single post
        viewRepliesPage(postId) {
            this.$router.push(`/posts/${postId}/replies`)
        },
    }
}
</script>
<style lang="scss">
.posts-card__post-container {
    width: 600px;
    margin: 0 auto;
    padding: 20px 20px 6px 20px;
    border-top: 1px solid #2F3336;
    display: flex;
    flex-direction: row;
    gap: 12px;

    .posts-card__post-container {
        display: flex;
        flex-direction: column;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    a {
        color: rgb(130, 130, 130);
        font-size: 12px;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    #body {
        font-size: 14px;
        margin-top: 8px;
    }

    .posts-card__post-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;

        div {
            width: 4px;
            height: 4px;
            background-color: rgb(130, 130, 130);
            border-radius: 50%;
        }

        p {
            color: rgb(130, 130, 130);
            font-size: 12px;
        }
    }

    #reply-btn {
        width: 20px;
        height: 20px;
        filter: invert(1);
        margin-top: 16px;

        &:hover {
            cursor: pointer;
        }
    }

    #replies-num {
        margin-top: 16px;
    }
}

@media all and (max-width: 820px) {
    .posts-card__post-container {
        width: 100%;
    }
}
</style>
