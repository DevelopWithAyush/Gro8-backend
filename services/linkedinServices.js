export const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
    }) 
    
try {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    })
    const data = await response.json();
    return data;
} catch (error) {
    console.log(error)
}

}



export const getUserProfile = async(accessToken) => {
     
        const response = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
        return data;
    
}




