// import { Task } from 'src/task/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class EmploymentUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 18,
    unique: true,
    comment: '身份证号',
  })
  idCard: string;

  // 银行卡号，唯一
  @Column({
    type: 'varchar',
    comment: '银行卡号',
  })
  bank: string;

  // 姓名
  @Column({
    type: 'varchar',
    length: 50,
    comment: '姓名',
  })
  name: string;

  // 开户行
  @Column({
    type: 'varchar',
    length: 100,
    comment: '开户行',
  })
  bankBranch: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  money: string | null;

  // 开户地
  @Column({
    type: 'varchar',
    length: 200,
    comment: '开户地',
  })
  bankLocation: string;

  // 手机号，唯一
  @Column({
    type: 'varchar',
    length: 11,
    comment: '手机号',
  })
  phone: string;

  // @ManyToOne(() => Task, (task) => task.employments, { onDelete: 'CASCADE' })
  // task: Task;
}
