const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/postgres");

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

  const sql = `
    SELECT
      u."id",
      u."uuid"::text AS "uuid",
      u."password",
      u."userName",
      p."fullName"
    FROM "M_Users" u
    INNER JOIN "M_Persons" p ON p."id" = u."personId"
    WHERE LOWER(TRIM(u."userName")) = LOWER(TRIM($1))
      AND u."status" = 1
    LIMIT 1
  `;

  const { rows } = await query(sql, [username]);
  if (rows.length === 0) {
    return null;
  }

  const row = rows[0];

  const match = await bcrypt.compare(password, row.password);
  if (!match) {
    return null;
  }

  const token = jwt.sign(
    {
      sub: String(row.id),
      uuid: row.uuid,
      username: row.userName,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return { token };
}

module.exports = {
  loginWithUsernamePassword,
};
