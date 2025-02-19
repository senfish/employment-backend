// import { Employment } from 'src/employment/entities/employment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Task {
  // 主键，自动生成
  @PrimaryGeneratedColumn()
  id: number;

  // 任务名称，varchar(50) 类型的字符串
  @Column({ type: 'varchar', length: 50 })
  taskName: string;

  // 填写人数，number 类型
  @Column({ type: 'int' })
  amount: number;

  // 是否过期，boolean 类型
  @Column({ type: 'boolean', default: false })
  isExpired: boolean;

  // @OneToMany(() => Employment, (employment) => employment.task)
  // employments: Employment[];

  // 创建时间，自动记录创建时的时间戳
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // 更新时间，自动记录更新时的时间戳
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
