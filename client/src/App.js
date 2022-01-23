import { NotFound } from 'components';
import RequireAuth from 'components/hocs/require-auth';
import { AuthFeature, PostsFeature, ProfileFeature } from 'features';
import MainLayout from 'layouts/main-layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="posts/*" element={<PostsFeature />} />
          <Route path="profile/*" element={<RequireAuth component={<ProfileFeature />} />} />
          <Route path="signin" element={<AuthFeature />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
