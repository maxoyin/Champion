import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChampionModule } from './module/champion.module';
import { ChampionStatusHistoryModule } from './module/champion-status-history.module';
import { ChampionGuarantorModule } from './module/champion-guarantor.module';
import { FieldAgentModule } from './module/field-agent.module';
import { IncidentModule } from './module/incident.module';
import { WebNotificationModule } from './module/web-notification.module';
import { WebNotificationTypeModule } from './module/web-notification-type.module';
import { ChampionStatusChangeReasonModule } from './module/champion-status-change-reason.module';
import { IncidentTypeModule } from './module/incident-type.module';
import { WorkshiftModule } from './module/workshift.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ServeStaticModule.forRoot({
      rootPath: config.getClientPath(),
    }),
    AuthModule,
    ChampionModule,
    ChampionStatusHistoryModule,
    ChampionGuarantorModule,
    FieldAgentModule,
    IncidentModule,
    WebNotificationModule,
    WebNotificationTypeModule,
    ChampionStatusChangeReasonModule,
    IncidentTypeModule,
    WorkshiftModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ],
})
export class AppModule {}
