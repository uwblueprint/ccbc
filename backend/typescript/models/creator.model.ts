/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user.model";

@Table({ tableName: "creator" })
export default class Creator extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id!: number;

  @Column
  location!: string;

  @Column
  rate!: number;

  @Column
  genre!: string;

  @Column
  age_range!: string;

  @Column
  timezone!: string;

  @Column
  bio!: string;

  @Column
  is_approved!: boolean;
}
