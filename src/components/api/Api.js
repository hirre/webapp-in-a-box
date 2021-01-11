const ApiEndPoint = "https://localhost";

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
    let loggedIn = false;

    const requestOptions =
    {
        credentials: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uName, password: pwd })
    };

    await fetch(ApiEndPoint + "/api/Auth/User", requestOptions)
    .then(handleErrors)
    .then(async response => 
    {
        loggedIn = true;
    })
    .catch(error => loggedIn = false );

    return loggedIn;
}

const Api = 
{
    loginCall
}

export default Api;