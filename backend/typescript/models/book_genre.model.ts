/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import Book from "./book.model";
import Genre from "./genre.model";

@Table({ tableName: "book_publisher" })
export default class BookGenre extends Model {
  @ForeignKey(() => Genre)
  @Column({ type: DataType.INTEGER })
  genre_id!: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  book_id!: number;
}
