import { apiUpdateProfile } from '@/services/UserService'
import type { updateProfile } from '@/@types/user'
import { setUser, signInSuccess, useAppDispatch } from '@/store'
import {
    ResetPassword,
    SignInCredential,
    SignInResponse,
    SignUpCredential,
} from '@/@types/auth'
import axios from 'axios'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '../deepParseJson'
import { apiResetPassword } from '@/services/AuthService'

function useUser() {
    const dispatch = useAppDispatch()

    const updateProfile = async (
        values: updateProfile
    ): Promise<
        | {
              status: any
              message: string
          }
        | undefined
    > => {
        try {
            if (values.foto) {
                console.log('entro a subir img', values.foto)
                const formData = new FormData()
                const id = values.id
                formData.append('file', values.foto)
                formData.append('id', String(id))

                const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
                const persistData = deepParseJson(rawPersistData)
                let accessToken = (persistData as any).auth.session.token

                axios({
                    timeout: 60000,
                    baseURL: import.meta.env.VITE_API_BASE_URL,
                    url: 'upload-profile-picture',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: 'Bearer ' + accessToken,
                    },
                    data: formData,
                })
                    .then((resp) => {
                        dispatch(
                            setUser(
                                resp.data || {
                                    id: 0,
                                    avatar: '',
                                    firstName: 'Anonymous',
                                    lastName: 'Anonymous',
                                    email: '',
                                    userType: ['USER'],
                                }
                            )
                        )
                    })
                    .catch((err) => console.log(err))
            }
            const resp = await apiUpdateProfile(values)
            if (resp.data) {
                console.log('data entro', resp.data)
                dispatch(
                    setUser(
                        resp.data || {
                            id: 0,
                            avatar: '',
                            firstName: 'Anonymous',
                            lastName: 'Anonymous',
                            email: '',
                            userType: ['USER'],
                        }
                    )
                )
            }
            return {
                status: 'success',
                message: 'Perfil Actualizado',
            }
        } catch (errors: any) {
            return {
                status: errors.status,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const resetPassword = async (
        values: ResetPassword
    ): Promise<
        | {
              status: string
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await apiResetPassword(values)
            if (resp.data) {
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: errors?.response.status,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    return {
        updateProfile,
        resetPassword,
    }
}

export default useUser
