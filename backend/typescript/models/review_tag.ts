import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import Tag from "./tag.model";
import Review from "./review.model";

@Table({ tableName: "review_tag" })
export default class ReviewTag extends Model {
  @ForeignKey(() => Review)
  @Column({ type: DataType.INTEGER })
  review_id!: number;

  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER })
  tag_id!: number;
}
