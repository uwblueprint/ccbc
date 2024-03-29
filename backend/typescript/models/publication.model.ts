/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";

@Table({ tableName: "publication" })
export default class Publication extends Model {
  @Column
  title!: string;

  @Column
  publisher!: string;

  @Column
  publication_year!: string;

  @Column
  notes!: string;
}
