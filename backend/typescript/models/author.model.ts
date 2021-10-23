import { Column, DataType, Model, Table, BelongsToMany } from "sequelize-typescript";
import Book from "./book.model";
import BookAuthor from "./book_author.model";

@Table({ tableName: "authors" })
export default class Author extends Model {
  @Column({ type: DataType.INT })
  id!: number;

  @Column({ type: DataType.STRING })
  full_name!: string;

  @Column({ type: DataType.STRING })
  display_name?: string;

  @Column({ type: DataType.STRING })
  attribution?: string;

  @BelongsToMany(() => Book, () => BookAuthor)
  books!: Book[];
}
