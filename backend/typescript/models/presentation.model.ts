/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";

@Table({ tableName: "presentation" })
export default class Presentation extends Model {
  @Column
  name!: string;

  @Column
  locations!: string;

  @Column
  age_groups!: string;

  @Column
  audience_size!: string;

  @Column
  is_in_person!: boolean;

  @Column
  in_person_rate!: number;

  @Column
  is_virtual!: boolean;

  @Column
  virtual_rate!: number;

  @Column
  special_equipment!: string;

  @Column
  languages!: string;

  @Column
  is_bringing!: boolean;

  @Column
  details!: string;

  @Column
  photos!: string;
}
