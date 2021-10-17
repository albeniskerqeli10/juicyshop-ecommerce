import jwt from 'jsonwebtoken';

const generateToken  = (id) => {
    return  jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn: '2m'
    });
}
export default generateToken;