import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import { AuthProvider } from './utils/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

// Pages
import {
    Agenda,
    Artikel,
    CreateAgenda,
    CreateArtikel,
    CreateDataAsset,
    CreatePenduduk,
    Dashboard,
    DataAsset,
    EditAgenda,
    EditArtikel,
    EditAsset,
    EditPenduduk,
    EditPerangkat,
    ListResident,
    Login,
    MasterData,
    PerangkatDesa,
} from './pages';

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<DefaultLayout />}>
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/penduduk"
                            element={
                                <ProtectedRoute>
                                    <ListResident />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/penduduk/create"
                            element={
                                <ProtectedRoute>
                                    <CreatePenduduk />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/penduduk/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditPenduduk />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/artikel"
                            element={
                                <ProtectedRoute>
                                    <Artikel />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/artikel/create"
                            element={
                                <ProtectedRoute>
                                    <CreateArtikel />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/artikel/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditArtikel />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/data-asset"
                            element={
                                <ProtectedRoute>
                                    <DataAsset />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/data-asset/create"
                            element={
                                <ProtectedRoute>
                                    <CreateDataAsset />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/data-asset/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditAsset />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/master"
                            element={
                                <ProtectedRoute>
                                    <MasterData />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/perangkat-desa"
                            element={
                                <ProtectedRoute>
                                    <PerangkatDesa />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/perangkat-desa/:id"
                            element={
                                <ProtectedRoute>
                                    <EditPerangkat />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/agenda"
                            element={
                                <ProtectedRoute>
                                    <Agenda />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/agenda/create"
                            element={
                                <ProtectedRoute>
                                    <CreateAgenda />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/agenda/:id"
                            element={
                                <ProtectedRoute>
                                    <EditAgenda />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
                <ToastContainer theme="light" />
            </AuthProvider>
        </>
    );
}

export default App;
