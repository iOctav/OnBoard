import AgileBoard from '../AgileBoard';
import PageYTHeader from '../PageYTHeader';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthOutlet from '../../features/auth/AuthOutlet';
import RedirectPage from '../RedirectPage';
import OAuth from '../../features/auth/OAuth';
import DefaultAgileBoard from '../AgileBoard/DefaultAgileBoard';

function AgileRoutePage() {
  return (<div className="agile-page">
    <PageYTHeader/>
    <Routes>
      <Route path="/" element={<AuthOutlet />}>
        <Route index element={<Navigate to="/agiles" />} />
      </Route>
      <Route path="/agiles" element={<AuthOutlet />}>
        <Route path=":agileId">
          <Route path=":sprintId" element={<AgileBoard/>} />
        </Route>
        <Route index element={<DefaultAgileBoard/>}/>
      </Route>
      <Route path="/oauth" element={<OAuth/>}/>
      <Route path="*" element={<RedirectPage/>} />
    </Routes>
  </div>);
}
export default AgileRoutePage
