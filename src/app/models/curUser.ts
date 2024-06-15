import { IAddressDetails } from "./address.model";
import { IPaymentDetails } from "./payment.model";
export interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    address: IAddressDetails[];
    payment: IPaymentDetails[];
}