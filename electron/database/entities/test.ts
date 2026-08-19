// test 表对应的实体定义（TypeORM 用装饰器把类和数据库表对应起来）
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('test')
export class TestEntity {
  /**
   * id
   */
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ default: '' })
  title!: string

  @Column({ type: 'text', default: '' })
  content!: string
}
