import styled from 'styled-components';

import PropTypes from 'prop-types';
import Footer from '@jetbrains/ring-ui/dist/footer/footer';
import { profilePageUri } from '../../services/linkService';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelection, selectPickedCards, selectSelectedCard } from '../../features/card/cardSlice';
import closeIcon from '@jetbrains/icons/close-12px';
import linkIcon from '@jetbrains/icons/link';
import tagIcon from '@jetbrains/icons/tag';
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
  if (selectedCard?.id) {
    let selectedCardsCount = pickedCards ? pickedCards.length : 1;
    if (pickedCards.findIndex(x => x.id === selectedCard.id) < 0) {
      selectedCardsCount++;
    }
    leftContent = [
      [
        t('1 card selected', { count: selectedCardsCount}),
        (<Button icon={closeIcon} onClick={() => dispatch(resetSelection())}/>),
        (<ButtonGroup>
          <Button icon={SetPerson14px} title={t('Set assignee')}/>
          <Button icon={tagIcon} title={t('Add tag')}/>
          <Button icon={linkIcon} title={t('Link issues')}/>
        </ButtonGroup>)
      ],
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
  />);
}

AgileBoardFooter.propTypes = {
  owner: PropTypes.object.isRequired,
}

export default AgileBoardFooter;
