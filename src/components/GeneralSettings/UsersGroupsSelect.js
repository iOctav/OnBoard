import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLazyGetUsersQuery, useLazyGetVisibilityGroupsQuery } from '../../store/youtrackApi';
import Select from '@jetbrains/ring-ui/dist/select/select';
import List from '@jetbrains/ring-ui/dist/list/list';
import { useTranslation } from 'react-i18next';
import Button from '@jetbrains/ring-ui/dist/button/button';

const SeparatorItem = styled.span`
  display: block;
  min-height: 8px;
  margin-top: 8px;
  padding: 0 16px 1px;
  text-align: right;
  color: var(--ring-secondary-color);
  border-top: 1px solid var(--ring-line-color);
  font-size: var(--ring-font-size-smaller);
  line-height: var(--ring-line-height-lower);
`;

function UsersGroupsSelect({projectBasedLabel, deselectAllUsersAndGroups, ...rest}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [getUsers, users] = useLazyGetUsersQuery();
  const [getGroups, groups] = useLazyGetVisibilityGroupsQuery();
  const getData = () => {
    getGroups();
    getUsers();
  }
  useEffect(() => {
    if(groups && users && groups.data && users.data) {
      setLoading(false);
      setDataset([
        { key: 'group-separator', disabled: true, rgItemType: List.ListProps.Type.CUSTOM, template: (<div role="cell"><Button text onClick={deselectAllUsersAndGroups}>{t('Reset visibility')}</Button></div>)},
        { key: 'project-based', label: projectBasedLabel },
        { key: 'group-separator', disabled: true, rgItemType: List.ListProps.Type.CUSTOM, template: (<div role="cell"><SeparatorItem>{t('Groups and teams')}</SeparatorItem></div>)},
        ...[...groups.data].map(group => ({ key: group.id, label: group.name })),
        { key: 'user-separator', disabled: true, rgItemType: List.ListProps.Type.CUSTOM, template: (<div role="cell"><SeparatorItem>{t('Users')}</SeparatorItem></div>)},
        ...[...users.data].map(user => ({ key: user.id, label: user.fullName, description: user.login, type: 'user', showGeneratedAvatar: true, username: user.fullName })),
      ])
    }
  },[users, groups])
  return (<Select
      filter={true}
      tags = {{}}
      multiple
      label={t('Owner')}
      data={dataset}
      loading={loading}
      onOpen={() => loading && getData()}
      {...rest}/>
  );
}

UsersGroupsSelect.propTypes = {
  projectBasedLabel: PropTypes.string.isRequired,
  deselectAllUsersAndGroups: PropTypes.func.isRequired,
}

export default UsersGroupsSelect;
