import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { WebNotificationDTO } from '../src/service/dto/web-notification.dto';
import { WebNotificationService } from '../src/service/web-notification.service';

describe('WebNotification Controller', () => {
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
      .overrideProvider(WebNotificationService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all web-notifications ', async () => {
    const getEntities: WebNotificationDTO[] = (await request(app.getHttpServer()).get('/api/web-notifications').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET web-notifications by id', async () => {
    const getEntity: WebNotificationDTO = (
      await request(app.getHttpServer())
        .get('/api/web-notifications/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create web-notifications', async () => {
    const createdEntity: WebNotificationDTO = (
      await request(app.getHttpServer()).post('/api/web-notifications').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update web-notifications', async () => {
    const updatedEntity: WebNotificationDTO = (
      await request(app.getHttpServer()).put('/api/web-notifications').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update web-notifications from id', async () => {
    const updatedEntity: WebNotificationDTO = (
      await request(app.getHttpServer())
        .put('/api/web-notifications/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE web-notifications', async () => {
    const deletedEntity: WebNotificationDTO = (
      await request(app.getHttpServer())
        .delete('/api/web-notifications/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
