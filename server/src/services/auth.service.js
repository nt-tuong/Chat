const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Login with person username + user password (bcrypt hash in M_Users).
 * @returns {Promise<{ token: string, user: { username: string, name: string } } | null>}
 */
async function loginWithUsernamePassword(username, password) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const inputUserName = username.trim().toLowerCase();
  const user = await prisma.m_Users.findFirst({
    where: {
      userName: {
        equals: inputUserName,
        mode: "insensitive",
      },
      status: 1,
    },
    select: {
      id: true,
      uuid: true,
      password: true,
      userName: true,
      person: {
        select: {
          fullName: true,
        },
      },
    },
  });

  console.log("user", user);

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return null;
  }

  const token = jwt.sign(
    {
      sub: String(user.id),
      uuid: user.uuid,
      username: user.userName,
      fullName: user.person.fullName,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return { token };
}

module.exports = {
  loginWithUsernamePassword,
};
