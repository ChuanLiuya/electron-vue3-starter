import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cat')
export class CatEntity {
  /**
   * id
   */
  @PrimaryGeneratedColumn()
  id!: number
  /**
   * 名字
   */
  @Column()
  name!: string
  /**
   * 年龄
   */
  @Column()
  age!: number
  /**
   * 品种
   */
  @Column()
  breeds!: string
}
