function handleErrors(response) 
{
    if (!response.ok) 
    {
        throw Error(response.statusText);
    }

    return response;
}

async function loginCall(uName, pwd)
{
    let token = "";
    const requestOptions =
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uName, password: pwd })
    };

    await fetch("https://localhost/api/Auth/User", requestOptions)
    .then(handleErrors)
    .then(async response => 
    {
        token = await response.text();
    })
    .catch(error => token = "" );

    return token;
}

const Api = 
{
    loginCall
}

export default Api;