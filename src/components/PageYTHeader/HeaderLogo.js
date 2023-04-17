import PropTypes from 'prop-types';
import Logo from '@jetbrains/ring-ui/dist/header/logo';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Theme, { useTheme } from '@jetbrains/ring-ui/dist/global/theme';
import { SUPPORTED_LANGUAGES } from '../../features/auth/localeUtils';

export function HeaderLogo({isCompact}) {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const LogoSvg = lazy(() => import(`./logos/ObLogo${isCompact ? 'Small' : 'Large'}${!isCompact ? theme === Theme.LIGHT ? 'Light' : 'Dark' : ''}${i18n.language === SUPPORTED_LANGUAGES.Russian ? 'Ru' : ''}`))

  return (
    <Suspense>
      <Logo className={isCompact ? 'compactLogo' : '' } glyph={LogoSvg} size={isCompact ? Logo.Size.Size40 : Logo.Size.Size128}/>
    </Suspense>)
}

HeaderLogo.propTypes = {
  isCompact: PropTypes.bool
}

export default HeaderLogo;
