const loginCheck = () => {
    const token = localStorage.getItem("token");
    return token
}

export default loginCheck