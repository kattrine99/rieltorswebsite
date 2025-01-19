import { useEffect, useState } from 'react';

export const ProfilePage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {//log out
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <div>
            {userData ? (
                <div>
                    <div>
                        <img src={userData.avatar} alt="Profile" />
                        <h2>{userData.Name}</h2>
                        <p>{userData.email}</p>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                    <div>
                        <h3>Favorites</h3>
                        {userData.favorites && userData.favorites.length > 0 ? (
                            <ul>
                                {userData.favorites.map((favorite, index) => (
                                    <li key={index}>{favorite}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No favorites added.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
