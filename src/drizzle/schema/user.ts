import {pgTable, text, pgEnum, timestamp} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelp"
import { relations } from "drizzle-orm"
import { UserCourseAccessTable } from "./userCourseAccess"

export const userRoles = ["user", "admin"] as const
export type userRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum("user_role", userRoles)

  export const UserTable = pgTable("users", {
  id: id,
  clerkId: text().notNull().unique(),
  name: text().notNull(),
  email: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({withTimezone: true}),
  createdAt,
  updatedAt
})

export const UserRelationships = relations(UserTable, ({many}) => ({
  userCourseAccess: many(UserCourseAccessTable)
}))