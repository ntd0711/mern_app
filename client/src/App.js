import { Box, Stack } from '@mui/material';
import AuthFeature from 'features/Auth';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import BlogFeature from './features/Blog';

function App() {
    return (
        <Box>
            <Stack bgcolor="common.white" minHeight="100vh">
                <Box>
                    <Header />
                </Box>

                <Box flexGrow={1}>
                    <Routes>
                        <Route path="blog/*" element={<BlogFeature />} />
                        <Route path="signin" element={<AuthFeature />} />
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
