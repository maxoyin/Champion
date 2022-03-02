import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ChampionGuarantorDTO } from '../src/service/dto/champion-guarantor.dto';
import { ChampionGuarantorService } from '../src/service/champion-guarantor.service';

describe('ChampionGuarantor Controller', () => {
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
      .overrideProvider(ChampionGuarantorService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all champion-guarantors ', async () => {
    const getEntities: ChampionGuarantorDTO[] = (await request(app.getHttpServer()).get('/api/champion-guarantors').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET champion-guarantors by id', async () => {
    const getEntity: ChampionGuarantorDTO = (
      await request(app.getHttpServer())
        .get('/api/champion-guarantors/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create champion-guarantors', async () => {
    const createdEntity: ChampionGuarantorDTO = (
      await request(app.getHttpServer()).post('/api/champion-guarantors').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update champion-guarantors', async () => {
    const updatedEntity: ChampionGuarantorDTO = (
      await request(app.getHttpServer()).put('/api/champion-guarantors').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update champion-guarantors from id', async () => {
    const updatedEntity: ChampionGuarantorDTO = (
      await request(app.getHttpServer())
        .put('/api/champion-guarantors/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE champion-guarantors', async () => {
    const deletedEntity: ChampionGuarantorDTO = (
      await request(app.getHttpServer())
        .delete('/api/champion-guarantors/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
