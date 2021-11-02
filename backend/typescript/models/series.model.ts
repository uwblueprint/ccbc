/* eslint import/no-cycle: 0 */
import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import Book from "./book.model";

@Table({ tableName: "series" })
export default class Series extends Model {
  @Column({ type: DataType.STRING })
  name!: string;

  @HasMany(() => Book)
  books!: Book[];
}
