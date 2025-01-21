export interface GetUserByIdResponse {
    "status": number;
    "message": {
        "mail": string,
        "phone_number": string,
        "user_id": number,
        "name": string,
        "reg_date": Date,
        "city": string
    }
}
export interface LoginUserPayload {
    email: string;
    password: string;
}
export interface LoginUserResponse {
    status: number;
    user_id: number;
    message: string;

}
export interface RegistrationUserPayload {
    email: string;
    password: string;
    phone_number: string;
    name: string;
    user_city: string;
}
export interface RegistrationUserResponse {
    status: number;
    user_id: number;
    message: string;
}

