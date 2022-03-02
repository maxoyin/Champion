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
import { ChampionGuarantorDTO } from '../../service/dto/champion-guarantor.dto';
import { ChampionGuarantorService } from '../../service/champion-guarantor.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/champion-guarantors')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('champion-guarantors')
export class ChampionGuarantorController {
  logger = new Logger('ChampionGuarantorController');

  constructor(private readonly championGuarantorEntityService: ChampionGuarantorService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ChampionGuarantorDTO,
  })
  async getAll(@Req() req: Request): Promise<ChampionGuarantorDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.championGuarantorEntityService.findAndCount({
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
    type: ChampionGuarantorDTO,
  })
  async getOne(@Param('id') id: number): Promise<ChampionGuarantorDTO> {
    return await this.championGuarantorEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create championGuarantorEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ChampionGuarantorDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() championGuarantorEntityDTO: ChampionGuarantorDTO): Promise<ChampionGuarantorDTO> {
    const created = await this.championGuarantorEntityService.save(championGuarantorEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionGuarantor', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update championGuarantorEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChampionGuarantorDTO,
  })
  async put(@Req() req: Request, @Body() championGuarantorEntityDTO: ChampionGuarantorDTO): Promise<ChampionGuarantorDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionGuarantor', championGuarantorEntityDTO.id);
    return await this.championGuarantorEntityService.update(championGuarantorEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update championGuarantorEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChampionGuarantorDTO,
  })
  async putId(@Req() req: Request, @Body() championGuarantorEntityDTO: ChampionGuarantorDTO): Promise<ChampionGuarantorDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChampionGuarantor', championGuarantorEntityDTO.id);
    return await this.championGuarantorEntityService.update(championGuarantorEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete championGuarantorEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ChampionGuarantor', id);
    return await this.championGuarantorEntityService.deleteById(id);
  }
}
