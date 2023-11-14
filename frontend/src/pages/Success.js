import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Success = () => {
    const history = useHistory();

    useEffect(() => {
        // Use setTimeout to delay the redirection
        const timeoutId = setTimeout(() => {
            // Redirect to the home page after 5 seconds
            history.push('/');
        }, 5000);

        // Clear the timeout when the component is unmounted
        return () => clearTimeout(timeoutId);
    }, [history]);

    return (
        <div>
            <h1>Payment successful</h1>
            <p>Redirecting to the home page...</p>
        </div>
    );
};

export default Success;
