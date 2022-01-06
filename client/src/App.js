import { Box, Stack } from '@mui/material';
import { Footer, Header, RequireAuth } from 'components';
import { AuthFeature, PostsFeature, ProfileFeature } from 'features';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Box>
            <Stack bgcolor="#282c35" minHeight="100vh">
                <Box>
                    <Header />
                </Box>

                <Box flexGrow={1}>
                    <Routes>
                        <Route path="signin" element={<AuthFeature />} />
                        <Route path="posts/*" element={<PostsFeature />} />
                        <Route
                            path="profile/*"
                            element={<RequireAuth component={ProfileFeature} />}
                        />
                    </Routes>
                </Box>

                <Box>
                    <Footer />
                </Box>
            </Stack>
        </Box>
    );
}

export default App;
