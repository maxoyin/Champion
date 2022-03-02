import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { IncidentTypeDTO } from '../src/service/dto/incident-type.dto';
import { IncidentTypeService } from '../src/service/incident-type.service';

describe('IncidentType Controller', () => {
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
      .overrideProvider(IncidentTypeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all incident-types ', async () => {
    const getEntities: IncidentTypeDTO[] = (await request(app.getHttpServer()).get('/api/incident-types').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET incident-types by id', async () => {
    const getEntity: IncidentTypeDTO = (
      await request(app.getHttpServer())
        .get('/api/incident-types/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create incident-types', async () => {
    const createdEntity: IncidentTypeDTO = (await request(app.getHttpServer()).post('/api/incident-types').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update incident-types', async () => {
    const updatedEntity: IncidentTypeDTO = (await request(app.getHttpServer()).put('/api/incident-types').send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update incident-types from id', async () => {
    const updatedEntity: IncidentTypeDTO = (
      await request(app.getHttpServer())
        .put('/api/incident-types/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE incident-types', async () => {
    const deletedEntity: IncidentTypeDTO = (
      await request(app.getHttpServer())
        .delete('/api/incident-types/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
