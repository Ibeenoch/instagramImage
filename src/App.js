import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState(null);

  const handleLogin = () => {
    console.log(window.FB)
    window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        setIsLoggedIn(true);
        setUser(response.authResponse.userID);
      } else {
        window.FB.login(response => {
          if (response.authResponse) {
            setIsLoggedIn(true);
            setUser(response.authResponse.userID);
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'public_profile,user_photos' });
      }
    });
  };

  const handleLogout = () => {
    window.FB.logout(response => {
      setIsLoggedIn(false);
      setUser(null);
      setPhotos(null);
    });
  };

  const handleGetPhotos = () => {
    window.FB.api(`/${user}/photos?fields=id,images`, response => {
      if (response.error) {
        console.log('Error retrieving user photos:', response.error.message);
      } else {
        setPhotos(response.data);
      }
    });
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <p>User ID: {user}</p>
          <button onClick={handleLogout}>Log out</button>
          <button onClick={handleGetPhotos}>Get user photos</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Log in with Facebook</button>
      )}

      {photos && (
        <div>
          <h2>User photos:</h2>
          {photos.map(photo => (
            <img key={photo.id} src={photo.images[0].source} alt={photo.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
