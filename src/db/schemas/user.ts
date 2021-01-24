import { Schema, model, Document } from 'mongoose';

//interfaz para el proyecto
interface User extends Document{
  first_name: string,
  last_name: string,
  email: string,
  avatar: string,
  password: string
}
//Esquema de la bd
const schema = new Schema({
  first_name: {type:String, required:true},
  last_name: {type:String, required:true},
  email: {type:String, unique:true, required:true},
  avatar: String,
  password:{type:String, required:true}
});

const Users = model<User>('user', schema);

export default Users;