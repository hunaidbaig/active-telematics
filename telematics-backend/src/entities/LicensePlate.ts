import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('license_plates')
export class LicensePlate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'frame_no' })
  frameNo: number;

  @Column({ type: 'int', name: 'car_id' })
  carId: number;

  @Column({ type: 'numeric', array: true, name: 'car_bbox' })
  carBbox: number[];

  @Column({ type: 'numeric', array: true, name: 'license_plate_bbox' })
  licensePlateBbox: number[];

  @Column({ type: 'float', name: 'license_plate_bbox_score' })
  licensePlateBboxScore: number;

  @Column({ type: 'text', name: 'license_number' })
  licenseNumber: string;

  @Column({ type: 'float', name: 'license_number_score' })
  licenseNumberScore: number;

  @Column({ type: 'timestamp', name: 'processed_time' })
  processedTime: Date;

  @Column({ type: 'text', name: 'image' })
  image: string;

  constructor(numPlate: Partial<LicensePlate>) {
    super();
    Object.assign(this, numPlate);
  }
}
