/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user.model";
import Presentation from "./presentation.model";
import Publication from "./publication.model";

@Table({ tableName: "creator" })
export default class Creator extends Model {
  // TODO: Should we add a foreign key for the presentations and publications?
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id!: number;

  @Column
  location!: string;

  @Column
  rate!: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  genre!: string[];

  @Column
  age_range!: string;

  @Column
  timezone!: string;

  @Column
  bio!: string;

  @Column
  is_approved!: boolean;

  // Calder W: new columns
  @Column
  first_name!: string;
  
  @Column
  last_name!: string;
  
  @Column
  email!: string;
  
  @Column
  phone!: string;
  
  @Column
  street_address!: string;
  
  @Column
  city!: string;
  
  @Column
  province!: string;
  
  @Column
  postal_code!: string;
  
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  craft!: string[];
  
  @Column
  website!: string;
  
  @Column
  profile_picture_link!: string;
  
  @Column
  availability!: string;
  
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  book_covers!: string[];
  
  @Column
  isReadyForReview!: boolean;
  
  @Column({ type: DataType.ARRAY(DataType.JSON) })
  presentations!: Presentation[];
  
  @Column({ type: DataType.ARRAY(DataType.JSON) })
  publications!: Publication[];
}
