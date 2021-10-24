import { Column, DataType, Model, Table, BelongsToMany } from "sequelize-typescript";
import Review from './review.model'
import ReviewTag from './review_tag'
@Table({ tableName: "tags" })
export default class Tag extends Model {
  @Column({ type: DataType.STRING })
  name!: string;

  @BelongsToMany(() => Review, () => ReviewTag)
  reviews: Review[];
}

