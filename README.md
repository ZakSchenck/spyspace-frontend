# SpySpace - A Twitter Clone 
## Actively adding more features/bug fixes, as it's still a WIP

![alt text](https://zakschenck.github.io/zak-portfolio/img/spyspace.png)

## Tech Stack
* Vue 2
* Vuex
* Sass
* Ruby on Rails 7
* PostgreSQL

## Features
* Authentication - Login / Signup built with Ruby on Rails
* Able to add posts if logged in.
* Each user has their own posts
* Each post has replies that can be viewed

## Why Vue 2?
The reason I am using Vue 2 is because this is what my current company utilizes. I wanted to grow as a developer in this company, and that requires using the frontend stack we use. As the project grows, it might be smart to convert to Vue 3, but as of now, it's lightweight enough to warrant Vue 2 as an acceptable use-case. I do believe Vue is a great technology to use over React here, due to how lightweight the library is

## Future features
* Like button
* Adding replies that belong to a user (implementing username)
* Adding replies to replies
* Notifications bar
* Follow button

  
## Challenges
### One of the bigger challenges to implement myself was an infinite scroll the was quick and efficient:
```
    // Add scroll function for infinite scroll
    mounted() {
        window.addEventListener('scroll', this.handleInfiniteScroll);
    },

    // Removing scroll function when unmounted to prevent memory leaks
    unmounted() {
        window.removeEventListener('scroll', this.handleInfiniteScroll);
    },
```

```
        // Handling scroll logic for infinite scroll
        handleInfiniteScroll() {
            // Gets Y scroll off set height
            const maxScrollY = document.body.scrollHeight - window.innerHeight;

            // When i reach a certain point at the bottom of the page, load 10 more posts
            if (maxScrollY - window.scrollY < 165) this.numberOfData += 10
        },
```

