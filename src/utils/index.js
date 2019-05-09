// any helper functions can go here.

const apiBase = 'http://localhost:8000';

const apiRequest = async (method, path, body) => {

    return fetch(`${apiBase}/${path}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok || response.status !== 200) {
            throw response;
        } else {
            return response.json()
        }
    })
    .catch((error) => { 
        // simple error handling
        console.log('Error', error.message || `${error.status}: ${error.statusText}`);
        throw error;
    });
};

export const apiGet = (path, body) => apiRequest('GET', path, body);
export const apiPut = (path, body) => apiRequest('PUT', path, body);
export const apiPost = (path, body) => apiRequest('POST', path, body);
export const apiDelete = (path, body) => apiRequest('DELETE', path, body);
