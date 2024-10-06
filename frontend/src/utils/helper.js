// This function validates the format of an email address using a regular expression.
// It returns true if the email is valid and false otherwise.
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Generates the initials from a given name.
 * If the name is empty or not provided, it returns an empty string.
 * The function will return the initials of the first two words in uppercase.
 *
 * @param {string} name - The name from which to extract initials.
 * @returns {string} - The initials in uppercase.
 */
export const getInitials = (name) => {
    if(!name) return "";
 
    const words = name.split(" ");
    let initials = "";
    for(let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
 
    return initials.toUpperCase();
}
