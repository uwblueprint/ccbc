import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "tag" })
export default class Tag extends Model {
  @Column({ type: DataType.STRING })
  name!: string;
}
