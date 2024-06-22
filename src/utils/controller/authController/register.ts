import db from "@db/db";
import { ConflictError, InternalServerError } from "@http-exception";
import { registerRequest } from "@schemas/authSchemas";
import { createHash } from "crypto";

export default async function registerUser(
  registerData: registerRequest,
): Promise<void> {
  const { name, email, password } = registerData;

  const hashedPassword = createHash("sha256").update(password).digest("hex");

  const existingEmail = await db<registerRequest>("users")
    .select("email")
    .where("email", email);

  if (existingEmail.length > 0) {
    throw new ConflictError("Email already exists");
  }

  return db.transaction(async (trx) => {
    await db<registerRequest>("users")
      .insert({
        name,
        email,
        password: hashedPassword,
      })
      .transacting(trx)
      .then(trx.commit)
      .catch(() => {
        trx.rollback;
        throw new InternalServerError("Error while registering user");
      });
  });
}
