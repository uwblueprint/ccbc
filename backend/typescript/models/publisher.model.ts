import { Column, DataType, Model, Table, BelongsToMany } from "sequelize-typescript";
import Book from "./book.model";
import BookPublisher from "./book_publisher.model";

@Table({ tableName: "publishers" })
export default class Publisher extends Model {
  @Column({ type: DataType.INT })
  id!: number;

  @Column({ type: DataType.STRING })
  full_name!: string;

  @Column({ type: DataType.DATE })
  publish_date!: Date;

  @BelongsToMany(() => Book, () => BookPublisher)
  books!: Book[];
}
