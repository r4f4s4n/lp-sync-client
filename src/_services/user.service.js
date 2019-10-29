import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getCollection
};

async function login(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    };

    const response = await fetch(`${config.apiUrl}/login`, requestOptions);
    const user = await handleResponse(response);

    // login successful if there's a user in the response
    if (user.status) {
        await fails("Acceso interrumpido" - + user.status);
    }
    else if (user) {
        // store user details and basic auth credentials in local storage 
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username);
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('collection');
}

async function getCollection(username) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`${config.apiUrl}/login/${username}`, requestOptions);
    const collection = await handleResponse(response);

    localStorage.setItem('collection', JSON.stringify(collection));

    return collection;
}

function handleResponse(response) {
    return response.text().then(text => {

        try {
            const data = text && JSON.parse(text);

            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        }
        catch (error) {
            return Promise.reject(text);
        }

    });
}