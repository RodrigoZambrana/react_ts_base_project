import ApiService from './ApiService'

import type { updateProfile } from '@/@types/user'
import { SignInResponse } from '@/@types/auth'
import { deletePhoto } from '../@types/user'

export async function apiUpdateProfile(data: updateProfile) {
    return ApiService.fetchData<SignInResponse>({
        url: '/update-profile',
        method: 'put',
        data,
    })
}

export async function apiDeletePhoto(data: deletePhoto) {
    return ApiService.fetchData<SignInResponse>({
        url: '/delete-photo',
        method: 'delete',
        data,
    })
}
