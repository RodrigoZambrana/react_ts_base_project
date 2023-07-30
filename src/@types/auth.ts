import profilePicture from '../../../backend_base_project/src/middlewares/MulterPictureHandler';
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
    profilePicture: string,
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
