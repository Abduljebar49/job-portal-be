import {Table, Model, Column} from 'sequelize-typescript';

@Table 
export class Blog extends Model{
    @Column
    image:string;

    @Column
    title:string;

    @Column
    description:string;

    @Column({defaultValue:new Date()})
    date:Date;

    @Column
    tags:string;

    @Column
    category:string;

    @Column
    key:string;

    @Column
    author:string;

}