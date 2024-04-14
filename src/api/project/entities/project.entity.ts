import { MaxLength, MinLength } from "class-validator";
import { AfterRemove, BeforeInsert, BeforeRemove, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transform,TransformFnParams } from "class-transformer";
import moment,{MomentInput} from "moment"
import { userEntity } from "src/api/user/entity/userEntity.entity";

@Entity({ name: "projects" })
export class ProjectEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @MaxLength(30)
    @Column({ name: "project_name", type: "varchar", nullable: false })
    projectName: string;

    @MaxLength(30)
    @MinLength(5)
    @Column({ name: "description", type: "varchar", nullable: true })
    description: string;

    @Column({name:"projectImage",type:"bytea",nullable:true})
    projectImage:Buffer;

    @Column({ name: "progres", default: 0 })
    progres: number;

    @ManyToMany(()=>userEntity,(user)=>user.developingProjects)
    @JoinTable()
    developingBy:userEntity[];

    @Column({name:"fieldManagerId",nullable:true})
    fieldManagerId:string;

    @ManyToOne(()=>userEntity,(user)=>user.responsibleProjects,{onDelete:"SET NULL"})
    @JoinColumn({name:"fieldManagerId"})
    fieldManager:userEntity;
    

    @Transform((params: TransformFnParams) => {
        const startTime: MomentInput = params.value;
        return moment(startTime).format('YYYY-MM-DDTHH:mm');
    })
    @Column({name:"start_time",type:"date",nullable:true})
    startTime:Date;

    @Transform((params: TransformFnParams) => {
        const endTime: MomentInput = params.value;
        return moment(endTime).format('YYYY-MM-DDTHH:mm');
    })
    @Column({name:"end_time",type:"date",nullable:true})
    endTime:Date;
    
    
    @CreateDateColumn({name:"created_at",type:"date"})
    createdAt: Date;

    
    @DeleteDateColumn({name:"deleted_at",type:"date"})
    deletedAt:Date;


    @UpdateDateColumn({name:"updated_at",type:"date"})
    updatedAt:Date;
}