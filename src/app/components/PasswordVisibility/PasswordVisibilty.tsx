import { setEye } from "@app/redux/reducers/EyeSlice"
import { useAppDispatch, useAppSelector } from "@app/redux/store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

export default function PasswordVisiblity() {
    const dispatch = useAppDispatch()
    const { eye } = useAppSelector(state => state.eyeReducer)

    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                dispatch(setEye(!eye))
            }}
            className='w-6'
        >
            {
                eye ?
                    <FontAwesomeIcon icon={faEye} /> :
                    <FontAwesomeIcon icon={faEyeSlash} />
            }
        </button>
    )
}