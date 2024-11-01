const jwt = require("jsonwebtoken");
export const isExpired = (token) => {
    try {
        const decoded = jwt.decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Invalid token', error);
        return true;
    }
}