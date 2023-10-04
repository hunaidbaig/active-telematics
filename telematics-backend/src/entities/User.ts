import { Exclude, instanceToPlain } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import bcrypt from 'bcrypt';


@Entity('user')
    export class User extends BaseEntity {

    @PrimaryColumn({ type: 'varchar', length: 50 })
    @Length(3, 50)
    username: string;

    @Column({ type: 'varchar', length: 70, nullable: true })
    @IsEmail()  
    @Length(0, 70)
    email: string;

    @Column({ type: 'varchar', length: 11, nullable: true }) 
    @Length(0, 11)
    number: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    @Exclude()
    @Length(6, 20)
    password: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    @Length(0, 50)
    key: string;


    toJSON() {
        return instanceToPlain(this);
    }

    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6);
    }
}