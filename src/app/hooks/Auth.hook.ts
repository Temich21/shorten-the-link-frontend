import { useCallback, useEffect } from "react"
import { setToken, setUserId, setLogin, setLogout, setAuthenticated } from "@app/redux/reducers/AuthSlice"
import { useAppDispatch } from "@app/redux/store"
import { storageName } from '@app/constants/constants'

export const useAuth = () => {
    const dispatch = useAppDispatch()

    const loginUC: (jwtToken?: string, id?: string) => void = useCallback((jwtToken, id) => {
        dispatch(setToken(jwtToken))
        dispatch(setUserId(id))
        dispatch(setAuthenticated(true))

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logoutUC = useCallback(() => {
        setToken(null)
        setUserId(null)
        dispatch(setAuthenticated(false))
        localStorage.removeItem(storageName)
    }, [])

    dispatch(setLogin(loginUC))
    dispatch(setLogout(logoutUC))

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            loginUC(data.token, data.userId)
        }
    }, [loginUC])
}