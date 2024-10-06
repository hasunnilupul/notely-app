// This function validates the format of an email address using a regular expression.
// It returns true if the email is valid and false otherwise.
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

