import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import Book from "./books.model";

@Table({ tableName: "series" })
export default class Series extends Model {
  @Column({ type: DataType.INT })
  id!: number;

  @Column({ type: DataType.STRING })
  review_id!: string;

  @HasMany(() => Book)
  books!: Book[];
}
