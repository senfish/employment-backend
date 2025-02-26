import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpCode,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, basename, parse } from 'path';
import { readFileSync } from 'fs';
import { Request } from 'express';
import axios from 'axios';
import { Public } from 'src/public';

const AK = 's0kAIYeWnJVDQEvdqJK7AzkN';
const SK = 'TXRNPmV22Fck0zlq2zf1JyNS08CH76U0';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads', // 上传文件存储的目录
  //       filename: (req, file, cb) => {
  //         const { name } = parse(file.originalname);
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         // return cb(null, file.originalname);
  //         return cb(null, `${name}-${randomName}${extname(file.originalname)}`); // 生成唯一的文件名
  //       },
  //     }),
  //   }),
  // )
  @HttpCode(200)
  @Public()
  @Post('/bank')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBankFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    const { type } = body;
    function getAccessToken() {
      const options = {
        method: 'POST',
        url:
          'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' +
          AK +
          '&client_secret=' +
          SK,
      };
      return new Promise((resolve, reject) => {
        axios(options)
          .then((res) => {
            resolve(res.data.access_token);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    const options = {
      method: 'POST',
      url:
        'https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard?access_token=' +
        (await getAccessToken()),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      data: {
        // image: getFileContentAsBase64(),
        image: file.buffer.toString('base64'),
        location: 'false',
        detect_quality: 'false',
      },
      // image 可以通过 getFileContentAsBase64("C:\fakepath\yuanyuan.jpg") 方法获取,
    };
    const res = await axios(options);
    return {
      code: '200',
      data: {
        bankCardType: res?.data?.result?.bank_card_type,
        bankName: res?.data?.result?.bank_name,
        bank: res?.data?.result?.bank_card_number,
      },
      message: 'success',
    };
  }

  @HttpCode(200)
  @Post('/id-card')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadIDCardFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    const { type } = body;
    function getAccessToken() {
      const options = {
        method: 'POST',
        url:
          'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' +
          AK +
          '&client_secret=' +
          SK,
      };
      return new Promise((resolve, reject) => {
        axios(options)
          .then((res) => {
            resolve(res.data.access_token);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    const options = {
      method: 'POST',
      url:
        'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' +
        (await getAccessToken()),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      data: {
        id_card_side: 'front',
        // location: "false",
        // detect_ps: "false",
        // detect_risk: "false",
        // detect_quality: "false",
        // detect_photo: "false",
        // detect_card: "false",
        // detect_direction: "false",
        image: file.buffer.toString('base64'),
      },
    };
    const res = await axios(options);
    return {
      code: '200',
      data: {
        idCard: res.data?.words_result?.['公民身份号码']?.words,
        name: res.data?.words_result?.['姓名']?.words,
      },
      message: 'success',
    };
  }
}
