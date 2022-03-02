import { EntityRepository, Repository } from 'typeorm';
import { WebNotificationTypeEntity } from '../domain/web-notification-type.entity';

@EntityRepository(WebNotificationTypeEntity)
export class WebNotificationTypeRepository extends Repository<WebNotificationTypeEntity> {}
