import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class NestAuthUserEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public username: string;

	@Column()
	public password: string;
}
