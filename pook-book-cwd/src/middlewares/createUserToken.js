import {sign} from 'jsonwebtoken';
const usePasswordHashToMakeToken=(user)=>{
    //highlight-start
    const {password,_id,createAt}=user;
    const secret=password+"-"+createAt;
    const token=sign({_id},secret,{
        expiresIn:'7d'
    });
    return token;
}
export default usePasswordHashToMakeToken;