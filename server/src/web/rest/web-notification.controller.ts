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
import { WebNotificationDTO } from '../../service/dto/web-notification.dto';
import { WebNotificationService } from '../../service/web-notification.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/web-notifications')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('web-notifications')
export class WebNotificationController {
  logger = new Logger('WebNotificationController');

  constructor(private readonly webNotificationEntityService: WebNotificationService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: WebNotificationDTO,
  })
  async getAll(@Req() req: Request): Promise<WebNotificationDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.webNotificationEntityService.findAndCount({
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
    type: WebNotificationDTO,
  })
  async getOne(@Param('id') id: number): Promise<WebNotificationDTO> {
    return await this.webNotificationEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create webNotificationEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: WebNotificationDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() webNotificationEntityDTO: WebNotificationDTO): Promise<WebNotificationDTO> {
    const created = await this.webNotificationEntityService.save(webNotificationEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'WebNotification', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update webNotificationEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: WebNotificationDTO,
  })
  async put(@Req() req: Request, @Body() webNotificationEntityDTO: WebNotificationDTO): Promise<WebNotificationDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'WebNotification', webNotificationEntityDTO.id);
    return await this.webNotificationEntityService.update(webNotificationEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update webNotificationEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: WebNotificationDTO,
  })
  async putId(@Req() req: Request, @Body() webNotificationEntityDTO: WebNotificationDTO): Promise<WebNotificationDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'WebNotification', webNotificationEntityDTO.id);
    return await this.webNotificationEntityService.update(webNotificationEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete webNotificationEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'WebNotification', id);
    return await this.webNotificationEntityService.deleteById(id);
  }
}
