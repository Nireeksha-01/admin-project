
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type employeeDocument = employee & Document;

@Schema()
export class employee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true })
role: string;

  @Prop({ default: false })
  leave: boolean;
}
export const EmployeeSchema = SchemaFactory.createForClass(employee);

export type adminDocument = admin & Document;

@Schema()
export class admin {
  @Prop({ required: true })
  adminname: string;

  @Prop({ required: true })
  password: string;

}
export const AdminSchema = SchemaFactory.createForClass(admin);



/*export const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, require: true,unique:true },
  name: String,
  email: { type: String, require: true },
  password: String,
  phonenumber: Number,
  salary: Number,
  role: String,
});

export const AdminSchema = new mongoose.Schema({
    adminname: { type: String, require: true },
    password: String,
    
  });
  */