export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (userInformation) => ({
    type: "LOGIN_SUCCESS",
    payload: userInformation
})

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
})

export const Logout = () => ({
    type: "LOGOUT"
})

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START"
})

export const UpdateSuccess = (userInformation) => ({
    type: "UPDATE_SUCCESS",
    payload: userInformation
})

export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE"
})