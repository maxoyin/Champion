import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { WebNotificationTypeDTO } from '../../service/dto/web-notification-type.dto';
import { WebNotificationTypeService } from '../../service/web-notification-type.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/web-notification-types')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('web-notification-types')
export class WebNotificationTypeController {
  logger = new Logger('WebNotificationTypeController');

  constructor(private readonly webNotificationTypeEntityService: WebNotificationTypeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: WebNotificationTypeDTO,
  })
  async getAll(@Req() req: Request): Promise<WebNotificationTypeDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.webNotificationTypeEntityService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: WebNotificationTypeDTO,
  })
  async getOne(@Param('id') id: number): Promise<WebNotificationTypeDTO> {
    return await this.webNotificationTypeEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create webNotificationTypeEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: WebNotificationTypeDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() webNotificationTypeEntityDTO: WebNotificationTypeDTO): Promise<WebNotificationTypeDTO> {
    const created = await this.webNotificationTypeEntityService.save(webNotificationTypeEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'WebNotificationType', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update webNotificationTypeEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: WebNotificationTypeDTO,
  })
  async put(@Req() req: Request, @Body() webNotificationTypeEntityDTO: WebNotificationTypeDTO): Promise<WebNotificationTypeDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'WebNotificationType', webNotificationTypeEntityDTO.id);
    return await this.webNotificationTypeEntityService.update(webNotificationTypeEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update webNotificationTypeEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: WebNotificationTypeDTO,
  })
  async putId(@Req() req: Request, @Body() webNotificationTypeEntityDTO: WebNotificationTypeDTO): Promise<WebNotificationTypeDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'WebNotificationType', webNotificationTypeEntityDTO.id);
    return await this.webNotificationTypeEntityService.update(webNotificationTypeEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete webNotificationTypeEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'WebNotificationType', id);
    return await this.webNotificationTypeEntityService.deleteById(id);
  }
}
