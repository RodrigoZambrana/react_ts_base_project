import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    avatar?: string
    firstName?: string
    lastName?: string
    email?: string
    userType?: string[]
}

const initialState: UserState = {
    avatar: '',
    email: '',
    userType: [],
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar
            state.firstName = action.payload?.firstName
            state.lastName = action.payload?.lastName
            state.email = action.payload?.email
            state.userType = action.payload?.userType
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
