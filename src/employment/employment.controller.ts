import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  Res,
} from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { EmploymentListDto } from './dto/employment-list.dto';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { EmploymentUser } from './entities/employment.entity';

@Controller('employment')
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) {}

  @HttpCode(200)
  @Post('/create')
  async create(@Body() createEmploymentDto: CreateEmploymentDto) {
    await this.employmentService.create(createEmploymentDto);
    return {
      code: '200',
      data: {},
      message: 'success',
    };
  }

  @Get('/list')
  async findAll(@Query() query: EmploymentListDto) {
    return {
      code: '200',
      data: await this.employmentService.list(query),
      message: 'success',
    };
  }

  @HttpCode(200)
  @Delete('/delete')
  async remove(@Body('id') id: number) {
    return {
      code: '200',
      data: await this.employmentService.remove(id),
      message: 'success',
    };
  }

  @Get('/export')
  async export(@Res() res: Response) {
    const allList = await this.employmentService.findAll();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = [
      {
        header: '序号',
        key: 'No',
        width: 10,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '姓名',
        key: 'name',
        width: 10,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '银行账户',
        key: 'bank',
        width: 20,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '开户地',
        key: 'bankLocation',
        width: 10,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '开户行',
        key: 'bankBranch',
        width: 20,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '金额',
        key: 'money',
        width: 10,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '身份证号码',
        key: 'idCard',
        width: 20,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '电话号码',
        key: 'phone',
        width: 15,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '签名',
        key: 'sign',
        width: 10,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
      {
        header: '备注',
        key: 'remarks',
        width: 10,
        style: {
          alignment: { horizontal: 'center', vertical: 'middle' },
        },
      },
    ];

    worksheet.mergeCells('A1:J1');
    const mergedCell = worksheet.getCell('A1');
    mergedCell.value = '龙华西路90弄项目  2024年 8月粉刷严建华班组工资发放表';
    mergedCell.alignment = { horizontal: 'center', vertical: 'middle' };
    mergedCell.font = { bold: true, size: 14 };
    mergedCell.border = {
      bottom: { style: 'thin', color: { argb: '000000' } },
      right: { style: 'thin', color: { argb: '000000' } },
    };

    const column = {
      No: '序号',
      name: '姓名',
      bank: '银行账户',
      bankLocation: '开户地',
      bankBranch: '开户行',
      money: '金额',
      idCard: '身份证号码',
      phone: '电话号码',
      sign: '签名',
      remarks: '备注',
    };
    const rowColumn = worksheet.addRow(column);
    rowColumn.eachCell({ includeEmpty: false }, (cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    allList.forEach((item, index) => {
      const rows = worksheet.addRow({
        No: index + 1,
        name: item.name,
        bank: item.bank,
        bankLocation: item.bankLocation,
        bankBranch: item.bankBranch,
        money: item?.money,
        idCard: item.idCard,
        phone: item.phone,
        sign: '',
        remarks: '',
      });
      rows.eachCell({ includeEmpty: false }, (cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    // 设置响应头
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  }
}
