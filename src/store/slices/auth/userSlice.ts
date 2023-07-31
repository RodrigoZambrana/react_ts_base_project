import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import profilePicture from '../../../../../backend_base_project/src/middlewares/MulterPictureHandler'

export type UserState = {
    id: number
    avatar?: string
    firstName?: string
    lastName?: string
    profilePicture?: string
    email?: string
    userType?: string[]
}

const initialState: UserState = {
    id: 0,
    avatar: '',
    email: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
    userType: [],
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.id = action.payload?.id
            state.avatar = action.payload?.avatar
            state.firstName = action.payload?.firstName
            state.lastName = action.payload?.lastName
            state.email = action.payload?.email
            state.profilePicture =
                action.payload?.profilePicture !== ''
                    ? 'http://localhost:5005/profile-pictures/' +
                      action.payload?.profilePicture
                    : ''
            state.userType = action.payload?.userType
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
