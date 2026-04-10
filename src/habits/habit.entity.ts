import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity() // This decorator tells NestJS this class is a DB table
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // New: Implementing Field-Level Encryption for Focus Bear security requirements
  // The transformer automatically encrypts data before 'Save' and decrypts after 'Find'
  @Column({
    type: 'varchar',
    nullable: true,
    transformer: new EncryptionTransformer({
      // Security Best Practice: Use environment variables, never hardcode keys
      key: process.env.thisisYarinsaSukhontharat1234567!, // This must be exactly 32 characters for AES-256
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: process.env.imsohungryrn1234!, // Initialization Vector for randomization
    }),
  })
  privateNote: string;

  @Column({ default: false })
  isCompleted: boolean;
}