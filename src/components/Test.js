import React, { useEffect } from 'react';

const Test = () => 
{
    const handleErrors = (response) =>
    {
        if (!response.ok) 
        {
            throw Error(response.statusText);
        }

        return response;
    }

    useEffect(() => 
    {
        async function fetchData() 
        {
            const requestOptions =
            {
                credentials: 'include',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
    
            await fetch("https://localhost/api/AuthTest", requestOptions)
            .then(handleErrors)
            .then(async response => 
            {
    
            })
            .catch(error => 
            {
    
            });
        }
        fetchData();
      }, []);

    return (
        <div>Test page</div>
    );
}

export default Test;