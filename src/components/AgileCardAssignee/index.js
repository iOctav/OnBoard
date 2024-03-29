import styled from 'styled-components';

import { ReactComponent as AddPerson } from './add-person.svg';
import PropTypes from 'prop-types';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetUserBundleValuesQuery } from '../../app/services/youtrackApi';
import Avatar, { Size } from '@jetbrains/ring-ui/dist/avatar/avatar';
import { useState } from 'react';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';

const AddPerson14px = styled(AddPerson)`
  width: 14px;
  height: 14px;
`;

const AvatarSpan = styled.span`
  vertical-align: middle;
`;

const UnassignedKey = 'unassigned-key';

function AgileCardAssignee({field}) {
  const { t } = useTranslation();
  const selected = field.value &&
    { label: field.value.name, key: field.value.id, type: 'user', showGeneratedAvatar: true, username: field.value.fullName, description: field.value.login };
  const [selectedItem, setSelectedItem] = useState(selected);
  const mapBundleDataItem = item => ({ label: item.name, key: item.id, type: 'user', showGeneratedAvatar: true, username: item.fullName, description: item.login });

  return (
    <span data-testid="agile-card-assignee" className="agile-card-assignee">
      <LazySelectBox className="agile-card-enumeration-item"
                     selected={selected}
                     lazyDataLoaderHook={useLazyGetUserBundleValuesQuery}
                     lazyDataLoaderHookParams={field.projectCustomField.bundle?.id}
                     makeDataset={(data) => [{ label: t('Unassigned.$$noContext'), key: UnassignedKey }, ...data.map(mapBundleDataItem)]}
                     type="CUSTOM" label=""
                     onSelect={(item) => setSelectedItem(item.key !== UnassignedKey ? item : undefined)}
                     customAnchor={({wrapperProps, buttonProps, popup}) => (
                       <AvatarSpan {...wrapperProps}>
                         { selectedItem
                             ? <Avatar size={Size.Size14} username={selectedItem.username} {...buttonProps}/>
                             : <Button icon={AddPerson14px} title={t('Set assignee')} {...buttonProps}>{''}</Button>
                         }
                         {popup}
                       </AvatarSpan>)}>
      </LazySelectBox>
    </span>
  );
}

AgileCardAssignee.propTypes = {
  field: PropTypes.object.isRequired,
}

export default AgileCardAssignee
