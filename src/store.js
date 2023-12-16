import { createStore } from 'vuex';

// Create a new Vuex store instance
const store = createStore({
  state: {
    // State for showing the post input
    showPostInput: false,
  },
  mutations: {
    // When post is clicked, it toggles showing the post input
    setShowPostInput(state) {
        state.showPostInput = true;
    }
  },
  actions: {
  },
  getters: {
   getShowPostInput: (state) => state.showPostInput,
  },
});

export default store;