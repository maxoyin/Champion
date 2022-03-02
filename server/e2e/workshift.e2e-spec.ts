import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { WorkshiftDTO } from '../src/service/dto/workshift.dto';
import { WorkshiftService } from '../src/service/workshift.service';

describe('Workshift Controller', () => {
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
      .overrideProvider(WorkshiftService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all workshifts ', async () => {
    const getEntities: WorkshiftDTO[] = (await request(app.getHttpServer()).get('/api/workshifts').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET workshifts by id', async () => {
    const getEntity: WorkshiftDTO = (
      await request(app.getHttpServer())
        .get('/api/workshifts/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create workshifts', async () => {
    const createdEntity: WorkshiftDTO = (await request(app.getHttpServer()).post('/api/workshifts').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update workshifts', async () => {
    const updatedEntity: WorkshiftDTO = (await request(app.getHttpServer()).put('/api/workshifts').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update workshifts from id', async () => {
    const updatedEntity: WorkshiftDTO = (
      await request(app.getHttpServer())
        .put('/api/workshifts/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE workshifts', async () => {
    const deletedEntity: WorkshiftDTO = (
      await request(app.getHttpServer())
        .delete('/api/workshifts/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
