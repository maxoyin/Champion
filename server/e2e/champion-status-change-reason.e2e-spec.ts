import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ChampionStatusChangeReasonDTO } from '../src/service/dto/champion-status-change-reason.dto';
import { ChampionStatusChangeReasonService } from '../src/service/champion-status-change-reason.service';

describe('ChampionStatusChangeReason Controller', () => {
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
      .overrideProvider(ChampionStatusChangeReasonService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all champion-status-change-reasons ', async () => {
    const getEntities: ChampionStatusChangeReasonDTO[] = (
      await request(app.getHttpServer()).get('/api/champion-status-change-reasons').expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET champion-status-change-reasons by id', async () => {
    const getEntity: ChampionStatusChangeReasonDTO = (
      await request(app.getHttpServer())
        .get('/api/champion-status-change-reasons/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create champion-status-change-reasons', async () => {
    const createdEntity: ChampionStatusChangeReasonDTO = (
      await request(app.getHttpServer()).post('/api/champion-status-change-reasons').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update champion-status-change-reasons', async () => {
    const updatedEntity: ChampionStatusChangeReasonDTO = (
      await request(app.getHttpServer()).put('/api/champion-status-change-reasons').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update champion-status-change-reasons from id', async () => {
    const updatedEntity: ChampionStatusChangeReasonDTO = (
      await request(app.getHttpServer())
        .put('/api/champion-status-change-reasons/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE champion-status-change-reasons', async () => {
    const deletedEntity: ChampionStatusChangeReasonDTO = (
      await request(app.getHttpServer())
        .delete('/api/champion-status-change-reasons/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
