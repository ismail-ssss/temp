const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      next();
    } catch (error) {
      // Handle the error (e.g., log it, return a response, etc.)
      console.error("Token validation error:", error);
      next();
    }
  };
}

module.exports = { checkForAuthenticationCookie };
