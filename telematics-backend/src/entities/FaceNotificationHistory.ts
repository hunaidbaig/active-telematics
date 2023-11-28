import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('face_notification_history')
export class FaceNotificationHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'name' })
  name: string;

  @Column({ type: 'decimal', array: true, name: 'embedding' })
  embedding: Number[];
  
  @Column({ type: 'timestamp', name: 'processed_time' })
  processed_time: Date;

  @Column({ type: 'bool', name: 'is_detected' })
  is_detected: Boolean;

  @Column({ type: 'varchar', array: true, name: 'detected_frame' })
  detected_frame: string[];

  @Column({ type: 'timestamp', array: true, name: 'detected_timestamp' })
  detected_timestamp: Date[];

  @Column({ type: 'text', name: 'status' })
  status: string;

  constructor(face: Partial<FaceNotificationHistory>) {
    super();
    Object.assign(this, face);
  }
}