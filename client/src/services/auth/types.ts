export interface SignInRequest {
    email: string;
    password: string;
    name: string;
}

export interface LogInRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}
