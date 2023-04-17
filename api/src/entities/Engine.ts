import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Engine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  reference: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column()
  availability: boolean;

  @Column("text")
  description: string;

  @Column({ type: "varchar" })
  imageUrl: string;
}
