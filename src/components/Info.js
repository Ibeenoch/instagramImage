import React, { useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

const Info = () => {
  const [show, setShow] = useState(false);

  const handleshow = () => {
    setShow(!show)
  }

  return (
    <div >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'gray', cursor: 'pointer' }}>
        <h4 onClick={handleshow}>User Guide</h4>
        <div onClick={handleshow} style={{ display: ( show ? 'none' : 'block') }}> <KeyboardArrowUp /></div>
        <div onClick={handleshow} style={{ display: ( show ? 'block' : 'none') }}> <KeyboardArrowDown /></div>      
      </div>
   <div style={{ display: (show ? 'block' : 'none' ), border: '1px solid gray'}}>
    <p style={{  textAlign: 'center', }}>
    Click on <strong>Get Authorization Token</strong>  <br />

then, Instagram login will pop up, after logging in, it will ask for your authorization, <br />
then you click to allow the authorizationn, it will redirects your web browser to https://localhost/3000/ <br />
The web page displayed in your new window browser is important to us <br />
here because authorization code that has been appended to the redirect URL. <br />
If you look in your new window browser’s URL, you should see a URL that looks something like this: <br />

<pre> https://localhost:3000?code=AQBvJwCZtYdj1z<br />
LH_5myoAA1GRRpDhs1vcHFMzB4gvRk6dLkq5dNd24EVZ5FD<br />
9WoqQhfSuo6arUB17MPu2gRqEzP6EpsAl-9_2eC9-L6mWYQ<br />
dWDyarkwDSNEs8T3gvoH-WLMHzhwwd6DJqP5PxJGf2ve53m<br />
7aGMEua3MzV8FZQVz5AfwWPN3G87n25jBGgGGVj6G4pxJ9H<br />
zNKmdpYK8GHKnRn_G03scHtUraFlEX5faCvz6ZO7Xw#_</pre>

copy everything after <pre> <strong>code=</strong></pre>  up to (but not including) the ,<pre><strong>#_ </strong></pre> at the end. So, in the above URL, the authorization code would be something like this:

<pre>AQBvJwCZtYdj1zLH_5myoAA1GRRpDhs1vcHFMzB4gv<br />
Rk6dLkq5dNd24EVZ5FD9WoqQhfSuo6arUB17MPu2gRqEzP<br />
6EpsAl-9_2eC9-L6mkYQdWDyarkwDSNEs8T3gvoH-WLMHz<br />
hwwd6DJqP5PxJGf2ve53m7aGMEua3MzV8FZQVz5AfwWPN3<br />
G87n25jMBGgGGVj6G4pxJ9HqzNKmdpYK8GHknRn_G03scH<br />
tUraFlEX5faCvz6ZO7Xw</pre>

after copying the token, paste it into the input field and then hit the "Get Photos" button and it will display all your Instagram Photos
     </p>
   </div>
    </div>
  )
}

export default Info
