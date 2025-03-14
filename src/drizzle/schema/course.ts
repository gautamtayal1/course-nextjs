import {pgTable, text} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelp"
import { relations } from "drizzle-orm"
import { CourseProductTable } from "./courseProducts"
import { UserCourseAccessTable } from "./userCourseAccess"
export const CourseTable = pgTable("courses", {
  id: id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt: createdAt,
  updatedAt: updatedAt
})

export const CourseRelationships = relations(CourseTable, ({many}) => ({
  courseProducts: many(CourseProductTable),
  userCourseAccess: many(UserCourseAccessTable)
}))