import { combineReducers } from '@reduxjs/toolkit'
import eyeReducer from './reducers/EyeSlice'
import authReducer from './reducers/AuthSlice'
import { authAPI } from './services/AuthServices'
import { linkAPI } from './services/LinkServices'

export const rootReducer = combineReducers({
    eyeReducer,
    authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [linkAPI.reducerPath]: linkAPI.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
