<template>
    <div>
        <div v-if="!isLoading" class="header-card__wrapper">
            <div v-for="item in githubApiData" :key="item.name" class="header-card__card-container">
                <div class="header-card__link-container">
                    <img src="../assets/web-development.png" />
                    <a :href="`https://github.com/zakschenck/${item.name}`" target="_blank">{{ item.name }}</a>
                </div>
                <div class="header-card__link-container">
                    <p style="font-weight: bold;">Language: <span :style="`color: ${languageColors[item.language]}; font-weight: 400;`">{{ item.language }}</span></p>
                </div>
            </div>
        </div>
        <h2 v-else>Loading...</h2>
    </div>
</template>
    
<script>
import { getPinnedRepos } from '../api/githubApi';
export default {
    name: 'ReposHeaderCard',
    data() {
        return {
            githubApiData: null,
            isLoading: true,
            languageColors: {
                JavaScript: '#F1E05A',
                SCSS: '#C6538C',
                TypeScript: '#388BFD',
                Vue: '#39D353'
            }
        }
    },

    async beforeMount() {
        // Handles loading asynchronously
        try {
            this.githubApiData = await getPinnedRepos();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false; 
            console.error('Error fetching data:', error);
        }
        this.githubApiData = await getPinnedRepos(this.isLoading);
    },

    created() {
        console.log(this.githubApiData)
    }
}
</script>
    
<style scoped lang="scss">
.header-card__wrapper {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.header-card__card-container {
    width: 65%;
    height: 90px;
    border: 2px solid #2F3336;
    border-radius: 6px;
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .header-card__link-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;

        a {
            font-size: 14px;
            color: rgb(46, 126, 255);
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        p {
            color: rgb(153, 153, 153);
            font-size: 14px;
        }
    }

    img {
        filter: invert(.5);
        width: 20px;
        height: 20px;
    }
}

@media all and (max-width: 1260px) {
    .header-card__card-container {
        width: 96%;
    }
}

@media all and (max-width: 970px) {
    .header-card__card-container {
        display: none;
    }
}

</style>