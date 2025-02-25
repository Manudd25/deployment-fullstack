import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
    // Get token from cookies
    console.log(req.cookies)
    const token = req.cookies?.token;
    if (!token) {  
        return next({status:401,message:"Access denied. No token provided."})
    }

    try {
        // Verify token using a secret (set in your environment variable)
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        console.log(req.method)
        if(req.body.author !== decodedUser.id && req.method=="POST"  &&req.method=="PATCH" ){
            next({status:401, message: "the user and token assigend to user they dont match!"})
            return
        }
        req.user = decodedUser;
        
        
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export default checkToken;