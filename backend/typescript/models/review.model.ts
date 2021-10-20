import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, ForeignKey } from "sequelize-typescript";
import User from './user.model'

@Table({ tableName: "reviews" })
export default class Review extends Model {
    @Column({ type: DataType.STRING })
    body!: string;

    @Column({ type: DataType.ARRAY(DataType.STRING)})
    cover_images!: string[]

    @Column({ type: DataType.STRING })
    byline!: string;

    @Column({ type: DataType.BOOLEAN })
    featured!: boolean;

    @Column({ type: DataType.INTEGER})
    @ForeignKey(() => User)
    created_by!: number;

    @Column({ type: DataType.DATE})
    published_at!: Date;
}