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
import { apiGetProjectList } from '@/services/ProjectService'

function useEmpresas() {
    const getEmpresas = async (
        values: ResetPassword
    ): Promise<
        | {
              status: string
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await apiGetProjectList(values)
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

    return {
        getEmpresas,
    }
}

export default useEmpresas
