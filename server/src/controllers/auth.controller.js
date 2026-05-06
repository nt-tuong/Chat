const authService = require("../services/auth.service");

/**
 * POST /api/auth/login
 * Body: { username: string, password: string }
 */
async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (
      username === undefined ||
      password === undefined ||
      String(username).trim() === "" ||
      String(password) === ""
    ) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const result = await authService.loginWithUsernamePassword(
      String(username).trim(),
      password,
    );

    if (!result) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    return res.json({
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
};
