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
import { IncidentDTO } from '../../service/dto/incident.dto';
import { IncidentService } from '../../service/incident.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/incidents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('incidents')
export class IncidentController {
  logger = new Logger('IncidentController');

  constructor(private readonly incidentEntityService: IncidentService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: IncidentDTO,
  })
  async getAll(@Req() req: Request): Promise<IncidentDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.incidentEntityService.findAndCount({
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
    type: IncidentDTO,
  })
  async getOne(@Param('id') id: number): Promise<IncidentDTO> {
    return await this.incidentEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create incidentEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: IncidentDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() incidentEntityDTO: IncidentDTO): Promise<IncidentDTO> {
    const created = await this.incidentEntityService.save(incidentEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Incident', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update incidentEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: IncidentDTO,
  })
  async put(@Req() req: Request, @Body() incidentEntityDTO: IncidentDTO): Promise<IncidentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Incident', incidentEntityDTO.id);
    return await this.incidentEntityService.update(incidentEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update incidentEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: IncidentDTO,
  })
  async putId(@Req() req: Request, @Body() incidentEntityDTO: IncidentDTO): Promise<IncidentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Incident', incidentEntityDTO.id);
    return await this.incidentEntityService.update(incidentEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete incidentEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Incident', id);
    return await this.incidentEntityService.deleteById(id);
  }
}
