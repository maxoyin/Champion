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
import { ChampionStatusHistoryDTO } from '../../service/dto/champion-status-history.dto';
import { ChampionStatusHistoryService } from '../../service/champion-status-history.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/champion-status-histories')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('champion-status-histories')
export class ChampionStatusHistoryController {
  logger = new Logger('ChampionStatusHistoryController');

  constructor(private readonly championStatusHistoryEntityService: ChampionStatusHistoryService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ChampionStatusHistoryDTO,
  })
  async getAll(@Req() req: Request): Promise<ChampionStatusHistoryDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.championStatusHistoryEntityService.findAndCount({
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
    type: ChampionStatusHistoryDTO,
  })
  async getOne(@Param('id') id: number): Promise<ChampionStatusHistoryDTO> {
    return await this.championStatusHistoryEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create championStatusHistoryEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ChampionStatusHistoryDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() championStatusHistoryEntityDTO: ChampionStatusHistoryDTO): Promise<ChampionStatusHistoryDTO> {
    const created = await this.championStatusHistoryEntityService.save(championStatusHistoryEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionStatusHistory', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update championStatusHistoryEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChampionStatusHistoryDTO,
  })
  async put(@Req() req: Request, @Body() championStatusHistoryEntityDTO: ChampionStatusHistoryDTO): Promise<ChampionStatusHistoryDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionStatusHistory', championStatusHistoryEntityDTO.id);
    return await this.championStatusHistoryEntityService.update(championStatusHistoryEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update championStatusHistoryEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChampionStatusHistoryDTO,
  })
  async putId(@Req() req: Request, @Body() championStatusHistoryEntityDTO: ChampionStatusHistoryDTO): Promise<ChampionStatusHistoryDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionStatusHistory', championStatusHistoryEntityDTO.id);
    return await this.championStatusHistoryEntityService.update(championStatusHistoryEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete championStatusHistoryEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ChampionStatusHistory', id);
    return await this.championStatusHistoryEntityService.deleteById(id);
  }
}
