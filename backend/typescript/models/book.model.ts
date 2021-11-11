/* eslint import/no-cycle: 0 */
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from "sequelize-typescript";
import Author from "./author.model";
import BookAuthor from "./book_author.model";
import BookPublisher from "./book_publisher.model";
import Publisher from "./publisher.model";
import Review from "./review.model";
import Series from "./series.model";
import { Format, Range } from "../services/interfaces/IReviewService";

@Table({ tableName: "books" })
export default class Book extends Model {
  @ForeignKey(() => Review)
  @Column({ type: DataType.INTEGER })
  review_id!: number;

  @Column({ type: DataType.STRING })
  title!: string;

  @ForeignKey(() => Series)
  @Column({ type: DataType.INTEGER })
  series_id?: number;

  @Column({ type: DataType.STRING })
  series_order?: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  illustrator?: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  translator?: string[];

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  formats!: Format[];

  @Column({ type: DataType.RANGE(DataType.INTEGER) })
  age_range!: Range[];

  @BelongsTo(() => Series)
  series!: Series;

  @BelongsTo(() => Review)
  review!: Review;

  @BelongsToMany(() => Author, () => BookAuthor)
  authors!: Author[];

  @BelongsToMany(() => Publisher, () => BookPublisher)
  publishers!: Publisher[];
}
