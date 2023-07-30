import { apiUpdateProfile } from '@/services/UserService'
import type { updateProfile } from '@/@types/user'
import { setUser, signInSuccess, useAppDispatch } from '@/store'
import { SignInCredential, SignInResponse } from '@/@types/auth';
import axios from 'axios';
import { PERSIST_STORE_NAME } from '@/constants/app.constant';
import deepParseJson from '../deepParseJson';

type Status = 'success' | 'failed'

function useUser() {

    const dispatch = useAppDispatch()

    const updateProfile = async (values: updateProfile) => {
        try {
            if (values.foto) {
                console.log("entro a subir img",values.foto)
                  const formData = new FormData();
                  const id = values.id;
                  formData.append('file', values.foto);
                  formData.append('id', String(id));
                  
                  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
                  const persistData = deepParseJson(rawPersistData)
                  let accessToken = (persistData as any).auth.session.token

                  axios({
                    timeout: 60000,
                    baseURL:import.meta.env.VITE_API_BASE_URL,
                    url: 'upload-profile-picture',
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': 'Bearer '+accessToken
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
                    .catch((err) => console.log(err));
                ;
              }
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


    return {
        updateProfile,
    }
}


export default useUser



