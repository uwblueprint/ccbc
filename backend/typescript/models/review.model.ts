/* eslint import/no-cycle: 0 */
// Ignoring no-cycle as per: https://github.com/RobinBuschmann/sequelize-typescript/issues/1085
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Book from "./book.model";
import User from "./user.model";

@Table({ tableName: "reviews" })
export default class Review extends Model {
  @Column({ type: DataType.TEXT })
  body!: string;

  @Column({ type: DataType.STRING })
  byline!: string;

  @Column({ type: DataType.BOOLEAN })
  featured!: boolean;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  created_by_id!: number;

  @Column({ type: DataType.DATE })
  published_at?: Date;

  @HasMany(() => Book)
  books!: Book[];

  @BelongsTo(() => User)
  created_by!: User;
}
