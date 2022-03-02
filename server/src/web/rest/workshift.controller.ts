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
import { WorkshiftDTO } from '../../service/dto/workshift.dto';
import { WorkshiftService } from '../../service/workshift.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/workshifts')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('workshifts')
export class WorkshiftController {
  logger = new Logger('WorkshiftController');

  constructor(private readonly workshiftEntityService: WorkshiftService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: WorkshiftDTO,
  })
  async getAll(@Req() req: Request): Promise<WorkshiftDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.workshiftEntityService.findAndCount({
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
    type: WorkshiftDTO,
  })
  async getOne(@Param('id') id: number): Promise<WorkshiftDTO> {
    return await this.workshiftEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create workshiftEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: WorkshiftDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() workshiftEntityDTO: WorkshiftDTO): Promise<WorkshiftDTO> {
    const created = await this.workshiftEntityService.save(workshiftEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Workshift', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update workshiftEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: WorkshiftDTO,
  })
  async put(@Req() req: Request, @Body() workshiftEntityDTO: WorkshiftDTO): Promise<WorkshiftDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Workshift', workshiftEntityDTO.id);
    return await this.workshiftEntityService.update(workshiftEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update workshiftEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: WorkshiftDTO,
  })
  async putId(@Req() req: Request, @Body() workshiftEntityDTO: WorkshiftDTO): Promise<WorkshiftDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Workshift', workshiftEntityDTO.id);
    return await this.workshiftEntityService.update(workshiftEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete workshiftEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Workshift', id);
    return await this.workshiftEntityService.deleteById(id);
  }
}
