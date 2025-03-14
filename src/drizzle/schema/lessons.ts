import {pgTable, text, integer, pgEnum, uuid} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelp"
import { relations } from "drizzle-orm"
import { CourseSectionTable } from "./courseSection"
import { UserLessonCompleteTable } from "./userLessonComplete"
export const lessonStatuses = ["public", "private", "preview"] as const
export type lessonStatus = (typeof lessonStatuses)[number]
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses)

export const LessonTable = pgTable("lessons", {
  id: id,
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().notNull().default("private"),
  sectionId: uuid().references(() => CourseSectionTable.id, {onDelete: "cascade"}),
  createdAt,
  updatedAt
})

export const LessonRelationships = relations(LessonTable, ({one, many}) => ({
  section: one(CourseSectionTable, {
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id]
  }), 
  userLessonComplete: many(UserLessonCompleteTable)
}))