import AgileBoard from '../AgileBoard';
import PageYTHeader from '../PageYTHeader';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthOutlet from '../../features/auth/AuthOutlet';
import RedirectPage from '../RedirectPage';
import OAuth from '../../features/auth/OAuth';
import DefaultAgileBoard from '../AgileBoard/DefaultAgileBoard';
import { YT_PAGES } from '../../services/linkService';
import ErrorPage from '../ErrorPage';

function AgileRoutePage() {
  return (<div className="agile-page">
    <PageYTHeader/>
    <Routes>
      <Route path="/" element={<AuthOutlet />}>
        <Route path=":agileId">
          <Route path=":sprintId" element={<AgileBoard/>} />
          <Route index element={<Navigate to="current" />}/>
        </Route>
        <Route index element={<DefaultAgileBoard/>}/>
      </Route>
      <Route path="/oauth" element={<OAuth/>}/>
      { Object.keys(YT_PAGES).map((key) => (
        <Route key={key} path={YT_PAGES[key]} element={<RedirectPage/>}>
          <Route path="*" element={<RedirectPage/>} />
        </Route>))
      }
      <Route path="/error" element={<ErrorPage/>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </div>);
}
export default AgileRoutePage
