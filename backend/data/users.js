import bcrypt from 'bcryptjs';
// define user data
const users = [
    {
        name:'Admin User',
        email:"admin@example.com",
        password:bcrypt.hashSync('123456' , 10),
        isAdmin:true,
    },
    {
        name:'Teddy Pearce',
        email:"tedypearce@example.com",
        password:bcrypt.hashSync('123456' , 10),    },
    {
        name:'John Doe',
        email:"johndoe@example.com",
        password:bcrypt.hashSync('123456' , 10),    }
]

export default users;