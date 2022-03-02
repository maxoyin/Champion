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
import { FieldAgentDTO } from '../../service/dto/field-agent.dto';
import { FieldAgentService } from '../../service/field-agent.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/field-agents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('field-agents')
export class FieldAgentController {
  logger = new Logger('FieldAgentController');

  constructor(private readonly fieldAgentEntityService: FieldAgentService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: FieldAgentDTO,
  })
  async getAll(@Req() req: Request): Promise<FieldAgentDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.fieldAgentEntityService.findAndCount({
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
    type: FieldAgentDTO,
  })
  async getOne(@Param('id') id: number): Promise<FieldAgentDTO> {
    return await this.fieldAgentEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create fieldAgentEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FieldAgentDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() fieldAgentEntityDTO: FieldAgentDTO): Promise<FieldAgentDTO> {
    const created = await this.fieldAgentEntityService.save(fieldAgentEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FieldAgent', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update fieldAgentEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FieldAgentDTO,
  })
  async put(@Req() req: Request, @Body() fieldAgentEntityDTO: FieldAgentDTO): Promise<FieldAgentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FieldAgent', fieldAgentEntityDTO.id);
    return await this.fieldAgentEntityService.update(fieldAgentEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update fieldAgentEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FieldAgentDTO,
  })
  async putId(@Req() req: Request, @Body() fieldAgentEntityDTO: FieldAgentDTO): Promise<FieldAgentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FieldAgent', fieldAgentEntityDTO.id);
    return await this.fieldAgentEntityService.update(fieldAgentEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete fieldAgentEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'FieldAgent', id);
    return await this.fieldAgentEntityService.deleteById(id);
  }
}
