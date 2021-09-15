import { Column, Model, Table, DataType } from "sequelize-typescript";

import { Letters } from "../types";

@Table({ tableName: "entities" })
export default class Entity extends Model {
  @Column
  string_field!: string;

  @Column
  int_field!: number;

  @Column({ type: DataType.ENUM("A", "B", "C", "D") })
  enum_field!: Letters;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  string_array_field!: string[];

  @Column
  bool_field!: boolean;

  @Column
  file_name!: string;
}

