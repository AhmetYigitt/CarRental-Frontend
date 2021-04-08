import { ResponseModel } from "./responseModel";

export interface SingleResponsemodel<T> extends ResponseModel{
    data:T
}