<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // Watches the route, then if the route is sign in or sign up, it adds a class to set the background image
  watch: {
    '$route'(to) {
      // Add class based on the route
      if (to.path === '/signup' || to.path === '/signin') {
        document.body.classList.add('bg-on-auth-page');
      } else {
        // Remove existing classes
        document.body.classList.remove('bg-on-auth-page');
      }
    }
  }
}
</script>

<style>
body {
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: rgb(0, 0, 0);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bg-on-auth-page {
  background-image: url('./assets/website-bg-asset.jpeg');
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
</style>
