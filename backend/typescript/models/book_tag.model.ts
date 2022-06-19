/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import Tag from "./tag.model";
import Book from "./book.model";

@Table({ tableName: "book_tag" })
export default class BookTag extends Model {
  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  book_id!: number;

  @ForeignKey(() => Tag)
  @Column({ type: DataType.STRING })
  tag_name!: String;
}
