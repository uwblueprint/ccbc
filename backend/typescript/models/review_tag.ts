import {
  Column,
  DataType,
  Model,
  Table,
  ForeginKey,
} from "sequelize-typescript";
import Tag from "./tag.model";
import Review from "./review.model";

@Table({ tableName: "review_tag" })
export default class ReviewTag extends Model {
  @ForeginKey(() => Review)
  @Column({ type: DataType.INTEGER })
  review_id!: number;

  @ForeginKey(() => Tag)
  @Column({ type: DataType.INTEGER })
  tag_id!: number;
}
