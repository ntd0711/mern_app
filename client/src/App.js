import 'boxicons/css/boxicons.min.css';
import { NotFound, ScrollTop } from 'components';
import { AuthFeature, PostsFeature, ProfileFeature } from 'features';
import EmptyLayout from 'layouts/empty-layout';
import MainLayout from 'layouts/main-layout';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="posts/*" element={<PostsFeature />} />
          <Route path="profile/*" element={<ProfileFeature />} />
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
