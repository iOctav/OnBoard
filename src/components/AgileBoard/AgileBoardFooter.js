import styled from 'styled-components';

import PropTypes from 'prop-types';
import Footer from '@jetbrains/ring-ui/dist/footer/footer';
import { profilePageUri } from '../../services/linkService';
import { useTranslation } from 'react-i18next';

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

function AgileBoardFooter({owner}) {
  const { t } = useTranslation();
  return (<FooterContainer floating={true}
    left={[
      [
        t('Board owner:') + ' ',
        {
          url: profilePageUri(owner.login),
          target: '_blank',
          label: owner.fullName,
        },
      ]
    ]}
  />);
}

AgileBoardFooter.propTypes = {
  owner: PropTypes.object.isRequired,
}

export default AgileBoardFooter;
