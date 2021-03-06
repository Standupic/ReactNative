export function emailValidator(email: string) {
    const re = /\S+@\S+\.\S+/;
    if (!email) return "Email can't be empty.";
    if (!re.test(email)) return "Ooops! We need a valid email address.";
    return "";
}
export function passwordValidator(password: string) {
    if (!password) return "Password can't be empty.";
    return "";
}
export function loginValidator(login: string) {
    if (!login) return "Name can't be empty.";
    return "";
}
