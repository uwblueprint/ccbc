/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from "sequelize-typescript";
import Book from "./book.model";
import BookGenre from "./book_genre.model";

@Table({ tableName: "genres" })
export default class Genre extends Model {
  @Column({ type: DataType.STRING })
  name!: string;

  @BelongsToMany(() => Book, () => BookGenre)
  books!: Book[];
}
