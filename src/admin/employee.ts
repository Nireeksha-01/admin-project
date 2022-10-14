/*import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IEmployee } from "src/Interface/employeeInterface";

export default class employee{
    constructor(
        
        @InjectModel('Employee') private readonly EmployeeModel: Model<IEmployee>,
       
        
      ) {}

    async getemployee() {
        return this.EmployeeModel.find().exec();
        
}
}
*/