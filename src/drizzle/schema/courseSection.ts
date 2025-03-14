import {pgTable, text, integer, pgEnum, uuid} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelp"
import { relations } from "drizzle-orm"
import { CourseTable } from "./course"
import { LessonTable } from "./lessons"

export const courseSectionStatuses = ["public", "private"] as const
export type courseSectionStatus = (typeof courseSectionStatuses)[number]
export const courseSectionStatusEnum = pgEnum("course_section_status", courseSectionStatuses)

export const CourseSectionTable = pgTable( "course_sections", {
  id: id,
  name: text().notNull(),
  status: courseSectionStatusEnum().notNull().default("private"),
  order: integer().notNull(),
  courseId: uuid().references(() => CourseTable.id, {onDelete: "cascade"}),
  createdAt,
  updatedAt
})

export const CourseSectionRelationships = relations(CourseSectionTable, ({one, many}) => ({
  course: one(CourseTable, {
    fields: [CourseSectionTable.courseId],
    references: [CourseTable.id]
  }),
  lessons: many(LessonTable)
})) 