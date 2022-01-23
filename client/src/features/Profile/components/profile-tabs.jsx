import {
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses,
} from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import TabAbout from './tab-about';
import TabPost from './tab-post';
function ProfileTabs({ posts }) {
  const Tab = styled(TabUnstyled)`
    font-size: 1.2rem;
    color: #eee;
    padding: 0.6rem 1rem;
    transition: all 0.3s;
    background-color: transparent;
    cursor: pointer;

    &.${tabUnstyledClasses.selected} {
      color: #00c7d0;
      border-bottom: 1px solid #00c7d0;
      transition: all 0.3s;
    }
  `;

  const Tabs = styled(TabsListUnstyled)`
    // width: 100%;
    display: flex;
    column-gap: 4rem;
  `;

  const WrapperTabs = styled(TabsUnstyled)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const TabContent = styled(TabPanelUnstyled)`
    width: 100%;
    color: #eee;
    transition: all 0.3s;
    margin-top: 3rem;
  `;

  return (
    <WrapperTabs defaultValue={0}>
      <Tabs>
        <Tab component="div">Posts</Tab>
        <Tab component="div">About</Tab>
      </Tabs>
      <TabContent value={0}>
        <TabPost posts={posts} />
      </TabContent>
      <TabContent value={1}>
        <TabAbout />
      </TabContent>
    </WrapperTabs>
  );
}

export default ProfileTabs;
