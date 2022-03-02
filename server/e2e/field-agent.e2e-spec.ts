import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { FieldAgentDTO } from '../src/service/dto/field-agent.dto';
import { FieldAgentService } from '../src/service/field-agent.service';

describe('FieldAgent Controller', () => {
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
      .overrideProvider(FieldAgentService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all field-agents ', async () => {
    const getEntities: FieldAgentDTO[] = (await request(app.getHttpServer()).get('/api/field-agents').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET field-agents by id', async () => {
    const getEntity: FieldAgentDTO = (
      await request(app.getHttpServer())
        .get('/api/field-agents/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create field-agents', async () => {
    const createdEntity: FieldAgentDTO = (await request(app.getHttpServer()).post('/api/field-agents').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update field-agents', async () => {
    const updatedEntity: FieldAgentDTO = (await request(app.getHttpServer()).put('/api/field-agents').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update field-agents from id', async () => {
    const updatedEntity: FieldAgentDTO = (
      await request(app.getHttpServer())
        .put('/api/field-agents/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE field-agents', async () => {
    const deletedEntity: FieldAgentDTO = (
      await request(app.getHttpServer())
        .delete('/api/field-agents/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
