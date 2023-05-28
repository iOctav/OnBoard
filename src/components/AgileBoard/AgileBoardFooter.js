import styled from 'styled-components';

import PropTypes from 'prop-types';
import Footer from '@jetbrains/ring-ui/dist/footer/footer';
import { profilePageUri } from '../../services/linkService';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { resetPicked, resetSelection, selectPickedCards, selectSelectedCard } from '../../features/card/cardSlice';
import closeIcon from '@jetbrains/icons/close-12px';
import linkIcon from '@jetbrains/icons/link';
import tagIcon from '@jetbrains/icons/tag';
import caretDown from '@jetbrains/icons/caret-down-10px';
import { ReactComponent as setPerson } from './set-person.svg';
import Button from '@jetbrains/ring-ui/dist/button/button';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';

const FooterContainer = styled(Footer)`
  background-color: var(--ring-content-background-color);
  display: block;
  position: fixed;
  height: calc(5 * var(--ring-unit) - 1px);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-top: 1px solid var(--ring-borders-color);
  padding: calc(var(--ring-unit)) calc(2*var(--ring-unit)) 0 calc(2*var(--ring-unit));
  transition: left 0.5s cubic-bezier(0.55, 0, 0.1, 1), transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  margin: 0;
  .columnRight_rui_fade {
    top: 0;
  }
`;

const RightButtonGroupContent = styled(ButtonGroup)`
  margin-right: calc(2*var(--ring-unit));
  margin-top: calc(0.5 * var(--ring-unit));
  vertical-align: top;
  text-align: left;
`;

const SetPerson14px = styled(setPerson)`
  width: 14px;
  height: 14px;
`;

function AgileBoardFooter({owner}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pickedCards = useSelector(selectPickedCards);
  const selectedCard = useSelector(selectSelectedCard);
  let leftContent = [];
  let rightContent = [];
  if (selectedCard?.id) {
    let selectedCardsCount = pickedCards && pickedCards.length ? pickedCards.length : 1;
    leftContent = [
      [
        t('1 card selected', { count: selectedCardsCount}),
        (<Button key="reset-selection" icon={closeIcon} onClick={() => dispatch(pickedCards && pickedCards.length ? resetPicked() : resetSelection())}/>),
        (<ButtonGroup key="left-button-group">
          <Button key="set-assignee" icon={SetPerson14px} title={t('Set assignee')}/>
          <Button key="add-tag" icon={tagIcon} title={t('Add tag')}/>
          <Button key="link-issues" icon={linkIcon} title={t('Link issues')}/>
        </ButtonGroup>)
      ],
    ];
    rightContent = [
      (<RightButtonGroupContent key="right-button-group">
        <Button key="move-next-sprint-button">{t('Move to next sprint')}</Button>
        <Button key="sprints-dropdown" icon={caretDown}></Button>
      </RightButtonGroupContent>)
    ];
  } else {
    leftContent = [
      [
        t('Board owner:') + ' ',
        {
          url: profilePageUri(owner.login),
          target: '_blank',
          label: owner.fullName,
        },
      ]
    ];
  }
  return (<FooterContainer floating={true}
    left={leftContent}
    right={rightContent}
  />);
}

AgileBoardFooter.propTypes = {
  owner: PropTypes.object.isRequired,
}

export default AgileBoardFooter;
