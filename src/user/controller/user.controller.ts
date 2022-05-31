import { ObjectId } from 'mongoose';
import { BaseExceptionFilter } from '../../filter/base-exception-filter';
import {
  CreateUserDto,
  GetManyUserDto,
  UpdateUser,
  UpdateUserDto,
  DeleteManyUserDto,
  DeleteOneUserDto,
  LoginUserDto,
} from './../dto/user.dto';
import {
  Body,
  Controller,
  Post,
  Put,
  UseFilters,
  UsePipes,
  Get,
  Delete,
  Res,
  Param,
  Redirect,
  HttpCode,
  Session,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { BaseValidation } from 'src/validation/base-validation';
import { AuthGuard } from '../guard/auth.guard';

@UsePipes(BaseValidation)
@UseFilters(BaseExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('DTO', dto);
    const newUser = await this.userService.registration(dto);
    res.cookie('refreshToken', newUser.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return newUser;
  }

  @Get('activate/:link')
  @Redirect('http://localhost:3001/', 301)
  async activateAccount(@Param('link') link: string) {
    await this.userService.activateAccount(link);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.userService.login(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return userData;
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const userData = await this.userService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return userData;
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    const userData = await this.userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return userData;
  }

  @UseGuards(AuthGuard)
  @Get('getMany')
  async getMany(@Body() dto: GetManyUserDto) {
    return await this.userService.getMany(dto.ids);
  }

  @Delete('deleteMany')
  async deleteMany(@Body() dto: DeleteManyUserDto) {
    return await this.userService.deleteMany(dto.ids);
  }

  @Delete('delete')
  async deleteOne(@Body() dto: DeleteOneUserDto) {
    return await this.userService.deleteOne(dto.id);
  }

  @Put('update')
  async update(@Body() dto: UpdateUser) {
    return await this.userService.update(dto.id, dto.payload);
  }
}
