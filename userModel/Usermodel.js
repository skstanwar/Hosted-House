import {model , Schema} from "mongoose";
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    pic: {type: String, required: true ,
    default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}

},
{timestamps: true}
);
const CredentialSchema = new Schema({
    user_id: {type: String},
    username: {type: String},
    credentialId:JSON
})
const credential = model('Credential', CredentialSchema);
const user = model('UserName', userSchema);
export { user , credential};