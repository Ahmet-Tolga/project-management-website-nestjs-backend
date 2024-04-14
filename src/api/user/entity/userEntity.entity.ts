import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "src/api/project/entities/project.entity";

@Entity()
export class userEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name:"email",type:"varchar"})
    email: string;

    @Column({name:"username",type:"varchar"})
    username: string;

    @Column({name:"password",type:"varchar"})
    password: string;

    @OneToMany(() => ProjectEntity, (project) => project.fieldManager)
    responsibleProjects: ProjectEntity[];

    @ManyToMany(() => ProjectEntity, (projects) => projects.developingBy)
    developingProjects: ProjectEntity[];
}
