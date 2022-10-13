/* eslint import/no-cycle: 0 */
// Ignoring no-cycle as per: https://github.com/RobinBuschmann/sequelize-typescript/issues/1085
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import Creator from "./creator.model";

@Table({ tableName: "creator_bookings" })
export default class CreatorBooking extends Model {
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Creator)
  creatorId!: number;

  @Column({ type: DataType.STRING })
  name!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.DATE })
  date!: string;

  @Column({ type: DataType.BOOLEAN })
  isTentative?: boolean;

  @Column({ type: DataType.BOOLEAN })
  isOneDay?: boolean;

  @Column({ type: DataType.STRING })
  ageGroup!: string;

  @Column({ type: DataType.INTEGER })
  audienceSize!: number;

  @Column({ type: DataType.STRING })
  subject!: string;

  @Column({ type: DataType.TEXT })
  message!: string;
}
