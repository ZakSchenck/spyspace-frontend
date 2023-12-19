import { createStore } from 'vuex';

// Create a new Vuex store instance
const store = createStore({
  state: {
    // State for showing the post input
    showPostInput: false,
    posts: [],
  },
  mutations: {
    // When post is clicked, it toggles showing the post input
    setShowPostInput(state) {
        state.showPostInput = true;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    ADD_POST(state, post) {
      state.posts.unshift(post); // Adds the new post at the beginning of the array
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      // Fetch posts from the API and commit them to the store
      const response = await fetch('https://aqueous-castle-11914-39a6909963bb.herokuapp.com/api/v1/posts');
      const posts = await response.json();
      commit('SET_POSTS', posts);
    },
    addPost({ commit }, post) {
      // Call this action after adding a new post
      commit('ADD_POST', post);
    }
  },
  getters: {
   getShowPostInput: (state) => state.showPostInput,
   allPosts: (state) => state.posts
  },
});

export default store;