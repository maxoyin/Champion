import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { WebNotificationTypeDTO } from '../src/service/dto/web-notification-type.dto';
import { WebNotificationTypeService } from '../src/service/web-notification-type.service';

describe('WebNotificationType Controller', () => {
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
      .overrideProvider(WebNotificationTypeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all web-notification-types ', async () => {
    const getEntities: WebNotificationTypeDTO[] = (await request(app.getHttpServer()).get('/api/web-notification-types').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET web-notification-types by id', async () => {
    const getEntity: WebNotificationTypeDTO = (
      await request(app.getHttpServer())
        .get('/api/web-notification-types/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create web-notification-types', async () => {
    const createdEntity: WebNotificationTypeDTO = (
      await request(app.getHttpServer()).post('/api/web-notification-types').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update web-notification-types', async () => {
    const updatedEntity: WebNotificationTypeDTO = (
      await request(app.getHttpServer()).put('/api/web-notification-types').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update web-notification-types from id', async () => {
    const updatedEntity: WebNotificationTypeDTO = (
      await request(app.getHttpServer())
        .put('/api/web-notification-types/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE web-notification-types', async () => {
    const deletedEntity: WebNotificationTypeDTO = (
      await request(app.getHttpServer())
        .delete('/api/web-notification-types/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
