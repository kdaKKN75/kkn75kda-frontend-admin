import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';

// Pages
import { Dashboard, ListResident } from './pages';

function App() {
    return (
        <>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/penduduk/daftar-penduduk" element={<ListResident />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
