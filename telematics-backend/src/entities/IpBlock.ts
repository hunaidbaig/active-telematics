import { instanceToPlain } from 'class-transformer';
import { Length } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('ip-block')
export class IpBlock extends BaseEntity {

    constructor(ip: Partial<IpBlock>) {
        super();
        Object.assign(this, ip);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 70, nullable: true })
    @Length(0, 70)
    ip: string;


}