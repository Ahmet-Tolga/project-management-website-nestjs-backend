import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity({name: 'echos'})
export class EcoEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({name: 'user', type: 'varchar', length: 50})
  user: string

  @Column({name:'message', type: 'varchar', length: 150})
  message: string

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date

  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt: Date

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date
}