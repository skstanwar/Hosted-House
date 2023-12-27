import { server } from '@passwordless-id/webauthn'
import { credential } from "../userModel/Usermodel.js"

const challange = async (req, res) => {
    const challange = "a7c61ef9-dc23-4806-b486-2428938a547e"

    res.json({ challange })
}
const register = async (req, res) => {
    const expected = {
        challenge: "a7c61ef9-dc23-4806-b486-2428938a547e",
        origin: "https://host-house.onrender.com",
    }
    const datafetch = await credential.findOne({username:req.body.username});
    // console.log(datafetch)
    if(datafetch==null){
    try {
        const registrationParsed = await server.verifyRegistration(req.body.registration, expected)
        // console.log(registrationParsed)
        const data = new credential({
            user_id:registrationParsed.credential.id,
            username: registrationParsed.username,
            credentialId: registrationParsed.credential
        })
        await data.save();
        // console.log(data);
        req.session.IsAuth = true;
        // res.send("data is received");
        res.send({message:"registeration is done",
                    tag:false});

    }
    catch (err) {
        console.log(err);
    }}
    else res.send({message:"You are registered",
                    tag:true});


}
const login = async (req, res) => {
    const expected = {
        challenge: "a7c61ef9-dc23-4806-b486-2428938a547e",
        origin: "https://host-house.onrender.com",
        userVerified: true  
    }
    const user_id = req.body.credentialId;
    const datafetch = await credential.findOne({user_id:req.body.credentialId});
    console.log(datafetch);
   if(datafetch!=null){
    req.session.IsAuth=true;
    res.send({message:"You are logged in",
              tag:true});
   }
   else{ 
    req.session.IsAuth=false;
    res.send({message:"You are not register",
             tag:false});}
}

export { challange, register , login };

