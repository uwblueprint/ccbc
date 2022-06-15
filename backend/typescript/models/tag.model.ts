/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  PrimaryKey,
} from "sequelize-typescript";
import Book from "./book.model";
import BookTag from "./book_tag.model";

@Table({ tableName: "tags" })
export default class Tag extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  name!: string;

  @BelongsToMany(() => Book, () => BookTag)
  books!: Book[];
}
