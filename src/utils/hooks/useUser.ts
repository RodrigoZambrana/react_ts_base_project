import { apiDeletePhoto, apiUpdateProfile } from '@/services/UserService'
import type { updateProfile } from '@/@types/user'
import { setUser, signInSuccess, useAppDispatch, useAppSelector } from '@/store'
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
import { deletePhoto } from '../../@types/user'
import { UserType } from '../../../../backend_base_project/src/entity/User'

function useUser() {
    const dispatch = useAppDispatch()
    const user_id = useAppSelector((state) => state.auth.user.id)
    const name = useAppSelector((state) => state.auth.user.firstName)
    const lastName = useAppSelector((state) => state.auth.user.lastName)
    const email = useAppSelector((state) => state.auth.user.email)
    const userType = useAppSelector((state) => state.auth.user.userType)

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
                            setUser({
                                id: user_id,
                                avatar: '',
                                firstName: name,
                                lastName: lastName,
                                email: email,
                                userType: userType,
                                profilePicture: resp.data.profilePicture,
                            })
                        )
                    })
                    .catch((err) => console.log(err))
            }
            const resp = await apiUpdateProfile(values)
            if (resp.data) {
                dispatch(
                    setUser({
                        id: user_id,
                        avatar: '',
                        firstName: resp.data.firstName,
                        lastName: resp.data.lastName,
                        email: email,
                        userType: userType,
                        profilePicture: resp.data.profilePicture,
                    })
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
                return {
                    status: resp.status.toString(),
                    message: 'Contraseña actualizada',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: errors?.response.status,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const deletePhoto = async (
        id: number
    ): Promise<
        | {
              status: string
              message: string
          }
        | undefined
    > => {
        try {
            const userId: deletePhoto = { id }
            const resp = await apiDeletePhoto(userId)
            dispatch(
                setUser({
                    id: id,
                    avatar: '',
                    firstName: name,
                    lastName: lastName,
                    email: email,
                    userType: userType,
                    profilePicture: '',
                })
            )
            if (resp.data) {
                return {
                    status: resp.status.toString(),
                    message: 'Foto actualizada',
                }
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
        deletePhoto,
    }
}

export default useUser
