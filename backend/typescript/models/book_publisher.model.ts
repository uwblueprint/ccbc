/* eslint import/no-cycle: 0 */
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import Book from "./book.model";
import Publisher from "./publisher.model";

@Table({ tableName: "book_publisher" })
export default class BookPublisher extends Model {
  @ForeignKey(() => Publisher)
  @Column({ type: DataType.INT })
  publisher_id!: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INT })
  book_id!: number;
}
