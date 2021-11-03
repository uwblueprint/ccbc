/* eslint import/no-cycle: 0 */
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from "sequelize-typescript";
import Book from "./book.model";
import BookPublisher from "./book_publisher.model";

@Table({ tableName: "publishers" })
export default class Publisher extends Model {
  @Column({ type: DataType.STRING })
  full_name!: string;

  @Column({ type: DataType.INTEGER })
  publish_year!: number;

  @BelongsToMany(() => Book, () => BookPublisher)
  books!: Book[];
}
