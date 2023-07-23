import { apiUpdateProfile } from '@/services/UserService'
import type { updateProfile } from '@/@types/user'
import { setUser, signInSuccess, useAppDispatch } from '@/store'
import { SignInCredential, SignInResponse } from '@/@types/auth';

type Status = 'success' | 'failed'

function useUser() {

    const dispatch = useAppDispatch()

    const updateProfile = async (values: updateProfile) => {
        try {
            const resp = await apiUpdateProfile(values)
            if (resp.data) {
                console.log("data entro",resp.data)
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
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await apiUpdateProfile(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(signInSuccess(token))
                if (resp.data) {
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
                    message: '',
                }
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    return {
        updateProfile,
    }
}


export default useUser



