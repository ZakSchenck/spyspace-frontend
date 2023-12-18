// Get all post data
export const getPostData = async () => {
    const apiUrl = 'https://aqueous-castle-11914-39a6909963bb.herokuapp.com/api/v1/posts';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Posts API failed to fetch')
        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Get a specific user's posts
export const getUserPosts = async (username) => {
    const apiUrl = `https://aqueous-castle-11914-39a6909963bb.herokuapp.com/users/${username}/posts`

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('User posts API failed to fetch')
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data', error)
    }
}

// POST new post
export const postData = async (sentData) => {
    const crsfToken = localStorage.getItem('csrf')
    // const accessToken = localStorage.getItem('accessToken')
    console.log(crsfToken)
    const headers = {
        'Content-Type': 'application/json',
        'X-CRSF-Token': crsfToken,
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    };

    try {
        const response = await fetch('https://aqueous-castle-11914-39a6909963bb.herokuapp.com/api/v1/posts', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(sentData),
        });

        console.log(headers)

        if (!response.ok) {
            console.log(headers)
            throw new Error('Failed to make POST request');
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
        // Handle the response data here
    } catch (error) {
        console.error('Error making POST request:', error);
    }
}

export const postReplyData = async (sentData, id) => {
    const crsfToken = localStorage.getItem('csrf')
    // const accessToken = localStorage.getItem('accessToken')
    console.log(crsfToken)
    const headers = {
        'Content-Type': 'application/json',
        'X-CRSF-Token': crsfToken,
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    };

    try {
        const response = await fetch(`https://aqueous-castle-11914-39a6909963bb.herokuapp.com/api/v1/posts/${id}/replies`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(sentData),
        });

        console.log(headers)

        if (!response.ok) {
            console.log(headers)
            throw new Error('Failed to make POST request');
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
        // Handle the response data here
    } catch (error) {
        console.error('Error making POST request:', error);
    }
}

// Get single post and its replies
export const getSinglePost = async (id) => {
    const postEndpoint = `https://aqueous-castle-11914-39a6909963bb.herokuapp.com/posts/${id}`;
    try {
        const response = await fetch(postEndpoint);
        if (!response.ok) throw new Error('Get single post endpoint failed.');
        const postData = await response.json();
        return postData;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Sign in user
export const signIn = async (user) => {
    const loginEndpoint = 'https://aqueous-castle-11914-39a6909963bb.herokuapp.com/signin'; // Replace this with your actual login endpoint

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'X-CSRF-Token': localStorage.getItem('csrf'),

        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(loginEndpoint, requestOptions);
        if (!response.ok) {
            throw new Error('Login failed'); // Handle specific errors based on the response status code
        }

        const data = await response.json();
        // Handle successful login, store tokens or user information
        return data
    } catch (error) {
        // Handle login failure or errors
        console.error('Login error:', error.message);
    }
}

// User sign up endpoint
export const signUp = async (user) => {
    const signUpEndpoint = 'https://aqueous-castle-11914-39a6909963bb.herokuapp.com/signup';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };

    const response = await fetch(signUpEndpoint, requestOptions);
    console.log(response)

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Signup failed';
        throw new Error(errorMessage);
    }

    return await response.json();
}
