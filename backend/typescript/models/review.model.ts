import { Column, DataTypes, Model, Table, CreatedAt, UpdatedAt, ForeignKey } from "sequelize-typescript";
import User from './user.model'

@Table({ tableName: "reviews" })
export default class Review extends Model {
    @Column({ type: DataTypes.STRING })
    body!: string;

    @Column({ type: DataTypes.ARRAY(DataTypes.STRING)})
    cover_images!: string[]

    @Column({ type: DataTypes.STRING })
    byline!: string;

    @Column({ type: DataTypes.BOOLEAN })
    featured!: boolean;

    @Column({ type: DataTypes.INT})
    @ForeignKey(() => User)
    created_by!: number;
    
    @CreatedAt
    @Column
    created_at!: Date;

    @UpdatedAt
    @Column
    updated_at!: Date;
}