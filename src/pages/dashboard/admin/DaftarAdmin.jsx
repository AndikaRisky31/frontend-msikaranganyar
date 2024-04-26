import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosInstanceAuth } from '../../../API/axios';
import PopupModal from '../../../components/modal/popup-modal';

const DaftarAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedRole, setEditedRole] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState(null);
    const history = useHistory()

    useEffect(() => {
        fetchAllAdmin();
    }, []);

    const fetchAllAdmin = async () => {
        try {
            const response = await axiosInstanceAuth.get('/admin/all');
            setAdmins(response.data.admins);
        } catch (error) {
            console.error('Failed to fetch admins:', error);
        }
    };

    const handleEditClick = (adminId) => {
        const adminToEdit = admins.find((admin) => admin.id_admin === adminId);
        setEditingId(adminId);
        setEditedName(adminToEdit.name);
        setEditedEmail(adminToEdit.email);
        setEditedRole(adminToEdit.role);
    };

    const handleSaveClick = async () => {
        try {
            await axiosInstanceAuth.put(`/admin/${editingId}`, {
                name: editedName,
                email: editedEmail,
                role: editedRole,
            });
            fetchAllAdmin();
            setEditingId(null);
            setEditedName('');
            setEditedEmail('');
            setEditedRole('');
        } catch (error) {
            console.error('Failed to update admin:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditedName('');
        setEditedEmail('');
        setEditedRole('');
    };

    const handleDeleteClick = (adminId) => {
        setSelectedAdminId(adminId);
        setShowDeleteModal(true);
    };
    const handleTambahAdmin = ()=>{
        history.push('/dashboard/createadmin')
    }

    const handleConfirmDelete = async () => {
        try {
            await axiosInstanceAuth.delete(`/admin/${selectedAdminId}`);
            fetchAllAdmin();
            setShowDeleteModal(false);
            setSelectedAdminId(null);
        } catch (error) {
            console.error('Failed to delete admin:', error);
        }
    };
    
    return (
        <>
        <button onClick={handleTambahAdmin} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Tambah Admin</button>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berita</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                        <tr key={admin.id_admin}>
                            <td className="px-6 py-4 whitespace-nowrap">{editingId === admin.id_admin ? <input id="name" name="name" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : admin.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{editingId === admin.id_admin ? <input id='email' name ='email' type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} /> : admin.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{admin.totalNews}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{editingId === admin.id_admin ? <select value={editedRole} onChange={(e) => setEditedRole(e.target.value)}>
                                <option value="superadmin">superadmin</option>
                                <option value="admin">admin</option>
                            </select> : admin.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingId === admin.id_admin ? (
                                    <>
                                        <button onClick={handleSaveClick} className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Save</button>
                                        <button onClick={handleCancelClick} className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(admin.id_admin)} className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out">Edit</button>
                                        <button onClick={() => handleDeleteClick(admin.id_admin)} className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PopupModal
                title="Apakah anda yakin menghapus Admin ini?"
                trueChoice="Hapus"
                falseChoice="Batal"
                isOpen={showDeleteModal}
                toggleModal={() => setShowDeleteModal(!showDeleteModal)}
                handleConfirmDelete={handleConfirmDelete}
            />
        </>
    );
};

export default DaftarAdmin;