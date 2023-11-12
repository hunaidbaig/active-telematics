import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restricted_number_plate')
export class RestrictedNumberPlate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'license_no' })
  licenseNumber: string;

  @Column({ type: 'text', name: 'status' })
  status: string;

  constructor(numPlate: Partial<RestrictedNumberPlate>) {
    super();
    Object.assign(this, numPlate);
  }
}
