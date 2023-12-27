import { client } from 'https://unpkg.com/@passwordless-id/webauthn'
const btn = document.getElementById('Register');
async function trigger(){
    const response = await fetch('/api/challange', { method: 'GET' });
      const challenge = await response.json();
      console.log(challenge.challange);
      try{
      const authentication = await client.authenticate([], challenge.challange, {
        "authenticatorType": "auto",
        "userVerification": "required",
        "timeout": 60000
                })
    console.log(authentication);
    const response2 = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authentication)
      })
      const data = await response2.json();
      if(data.tag){
        window.location.href = "http://localhost:3000/";
      }
      else alert("Login Failled");;
     }
      catch(err){
        alert("Auth is Failed!");
      }
}
export {trigger};