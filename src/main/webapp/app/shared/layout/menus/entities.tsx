import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/champion">
      <Translate contentKey="global.menu.entities.champion" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/champion-status-history">
      <Translate contentKey="global.menu.entities.championStatusHistory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/champion-guarantor">
      <Translate contentKey="global.menu.entities.championGuarantor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/field-agent">
      <Translate contentKey="global.menu.entities.fieldAgent" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/incident">
      <Translate contentKey="global.menu.entities.incident" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/web-notification">
      <Translate contentKey="global.menu.entities.webNotification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/web-notification-type">
      <Translate contentKey="global.menu.entities.webNotificationType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/champion-status-change-reason">
      <Translate contentKey="global.menu.entities.championStatusChangeReason" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/incident-type">
      <Translate contentKey="global.menu.entities.incidentType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/workshift">
      <Translate contentKey="global.menu.entities.workshift" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
