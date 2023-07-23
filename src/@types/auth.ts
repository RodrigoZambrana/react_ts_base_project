export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    token: string
    id: number,
    firstName: string,
    lastName: string,
    contactNumber:string,
    email: string,
    userType:string[],   
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
