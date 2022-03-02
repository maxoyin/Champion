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
import { ChampionStatusChangeReasonDTO } from '../../service/dto/champion-status-change-reason.dto';
import { ChampionStatusChangeReasonService } from '../../service/champion-status-change-reason.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/champion-status-change-reasons')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('champion-status-change-reasons')
export class ChampionStatusChangeReasonController {
  logger = new Logger('ChampionStatusChangeReasonController');

  constructor(private readonly championStatusChangeReasonEntityService: ChampionStatusChangeReasonService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ChampionStatusChangeReasonDTO,
  })
  async getAll(@Req() req: Request): Promise<ChampionStatusChangeReasonDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.championStatusChangeReasonEntityService.findAndCount({
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
    type: ChampionStatusChangeReasonDTO,
  })
  async getOne(@Param('id') id: number): Promise<ChampionStatusChangeReasonDTO> {
    return await this.championStatusChangeReasonEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create championStatusChangeReasonEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ChampionStatusChangeReasonDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() championStatusChangeReasonEntityDTO: ChampionStatusChangeReasonDTO
  ): Promise<ChampionStatusChangeReasonDTO> {
    const created = await this.championStatusChangeReasonEntityService.save(championStatusChangeReasonEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionStatusChangeReason', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update championStatusChangeReasonEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChampionStatusChangeReasonDTO,
  })
  async put(
    @Req() req: Request,
    @Body() championStatusChangeReasonEntityDTO: ChampionStatusChangeReasonDTO
  ): Promise<ChampionStatusChangeReasonDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionStatusChangeReason', championStatusChangeReasonEntityDTO.id);
    return await this.championStatusChangeReasonEntityService.update(championStatusChangeReasonEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update championStatusChangeReasonEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChampionStatusChangeReasonDTO,
  })
  async putId(
    @Req() req: Request,
    @Body() championStatusChangeReasonEntityDTO: ChampionStatusChangeReasonDTO
  ): Promise<ChampionStatusChangeReasonDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionStatusChangeReason', championStatusChangeReasonEntityDTO.id);
    return await this.championStatusChangeReasonEntityService.update(championStatusChangeReasonEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete championStatusChangeReasonEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ChampionStatusChangeReason', id);
    return await this.championStatusChangeReasonEntityService.deleteById(id);
  }
}
