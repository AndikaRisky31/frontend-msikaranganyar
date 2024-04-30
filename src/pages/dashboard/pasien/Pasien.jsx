import React, { useState, useEffect } from 'react';
import { getPasien, updatePasien, deleteYear } from '../../../API/PasienAPI';
import SubmitButton from '../../../components/button/SubmitButton';
import LoadingState from '../../../components/modal/LoadingState';
import PopupModal from '../../../components/modal/popup-modal';
import SpinnerOverlay from '../../../components/modal/SpinnerOverlay';

const Pasien = () => {
    const [dataPasien, setDataPasien] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(0);
    const [showOtherYearInput, setShowOtherYearInput] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const fetchPasien = async () => {
        try {
            const PasienData = await getPasien();
            setDataPasien(PasienData);
            if (dataPasien && dataPasien.totalPerYear.length > 0) {
                setSelectedYear(dataPasien.totalPerYear[dataPasien.totalPerYear.length - 1].year);
            }
        } catch (error) {
            console.error("gagal fetch pasien", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPasien();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
    
        // Inisialisasi FormData
        const formData = new FormData();
    
        // Memasukkan nilai dari setiap input ke dalam FormData
        formData.append("suspect", event.target.elements.suspect.value);
        formData.append("detect", event.target.elements.detect.value);
        formData.append("treatment", event.target.elements.treatment.value);
        formData.append("recovery", event.target.elements.recovery.value);
        
        let selectedYearValue;
        if (event.target.elements.yearInput.value) {
            selectedYearValue = event.target.elements.yearInput.value;
        } else {
            // Jika tidak, gunakan nilai tahun yang dipilih
            selectedYearValue = selectedYear;
        }
        
        // Memasukkan nilai tahun ke dalam FormData
        formData.append("year", selectedYearValue);
        try {
            // Mengirimkan data ke server
            await updatePasien(formData);
            
            // Memuat ulang data pasien setelah pembaruan berhasil
            fetchPasien();
            
            // Mengosongkan formulir
            event.target.reset();
        } catch (error) {
            console.error("gagal mengirimkan update pasien");
        } finally {
            // Menghentikan status submitting
            setShowOtherYearInput(false)
            setSubmitting(false);
        }
    }
    

    const handleYearChange = (value) => {
        setSelectedYear(value);
        setShowOtherYearInput(value === "Tambah");
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        const filteredValue = value.replace(/[^0-9-]/g, "");
        e.target.value = filteredValue;
    }

    const handleDeleteYear = async () => {
        setShowDeleteModal(false);
        setShowSpinner(true)
        try {
            await deleteYear(deleteId);
            fetchPasien();
        } catch (error) {
            console.error("gagal menghapus tahun");
        }finally{
            setShowSpinner(false)
        }
    }

    return (
        <div className="overflow-x-auto">
            {isLoading ? (
                <LoadingState/>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <DataTable 
                        dataPasien={dataPasien} 
                        handleDelete={(id) => {
                            setDeleteId(id);
                            setShowDeleteModal(true);
                        }} 
                    />
                    <Form 
                        handleSubmit={handleSubmit}
                        dataPasien={dataPasien} 
                        selectedYear={selectedYear} 
                        handleYearChange={handleYearChange} 
                        showOtherYearInput={showOtherYearInput} 
                        handleInputChange={handleInputChange} 
                        submitting={submitting}
                    />
                    <PopupModal
                        title="Apakah Anda yakin menghapus tahun ini?"
                        trueChoice="Confirm"
                        falseChoice="Cancel"
                        isOpen={showDeleteModal}
                        toggleModal={() => setShowDeleteModal(!showDeleteModal)}
                        handleConfirmDelete={handleDeleteYear}
                    />
                    {showSpinner && <SpinnerOverlay />}
                </>
            )}
        </div>
    );
}

const DataTable = ({ dataPasien, handleDelete }) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">Tahun</th>
                    <th className="px-4 py-2">Suspect</th>
                    <th className="px-4 py-2">Terdeteksi</th>
                    <th className="px-4 py-2">Pengobatan</th>
                    <th className="px-4 py-2">Sembuh</th>
                </tr>
            </thead>
            <tbody>
                {dataPasien && dataPasien.totalPerYear.map((yearData) => (
                    <tr key={yearData.id} className="text-center">
                        <td className="px-4 py-2">
                            <i 
                                className="text-red-500 mx-3 fa-xs fas fa-trash-alt hover:text-red-600 cursor-pointer" 
                                onClick={() => handleDelete(yearData.id)} 
                            />
                            {yearData.year}
                        </td>
                        <td className="px-4 py-2">{yearData.total_suspect}</td>
                        <td className="px-4 py-2">{yearData.total_detect}</td>
                        <td className="px-4 py-2">{yearData.total_treatment}</td>
                        <td className="px-4 py-2">{yearData.total_recovery}</td>
                    </tr>
                ))}
                {dataPasien && dataPasien.totalAllYears && (
                    <tr className="font-semibold text-center">
                        <td className="px-4 py-2">Total</td>
                        <td className="px-4 py-2">{dataPasien.totalAllYears.total_suspect}</td>
                        <td className="px-4 py-2">{dataPasien.totalAllYears.total_detect}</td>
                        <td className="px-4 py-2">{dataPasien.totalAllYears.total_treatment}</td>
                        <td className="px-4 py-2">{dataPasien.totalAllYears.total_recovery}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

const Form = ({ handleSubmit, selectedYear, handleYearChange, showOtherYearInput, handleInputChange,dataPasien,submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <table className="w-full">
                <tbody>
                    <tr className="font-semibold">
                        <td className="px-4 py-2 w-1/5">
                            <YearSelector 
                                dataPasien={dataPasien} 
                                selectedYear={selectedYear} 
                                handleYearChange={handleYearChange} 
                                showOtherYearInput={showOtherYearInput} 
                                handleInputChange={handleInputChange}
                            />
                        </td>
                        <td className="px-4 py-2 w-auto">
                            <InputField id="suspect" name="suspect" placeholder="Input Suspect" handleInputChange={handleInputChange} />
                        </td>
                        <td className="px-4 py-2 w-auto">
                            <InputField id="detect" name="detect" placeholder="Input Detect" handleInputChange={handleInputChange} />
                        </td>
                        <td className="px-4 py-2 w-auto">
                            <InputField id="treatment" name="treatment" placeholder="Input Treatment" handleInputChange={handleInputChange} />
                        </td>
                        <td className="px-4 py-2 w-auto">
                            <InputField id="recovery" name="recovery" placeholder="Input Recovery" handleInputChange={handleInputChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <SubmitButton submitting={submitting} />
        </form>
    );
};

const InputField = ({ id, name, placeholder, handleInputChange }) => {
    return (
        <input 
            type="text" 
            id={id} 
            name={name} 
            placeholder={placeholder} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2" 
            onChange={handleInputChange}
        />
    );
};

const YearSelector = ({ dataPasien, selectedYear, handleYearChange, showOtherYearInput,handleInputChange }) => {
    // Fungsi untuk menangani perubahan nilai selectedYear dari select atau input teks

    return (
        <div className="flex flex-col items-center justify-center">
            {dataPasien && dataPasien.totalPerYear.length > 0 && (
                <select 
                    id="year" 
                    value={selectedYear} 
                    onChange={(e) => handleYearChange(e.target.value)} // Menggunakan fungsi handleYearChange untuk mengatur nilai selectedYear
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                >
                    {dataPasien.totalPerYear.map((yearData, index) => (
                        <option key={index} value={yearData.year}>{yearData.year}</option>
                    ))}
                    <option value="Tambah">Tahun Baru</option>
                </select>
            )}
            {(dataPasien.totalPerYear.length === 0 || showOtherYearInput) && (
                <input 
                    type="text" 
                    id="yearInput" 
                    name="year" 
                    placeholder="Input Year" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2" 
                    onChange={handleInputChange} // Menggunakan fungsi handleYearInputChange untuk menangani perubahan nilai input teks
                />
            )}
        </div>
    );
};

export default Pasien;