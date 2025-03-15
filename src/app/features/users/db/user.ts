import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function insertUser(data: typeof UserTable.$inferInsert){
  const [newUser] = await db
    .insert(UserTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [UserTable.clerkId],
      set:data
    })
  if(newUser == null) throw new Error("Failed to create user")

  return newUser
}

export async function updateUser(
  {clerkUserId}: {clerkUserId: string},
  data: Partial<typeof UserTable.$inferInsert>
) {
  const [updatedUser] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.clerkId, clerkUserId))
    .returning()

  if (updatedUser == null) throw new Error('Failed to update user')
  return updatedUser
}

export async function deleteUser(
  {clerkUserId}: {clerkUserId: string}){
    const [deletedUser] = await db
      .update(UserTable)
      .set({
        deletedAt: new Date(),
        email: "user@deleted.com",
        name: "deleted user",
        clerkId: "deleted",
        imageUrl: null
      })
      .where(eq(UserTable.clerkId, clerkUserId))
      .returning()

    if (deletedUser == null) throw new Error ("failed to update user")
    return deletedUser
  }