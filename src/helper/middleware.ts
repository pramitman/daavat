import { apiResponse } from "../common";

export const VALIDATE_ROLE = (roles) => async (req: any, res: any, next) => {
    // let { merchantId } = req.headers;
    //x-forwarded-for used for website ip and req.socket for local ip 
    let {user} = req.headers;
        try {
            // if(user.userType.includes(roles))
            //if user has following roles from roles then next otherwise Unauthorized
            console.log(roles.includes(user.role) , "isAuthorized");
            if(roles.includes(user.role))
             return  next();
            return res.status(404).json(new apiResponse(404 , "Unauthorized" , {} , {}));
        } catch (err) {
            console.log(err);
            return res.status(401).json(new apiResponse(401, "Unauthorized", {}, {}))
        }
} 