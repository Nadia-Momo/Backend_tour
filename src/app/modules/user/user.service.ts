import { IUser } from "./user.interface";
import { User } from "./user.model";
const createUserService=async(payload:Partial<IUser>)=>{
 const {name,email}=payload;
 const user=await User.create({
  name,
  email
 })
 return user
}
const getAllUsers=async()=>{
  const users=User.find({});
  const totalUsers=await User.countDocuments()
  return {
    data:users,
    meta:{
      total:totalUsers
    }
  }
}
export const UserServices={
  createUserService  ,
  getAllUsers
}
//route matching->controller->service->model->DB