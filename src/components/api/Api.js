async function loginCall()
{
    const requestOptions =
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpwd' })
    };

    const response = await fetch("https://localhost/api/Auth/User", requestOptions);

    if (response.ok)
    {
        const token = await response.text();
        console.log(token);
    }
}

const Api = 
{
    loginCall
}

export default Api;