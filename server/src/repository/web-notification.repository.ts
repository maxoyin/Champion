import { EntityRepository, Repository } from 'typeorm';
import { WebNotificationEntity } from '../domain/web-notification.entity';

@EntityRepository(WebNotificationEntity)
export class WebNotificationRepository extends Repository<WebNotificationEntity> {}
