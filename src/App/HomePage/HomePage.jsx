import React, {useEffect, useState} from 'react';

export const HomePage = () => {
    const [authenticated, setAuthenticated] = useState(null);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setAuthenticated(loggedInUser);
        }
    }, []);

    if (!authenticated) {
        // Redirect
    } else {
        return (
            <div>
                <p>Welcome to your Dashboard</p>
            </div>
        );
    }
}