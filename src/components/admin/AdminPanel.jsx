import React from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-5">Admin Panel</h1>
            <div>
                <Link to="/admin/universities">
                    <button className={"btn btn-primary btn-sm rounded-btn mx-3"}>Manage Universities</button>
                </Link>
                <Link to="/admin/institutes">
                    <button className={"btn btn-primary btn-sm rounded-btn mx-3"}>Manage Institutes</button>

                </Link>
                <Link to="/admin/languages">
                    <button className={"btn btn-primary btn-sm rounded-btn mx-3"}>Manage Languages</button>

                </Link>
            </div>
        </div>
    );
}

export default AdminPanel;