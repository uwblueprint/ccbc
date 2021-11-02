/* eslint import/no-cycle: 0 */
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import Author from "./author.model";
import Book from "./book.model";

@Table({ tableName: "book_author" })
export default class BookAuthor extends Model {
  @ForeignKey(() => Author)
  @Column({ type: DataType.INT })
  author_id!: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INT })
  book_id!: number;
}
