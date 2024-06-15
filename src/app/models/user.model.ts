import { IAddressDetails } from "./address.model";
export interface IUserFormData{
    id: number;
    firstname: string;
    lastname: string;
    email:String;
    password:String;
    confirmpassword?:string;
    disclaimer:boolean; 
    address?: IAddressDetails[]; 
    
}