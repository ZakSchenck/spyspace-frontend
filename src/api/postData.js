export const getPostData = async () => {
    const apiUrl = 'http://localhost:3000/api/v1/posts';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Posts API failed to fetch')
        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// POST request
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
        const response = await fetch('http://localhost:3000/api/v1/posts', {
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

export const signIn = async (user) => {
    const loginEndpoint = 'http://localhost:3000/signin'; // Replace this with your actual login endpoint

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

export const signUp = async (user) => {
    const signUpEndpoint = 'http://localhost:3000/signup';
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
  
    try {
      const response = await fetch(signUpEndpoint, requestOptions);
      if (!response.ok) {
        throw new Error('Signup failed'); // Handle specific errors based on the response status code
      }
  
      const data = await response.json();
      // Handle successful signup response
      console.log('Signup successful:', data);
    } catch (error) {
      // Handle signup failure or errors
      console.error('Signup error:', error.message);
    }
}