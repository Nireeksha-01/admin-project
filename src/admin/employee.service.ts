import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { EmployeeDto } from 'src/EmployeeDto';
import { kMaxLength } from 'buffer';
// import { EmployeeDto } from '../EmployeeDto';
import { JwtService } from '@nestjs/jwt';
import { employeeDocument } from 'src/Schema/employee_schema';

@Injectable()
export default class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly EmployeeModel: Model<employeeDocument>,
    private jwtService:JwtService
  ) {}

  async getemployee(req) {
    try {
      const ver = this.jwtService.verify(req.cookies.admonlogoutcookie);
      console.log(ver);
      if (!ver) {
        throw new HttpException('Unauthorized admin User error ', 401);
      }
      return this.EmployeeModel.find().exec();
    } catch (error) {
      console.log(error)
      throw new HttpException('Login again ,Admin user Not found', 404);
    }
    
}
async getEmployeeByEmail(req,Id: string,res) {
  try {
    console.log('service', Id);
    const ver = this.jwtService.verify(req.cookies.admonlogoutcookie);
    console.log(ver);
    if (!ver) {
      throw new HttpException('Unauthorized admin User error ', 401);
    }
    const existUser = await this.EmployeeModel.findOne({
      email: Id,
    }).exec();
    console.log(existUser);
    if (!existUser) {
      throw new HttpException('Invalid User Id', 404);
  }
  res.status(200).json({
    message: `Details of employee with email id ${Id}`,
    result: existUser,
  });
} catch (error) {
  throw new HttpException('Login again ,Admin user Not found', 404);
}
}
async updateEmployee(req, res, Email: string, employeeDto: EmployeeDto) {
  try {
    const ver = this.jwtService.verify(req.cookies.admonlogoutcookie);
    console.log(ver);
    if (!ver) {
      throw new HttpException('Unauthorized admin User error ', 401);
    }
    const existUser = await this.EmployeeModel.findOneAndUpdate(
      { email: Email },
      { role: employeeDto.role, salary: employeeDto.salary },
    );

    if (!existUser) {
      throw new HttpException('Invalid User Email', 404);
    }
    res.status(200).json({
      message: `updated successfully of employee with ${Email}`,
    });
  } catch (error) {
    throw new HttpException('Login again ,Admin user Not found', 404);
  }
}
async DeleteEmployee(req, res, Email: string) {
  try {
    const ver = this.jwtService.verify(req.cookies.admonlogoutcookie);
    console.log(ver);
    if (!ver) {
      throw new HttpException('Unauthorized admin User error ', 401);
    }
    const existUser = await this.EmployeeModel.deleteOne({
      email: Email,
    });

    if (!existUser) {
      throw new HttpException('Invalid User Email', 404);
    }
    res.status(200).json({
      message: `Deleted successfully of employee with ${Email}`,
    });
  } catch (error) {
    throw new HttpException('Login again ,Admin user Not found', 404);
  }
}
    
}