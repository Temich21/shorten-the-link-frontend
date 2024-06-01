import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthSlice {
    token: null | undefined | string
    userId: null | undefined | string
    login: (jwtToken?: string, id?: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const initialState: AuthSlice = {
    token: null,
    userId: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state: AuthSlice, action: PayloadAction<string | null | undefined>) {
            state.token = action.payload
        },
        setUserId(state: AuthSlice, action: PayloadAction<string | null | undefined>) {
            state.userId = action.payload
        },
        setLogin(state: AuthSlice, action: PayloadAction<(jwtToken?: string, id?: string) => void>) {
            state.login = action.payload
        },
        setLogout(state: AuthSlice, action: PayloadAction<() => void>) {
            state.logout = action.payload
        },
        setAuthenticated(state: AuthSlice, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload
        },
    },
})

export const { setToken, setUserId, setLogin, setLogout,setAuthenticated } = authSlice.actions
export default authSlice.reducer