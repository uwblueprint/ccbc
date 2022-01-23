/* eslint import/no-cycle: 0 */

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "../types";
import Review from "./review.model";

@Table({ tableName: "users" })
export default class User extends Model {
  @Column({ type: DataType.STRING })
  auth_id!: string;

  @Column({ type: DataType.ENUM("Admin", "Subscriber", "Author") })
  role_type!: Role;

  @Column({ type: DataType.STRING })
  first_name!: string;

  @Column({ type: DataType.STRING })
  last_name!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.BOOLEAN })
  active!: boolean;

  @HasMany(() => Review)
  reviews!: Review[];
}
