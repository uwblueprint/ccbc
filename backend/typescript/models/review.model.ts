/* eslint import/no-cycle: 0 */
// Ignoring no-cycle as per: https://github.com/RobinBuschmann/sequelize-typescript/issues/1085
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import Tag from "./tag.model";
import ReviewTag from "./review_tag.model";
import Book from "./book.model";
// import User from "./user.model";

@Table({ tableName: "reviews" })
export default class Review extends Model {
  @Column({ type: DataType.TEXT })
  body!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  cover_images!: string[];

  @Column({ type: DataType.STRING })
  byline!: string;

  @Column({ type: DataType.BOOLEAN })
  featured!: boolean;

  // @TODO: uncomment when chrisine finishes user models
  //  @Column({ type: DataType.INTEGER })
  //  @ForeignKey(() => User)
  //  created_by!: number;

  @Column({ type: DataType.DATE })
  published_at!: Date;

  @BelongsToMany(() => Tag, () => ReviewTag)
  tags!: Tag[];

  @HasMany(() => Book)
  books!: Book[];
}
