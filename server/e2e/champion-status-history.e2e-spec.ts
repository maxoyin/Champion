import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ChampionStatusHistoryDTO } from '../src/service/dto/champion-status-history.dto';
import { ChampionStatusHistoryService } from '../src/service/champion-status-history.service';

describe('ChampionStatusHistory Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(ChampionStatusHistoryService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all champion-status-histories ', async () => {
    const getEntities: ChampionStatusHistoryDTO[] = (await request(app.getHttpServer()).get('/api/champion-status-histories').expect(200))
      .body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET champion-status-histories by id', async () => {
    const getEntity: ChampionStatusHistoryDTO = (
      await request(app.getHttpServer())
        .get('/api/champion-status-histories/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create champion-status-histories', async () => {
    const createdEntity: ChampionStatusHistoryDTO = (
      await request(app.getHttpServer()).post('/api/champion-status-histories').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update champion-status-histories', async () => {
    const updatedEntity: ChampionStatusHistoryDTO = (
      await request(app.getHttpServer()).put('/api/champion-status-histories').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update champion-status-histories from id', async () => {
    const updatedEntity: ChampionStatusHistoryDTO = (
      await request(app.getHttpServer())
        .put('/api/champion-status-histories/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE champion-status-histories', async () => {
    const deletedEntity: ChampionStatusHistoryDTO = (
      await request(app.getHttpServer())
        .delete('/api/champion-status-histories/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
