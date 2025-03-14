import {pgTable, text, integer, pgEnum} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelp"
import { CourseProductTable } from "./courseProducts"
import { relations } from "drizzle-orm"

export const productStatuses = ["public", "private"] as const
export type productStatus = (typeof productStatuses)[number]
export const productStatusEnum = pgEnum("product_status", productStatuses)

export const ProductTable = pgTable("courses", {
  id: id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(), 
  status: productStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt
})

export const ProductRelationships = relations(ProductTable, ({many}) => ({
  courseProducts: many(CourseProductTable)
}))