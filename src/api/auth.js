
export const getUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
}

export const setUser = (user) => {

    if (!user) {
        sessionStorage.removeItem('user');
        return;
    }

    sessionStorage.setItem('user', JSON.stringify(user.user));
}