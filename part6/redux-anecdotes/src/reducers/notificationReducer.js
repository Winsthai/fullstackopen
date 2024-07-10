import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return initialState
        }
    }
})

export const {updateNotification, removeNotification} = notificationSlice.actions

export const setNotification = (content, seconds) => {
    return async dispatch =>  {
        dispatch(updateNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, (seconds * 1000))
    }
}

export default notificationSlice.reducer