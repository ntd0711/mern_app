import { NotFound } from 'components';
import RequireAuth from 'components/hocs/require-auth';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/create-page';
import DetailPage from './pages/detail-page';
import ListPage from './pages/list-page';
import UpdatePage from './pages/update-page';

function PostsFeature() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path=":id" element={<DetailPage />} />
      <Route path="create" element={<RequireAuth component={<CreatePage />} />} />
      <Route path="update/:id" element={<RequireAuth component={<UpdatePage />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PostsFeature;
