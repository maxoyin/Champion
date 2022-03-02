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
import { IncidentTypeDTO } from '../../service/dto/incident-type.dto';
import { IncidentTypeService } from '../../service/incident-type.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/incident-types')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('incident-types')
export class IncidentTypeController {
  logger = new Logger('IncidentTypeController');

  constructor(private readonly incidentTypeEntityService: IncidentTypeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: IncidentTypeDTO,
  })
  async getAll(@Req() req: Request): Promise<IncidentTypeDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.incidentTypeEntityService.findAndCount({
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
    type: IncidentTypeDTO,
  })
  async getOne(@Param('id') id: number): Promise<IncidentTypeDTO> {
    return await this.incidentTypeEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create incidentTypeEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: IncidentTypeDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() incidentTypeEntityDTO: IncidentTypeDTO): Promise<IncidentTypeDTO> {
    const created = await this.incidentTypeEntityService.save(incidentTypeEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'IncidentType', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update incidentTypeEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: IncidentTypeDTO,
  })
  async put(@Req() req: Request, @Body() incidentTypeEntityDTO: IncidentTypeDTO): Promise<IncidentTypeDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'IncidentType', incidentTypeEntityDTO.id);
    return await this.incidentTypeEntityService.update(incidentTypeEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update incidentTypeEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: IncidentTypeDTO,
  })
  async putId(@Req() req: Request, @Body() incidentTypeEntityDTO: IncidentTypeDTO): Promise<IncidentTypeDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'IncidentType', incidentTypeEntityDTO.id);
    return await this.incidentTypeEntityService.update(incidentTypeEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete incidentTypeEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'IncidentType', id);
    return await this.incidentTypeEntityService.deleteById(id);
  }
}
