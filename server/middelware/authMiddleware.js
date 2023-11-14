import jwt from 'jsonwebtoken'
const authMiddleware = async(req, res, next)=> {

    try {

        const token = req.headers.authorization?.split(' ')[1]
        console.log(token);
        const payload = jwt.verify(token, process.env.SECRET_KEY)
    
        console.log(payload);

        // If request is an object how can we attach a new property to it?

        req.userId = payload.userId
  
        next()
    }
    catch(error){
        next(error)
    }
}
export default authMiddleware