import PropTypes from "prop-types";
import { GiGraduateCap } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function Navbar({ title }) {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const isAdmin = user?.token && jwtDecode(user.token).role?.includes('admin');

    return (
        <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2">
                    <GiGraduateCap className="inline pr-2 text-3xl" />
                    <Link to="/" className="text-lg font-bold align-middle">
                        {title}
                    </Link>
                </div>

                <div className="flex-1 px-2 mx-2">
                    <div className="flex justify-end">
                        <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
                            Home
                        </Link>
                        <Link to="/detailedSearch" className="btn btn-ghost btn-sm rounded-btn">
                            Search in Detail
                        </Link>
                        <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
                            About
                        </Link>

                        {user && (
                            <>
                                {!isAdmin && (
                                    <>
                                        <Link to="/create" className="btn btn-ghost btn-sm rounded-btn">
                                            Create
                                        </Link>
                                        <Link to="/myTheses" className="btn btn-ghost btn-sm rounded-btn">
                                            My Theses
                                        </Link>
                                    </>
                                )}

                                <button onClick={handleLogout} className="btn btn-ghost btn-sm rounded-btn">
                                    Logout
                                </button>

                                {isAdmin && (
                                    <Link to="/adminPanel" className="btn btn-ghost btn-sm rounded-btn">
                                        Admin Panel
                                    </Link>
                                )}
                            </>
                        )}

                        {!user && (
                            <>
                                <Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
                                    Login
                                </Link>

                                <Link to="/register" className="btn btn-ghost btn-sm rounded-btn">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

Navbar.defaultProps = {
    title: "Graduate Thesis System"
}

Navbar.propTypes = {
    title: PropTypes.string
}

export default Navbar;
