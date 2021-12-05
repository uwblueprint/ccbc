import { RangeDataType, IntegerDataType } from "sequelize/types";

export interface Range extends RangeDataType<IntegerDataType> {
  value: number;
  inclusive: boolean;
}
