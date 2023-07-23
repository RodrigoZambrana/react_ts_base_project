import ApiService from './ApiService'

import type {
    updateProfile,
} from '@/@types/user'
import { SignInResponse } from '@/@types/auth'


export async function apiUpdateProfile(data: updateProfile) {
    return ApiService.fetchData<SignInResponse>({
        url: '/update-profile',
        method: 'put',
        data,
    })
}
