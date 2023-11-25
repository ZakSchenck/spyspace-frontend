<template>
    <div>
        <div v-if="!isLoading" class="posts-container__wrapper">
            <div v-for="item in reversedPosts" :key="item.username" class="posts-container__card-container">
                <div class="posts-card__post-container">
                    <img :src="require(`@/assets/${item.user.profile_picture}`)" />
                    <div class="posts-card__col-container">
                        <div class="posts-card__post-title">
                            <router-link to="/">@{{ item.user.username }}</router-link>
                            <div></div>
                            <p id="date">{{ formatDate(item.created_at) }}</p>
                        </div>
                        <p id="body">{{ item.body }}</p>
                        <div class="posts-card__post-title">
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
import { getPostData } from '../api/postData';
export default {
    name: 'PostsCard',
    data() {
        return {
            isLoading: true,
            postData: null,
        }
    },
    async beforeMount() {
        try {
            this.postData = await getPostData();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error('Error fetching data:', error);
        }
    },
    computed: {
        // Reverses the order of postData
        reversedPosts() {
            console.log(this.postData)

            return this.postData ? this.postData.slice().reverse() : null;
        },
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
<style lang="scss" scoped>
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
    }

    #replies-num {
        margin-top: 16px;
    }
}
</style>
