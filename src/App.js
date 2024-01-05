import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import Footer from './components/layout/Footer';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import CreateThesis from './components/theses/CreateThesis';
import CreateSupervisor from './components/supervisor/CreateSupervisor';
import AddSubjectTopic from './components/subjectTopic/AddSubjectTopic';
import AddKeywords from './components/keywords/AddKeywords';
import FullThesisDetails from './components/theses/FullThesisDetails';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import {ThesisProvider} from "./context/ThesisContext";
import DetailedSearch from "./components/theses/DetailedSearch";
import ProfilePage from "./pages/ProfilePage";
import UpdateThesis from "./components/theses/UpdateThesis";
import UpdateSupervisor from "./components/supervisor/UpdateSupervisor";
import UpdateSubjectTopic from "./components/subjectTopic/UpdateSubjectTopic";
import UpdateKeywords from "./components/keywords/UpdateKeywords";
import AdminPanel from "./components/admin/AdminPanel";
import AdminUniversity from "./components/admin/AdminUniversity";
import AdminInstitute from "./components/admin/AdminInstitute";
import AdminLanguage from "./components/admin/AdminLanguage";
import {jwtDecode} from "jwt-decode";

function App() {
    return (
        <Router>
            <AuthProvider>
                <ThesisProvider>
                    <AppContent />
                </ThesisProvider>
            </AuthProvider>
        </Router>
    );
}

function AppContent() {
    const { user } = useAuthContext();
    const isAdmin = user?.token && jwtDecode(user.token).role?.includes('admin');

    return (
        <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className={'container mx-auto px-3 pb-12'}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path={"/detailedSearch"} element={<DetailedSearch/>}/>
                    <Route path={"/thesisFilterResults"} element={<SearchResults/>}/>
                    <Route path="/fullThesisDetails/:thesisNo" element={<FullThesisDetails />}/>
                    {isAdmin ? (
                        <>
                            <Route path="/adminPanel" element={<AdminPanel />} />
                            <Route path="/admin/universities" element={<AdminUniversity />} />
                            <Route path="/admin/institutes" element={<AdminInstitute />} />
                            <Route path="/admin/languages" element={<AdminLanguage />} />
                        </>
                    ) : (

                        <Route path={"*"} element={<Navigate to={"/notfound"}/>} />
                    )}

                    <Route path="/myTheses"
                           element={user ? <ProfilePage /> : <Navigate to="/login" />}
                    />
                    <Route path="/updateThesis/:thesisNo"
                           element={user ? <UpdateThesis /> : <Navigate to="/login" />}
                    />
                    <Route path="/create"
                           element={user ? <CreateThesis /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/create/addSupervisor/:thesisNo"
                        element={user ? <CreateSupervisor /> : <Navigate to="/login" />}
                    />
                    <Route path="/updateSupervisor/:thesisNo"
                           element={user ? <UpdateSupervisor /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/create/subjectTopics/:thesisNo"
                        element={user ? <AddSubjectTopic /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/updateSubjectTopics/:thesisNo"
                        element={user ? <UpdateSubjectTopic /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/create/addKeywords/:thesisNo"
                        element={user ? <AddKeywords /> : <Navigate to="/login" />}
                    />
                    <Route path="/updateKeywords/:thesisNo"
                           element={user ? <UpdateKeywords /> : <Navigate to="/login" />}
                    />

                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/notfound" />} />
                </Routes>

            </main>
            <Footer />
        </div>
    );
}

export default App;
