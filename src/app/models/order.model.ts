export interface IOrder{
    id ?: string;
    userid: number;
    feedId: number;
    orderstatus: string;
    paymentStatus: string;
    orderDateTime: string;
}