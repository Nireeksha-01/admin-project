import { Controller,Get,Post,Res,Body, Req, Param,  Patch, Delete, HttpStatus } from '@nestjs/common';
import { AdminDto } from 'src/AdminDto';
import { EmployeeDto } from 'src/EmployeeDto';

//import { EmployeeService } from '../employee/employee.module';
import { AdminService } from './admin.service';
import EmployeeService from './employee.service';
//import {employee} from './employee'

@Controller('admin')
export class AdminController {
    
    constructor (
        private adminService:AdminService,private employeeService:EmployeeService
        
    ){}
    @Post()
  async cemp( @Res() res , @Body() adminDto: AdminDto) {
    
    res.status(201).json({
        message: 'Successfully Added Admin',
        result: await this.adminService.cemp(adminDto),

      });
  }
  @Post('login')
  async loginAdmin(@Res() res, @Body() adminDto: AdminDto) {
    res.status(200).json({
      message: 'Logined Succesfully',
      result: await this.adminService.loginAdmin(adminDto,res),
    });
  }
  @Post('logout')
  public async logout( @Res() res) {
    return this.adminService.logout(res);
  }
  
  @Get('employee')
 async getemployee(@Req() req,@Res() res){
  res.status(200).json({
    message:'Employee Details',
    result:await this.employeeService.getemployee(req)
  })
  
 }
 @Get('/employee/:email')
 async getEmployeeByEmail(@Req() req, @Res() res, @Param('email') Id: string) {
  console.log('Controller', Id);
  return this.employeeService.getEmployeeByEmail(req, Id, res);
  
  }
  @Patch('/employee/updatebyemail/:email')
  async updateEmployee(@Req() req ,@Res() res,@Param('email') Email:string, @Body() employeeDto:EmployeeDto)
  {
       return this.employeeService.updateEmployee(req, res ,Email ,employeeDto);
    }

    @Delete('/employee/deletebyemail/:email')
  async DeleteEmployee(@Req() req, @Res() res, @Param('email') email: string) {
    return this.employeeService.DeleteEmployee(req, res, email);
  }
  }
  
    
  


  


