import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance, axiosInstanceAuth } from "../../../API/axios";
import PopupModal from "../../../components/modal/popup-modal";
import TableHeader from "../../../components/item/TableHeader";
import LoadingState from "../../../components/modal/LoadingState";
import EmptyState from "../../../components/modal/EmptyState";
import SpinnerOverlay from "../../../components/modal/SpinnerOverlay";

const TeamList = () => {
  const [listTeam, setListTeam] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const fetchListTeam = async () => {
    try {
      const response = await axiosInstance.get("/management/all");
      setListTeam(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("gagal mengambil data dari server", error);
      setLoading(false);
    }
  };

  const toCreate = () => {
    history.push("/dashboard/tim/create");
  };

  useEffect(() => {
    fetchListTeam();
  }, []);

  const handleDeleteClick = (teamId) => {
    setSelectedTeamId(teamId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    setShowSpinner(true)
    try {
      await axiosInstanceAuth.delete(`/management/${selectedTeamId}`);
      fetchListTeam();
    } catch (error) {
      console.error("gagal menghapus tim");
    }finally{
      setShowSpinner(false)
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toCreate}
        className="rounded-md focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Tambah Team
      </button>
      {loading ? (
        <LoadingState />
      ) : listTeam.length > 0 ? (
        <>
          <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader title="Name" />
                <TableHeader title="Jabatan" />
                <TableHeader title="Tingkat" />
                <TableHeader title="WhatsApp" />
                <TableHeader title="Aksi" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listTeam.map((team) => (
                <TableContent
                  key={team.id_management}
                  team={team}
                  handleDeleteClick={handleDeleteClick}
                  fetchListTeam={fetchListTeam}
                />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <EmptyState dataName="Team" />
      )}
      {showDeleteModal && (
        <PopupModal
          title="Apakah anda yakin menghapus Tim ini?"
          trueChoice="Hapus"
          falseChoice="Batal"
          isOpen={showDeleteModal}
          toggleModal={() => setShowDeleteModal(!showDeleteModal)}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
      {showSpinner && <SpinnerOverlay />}
    </>
  );
};

const TableContent = ({ team, handleDeleteClick, fetchListTeam }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(team.name);
  const [editedJobTitle, setEditedJobTitle] = useState(team.job_title);
  const [editedPenempatan, setEditedPenempatan] = useState(team.penempatan);
  const [editedTingkat, setEditedTingkat] = useState(team.tingkat);
  const [editedWhatsApp, setEditedWhatsApp] = useState(team.WhatsApp);
  const [imagePreview, setImagePreview] = useState(
    process.env.REACT_APP_IMAGE_URL + team.imageURL
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(
    process.env.REACT_APP_IMAGE_URL + team.imageURL
  );

  const handleEdit = () => {
    if (!editMode) {
      setOriginalImage(imagePreview); // Simpan gambar asli sebelum edit
    } else {
      setImagePreview(originalImage); // Kembalikan gambar ke gambar asli saat dibatalkan
    }
    setEditMode(!editMode);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", editedName);
    formData.append("job_title", editedJobTitle);
    formData.append("penempatan", editedPenempatan);
    formData.append("tingkat", editedTingkat);
    formData.append("WhatsApp", editedWhatsApp);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    try {
      await axiosInstanceAuth.put(`/management/${team.id_management}`, formData);
      setEditMode(false);
      fetchListTeam();
    } catch (error) {
      console.error("gagal mengupdate tim", error.response.message);
    }
  };

  return (
    <tr>
      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center space-x-6">
          {!editMode ? (
            <div className="flex items-center">
              <img
                id="preview_img"
                className="h-16 w-16 object-cover rounded-full"
                src={imagePreview}
                alt="Current"
              />
              <div className="text-sm font-medium text-gray-900 ml-2">
                {team.name}
              </div>
            </div>
          ) : (
            <>
              <form>
                <div className="flex items-center space-x-6">
                  <div className="shrink-0 relative">
                    <img
                      id="preview_img"
                      className="h-16 w-16 object-cover rounded-full cursor-pointer"
                      src={imagePreview}
                      alt="Current"
                      onClick={() =>
                        document.getElementById("file_input").click()
                      }
                    />
                    <input
                      id="file_input"
                      type="file"
                      name="file_input"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </div>
                </div>
              </form>
              <input
                type="text"
                id="name"
                name="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="form-input block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </>
          )}
        </div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        {editMode ? (
          <div className="flex-row">
            <input
              type="text"
              value={editedJobTitle}
              onChange={(e) => setEditedJobTitle(e.target.value)}
              placeholder="Masukan Jabatan"
              className="form-input block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              value={editedPenempatan}
              onChange={(e) => setEditedPenempatan(e.target.value)}
              placeholder="Masukan Penempatan"
              className="form-input block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
            />
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-900">{team.job_title}</div>
            <div className="text-sm text-gray-500">{team.penempatan}</div>
          </>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-center">
        {editMode ? (
          <select
            value={editedTingkat}
            onChange={(e) => setEditedTingkat(e.target.value)}
            className="form-select block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        ) : (
          <span className="px-2 inline-flex items-center justify-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {team.tingkat}
          </span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
        {editMode ? (
          <input
            type="text"
            value={editedWhatsApp}
            onChange={(e) => setEditedWhatsApp(e.target.value)}
            placeholder="Masukan WhatsApp"
            className="form-input block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <div className="text-sm text-gray-500">{team.WhatsApp}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
            >
              Save
            </button>
            <button
              onClick={handleEdit}
              className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(team.id_management)}
              className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TeamList;