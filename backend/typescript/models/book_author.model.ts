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
  @Column({ type: DataType.INTEGER })
  author_id!: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  book_id!: number;
}
