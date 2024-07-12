import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'addNewAnecdote':
            return `anecdote '${action.content}' created`
        case 'incrementVote':
            return `anecdote '${action.content}' voted`
        case 'tooShortError':
            return `too short anecdote, must have five length or more`
        case 'clearNotification':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext