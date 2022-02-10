import { NotFound, ScrollTop } from 'components';
import RequireAuth from 'components/hocs/require-auth';
import { AuthFeature, PostsFeature, ProfileFeature } from 'features';
import EmptyLayout from 'layouts/empty-layout';
import MainLayout from 'layouts/main-layout';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="posts/*" element={<PostsFeature />} />
          <Route path="profile/*" element={<RequireAuth component={<ProfileFeature />} />} />
          <Route path="signin" element={<AuthFeature />} />
        </Route>
        <Route element={<EmptyLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
