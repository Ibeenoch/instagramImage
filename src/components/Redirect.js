import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Info from './Info';

const Redirect = () => {
  const item = JSON.parse(localStorage.getItem('accesstoken'))
  const photo = JSON.parse(localStorage.getItem('photos'))
  const [accessToken, setAccessToken] = useState( item ? item : null );
  const [photos, setPhotos] = useState( photo ? photo : []);
  const [gettoken, setGetToken] = useState('');
  const [shortToken, setShortToken] = useState(false)
  const url = 'https://instagramserver.onrender.com'

  const clientid = '100575559642998'
  const clientsecret = '2ed05c2cf70cb1c8bc44dd2ee0d8afb5'
const redirecturi = 'https://localhost:3000/'
  const scope = 'user_profile,user_media'

  const instaurl = `https://api.instagram.com/oauth/authorize?client_id=${clientid}&redirect_uri=${redirecturi}&scope=${scope}&response_type=code`



  const handleLogin = () => {
    // Redirect the user to the Instagram Login API's authorization URL-
    const authURL = `https://api.instagram.com/oauth/authorize?client_id=${clientid}&redirect_uri=${redirecturi}&scope=${scope}&response_type=code`;

    // Open the new window and save a reference to it
const newWindow = window.open(authURL);


  };

  const getShortLiveToken = async() => {
    
    const docdata = {
      accesstoken: gettoken,
    }
   if(!docdata.accesstoken){
    return;
  }

    const response = await axios.post(`${url}/api`, docdata );
   
    if(response){
     localStorage.setItem('accesstoken', JSON.stringify(response.data.access_token))
     setAccessToken(JSON.parse(localStorage.getItem('accesstoken')))
     setShortToken(true)
    }
  }

 console.log(accessToken, shortToken)

if(shortToken){
    const fetchData = async () => {
      try {
        // Make a GET request to the /me/media endpoint
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`);
       localStorage.setItem('photos', JSON.stringify(response.data.data) )
        setPhotos(JSON.parse(localStorage.getItem('photos')));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
}


  return (
    <div>
        <div>
          <button onClick={handleLogin} style={{  height: '80px', width: 'auto', border : 'none', fontSize: '1.2rem', background: 'purple', color: 'white', borderRadius: '0.5rem', fontWeight: 500, cursor : 'pointer', padding : '5px 15px', marginLeft: 'calc(100vw/2)' }} >Get Authorization Token</button>
            <div style={{ display: 'flex', flexDirection: 'column' }} >
            <input type="text" placeholder='insert your access token here' value={gettoken} onChange={(e) => setGetToken(e.target.value)}  style={{ height: '80px', width: 'auto', border : '1px solid gray', fontSize: '1.2rem', background: 'white',  borderRadius: '0.5rem', fontWeight: 500, padding : '5px 15px', margin: '10px' }} />
          <button type='submit' onClick={getShortLiveToken} style={{ height: '80px', width: 'auto', border : 'none', fontSize: '1.2rem', background: 'purple', color: 'white', borderRadius: '0.5rem', fontWeight: 500, cursor : 'pointer', padding : '5px 15px', margin: '10px' }}>Get Photos</button>
          </div>
        </div>
        
        <div>
          <Info />
        </div>
   
        <div>
          <h1>User Photos</h1>
          <ul>
            {photos.map(photo => (
              <li key={photo.id}>
                <img src={photo.media_url} alt={photo.caption} />
                <p>{photo.caption}</p>
                <a href={photo.permalink} target="_blank" rel="noopener noreferrer">View on Instagram</a>
              </li>
            ))}
          </ul>
        </div>

    </div>
  );
};

export default Redirect;
