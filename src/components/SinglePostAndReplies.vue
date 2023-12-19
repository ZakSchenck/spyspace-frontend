<template>
    <div>
        <div v-if="postData" class="post-container__wrapper">
            <div class="posts-card__post-container">
                <h1>{{ postData.username }}</h1>
                <div class="posts-card__col-container">
                    <div class="posts-card__post-title">
                        <router-link :to="`/users/${postData.user.username}/posts`">@{{ postData.user.username
                        }}</router-link>
                        <div></div>
                        <p id="date">{{ formatDate(postData.created_at) }}</p>
                    </div>
                    <p id="body">{{ postData.body }}</p>
                    <h4>{{ postData.replies.length }} {{ postData.replies.length === 1 ? 'Reply' : 'Replies' }}:</h4>
                </div>
            </div>
            <PostInput />
            <div v-for="item in postData.replies" :key="item.username">
                <div class="posts-card__post-container">
                    <div class="posts-card__col-container">
                        <div class="posts-card__post-title">
                            <div></div>
                            <p id="date">{{ formatDate(item.created_at) }}</p>
                        </div>
                        <p id="body">{{ item.body }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSinglePost } from '../api/postData';
import PostInput from './PostInput.vue';
export default {
    name: 'SinglePostAndReplies',
    components: {
        PostInput
    },
    data() {
        return {
            postData: null,
            postId: this.$route.params.postId
        }
    },

    // Fetches single post data and the post's replies
    async created() {
        try {
            this.postData = await getSinglePost(this.postId);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    },

    watch: {
        // Reactively adds new post without refresh
        async postData() {
            try {
                this.postData = await getSinglePost(this.postId);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        }
    },

    methods: {
        // Formats created_at api date to mm/dd/yyyy
        formatDate(dateString) {
            const date = new Date(dateString);
            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString()}`;
            return formattedDate;
        },

    }
}
</script>