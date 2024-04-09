import React, { useState, useEffect } from 'react';
import { getPasien, updatePasien } from '../../../API/PasienAPI';

const YearSelector = ({ dataPasien, selectedYear, handleYearChange, showOtherYearInput }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <select 
                value={selectedYear} 
                onChange={handleYearChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
            >
                {dataPasien && dataPasien.totalPerYear.map((yearData, index) => (
                    <option key={index} value={yearData.year}>{yearData.year}</option>
                ))}
                <option value="Other">Tahun Baru</option>
            </select>
            {showOtherYearInput && 
                <input 
                    type="text" 
                    name="year" 
                    placeholder="Input Year" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2" 
                />
            }
        </div>
    );
};

const InputField = ({ name, placeholder, handleInputChange }) => {
    return (
        <input 
            type="text" 
            name={name} 
            placeholder={placeholder} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2" 
            onChange={handleInputChange}
        />
    );
};

const DataTable = ({ dataPasien }) => {
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
                {dataPasien && dataPasien.totalPerYear.map((yearData, index) => (
                    <tr key={yearData.id} className="text-center">
                        <td className="px-4 py-2"><i className="text-red-500 mx-2 fa-sm fas fa-trash-alt hover:text-red-600 cursor-pointer" />{yearData.year}</td>
                        <td className="px-4 py-2">{yearData.total_suspect}</td>
                        <td className="px-4 py-2">{yearData.total_detect}</td>
                        <td className="px-4 py-2">{yearData.total_treatment}</td>
                        <td className="px-4 py-2">{yearData.total_recovery}</td>
                    </tr>
                ))}
                {dataPasien && dataPasien.totalAllYears && // Menambahkan pengecekan
                    <tr className="font-semibold text-center">
                        <td className="px-4 py-2">Total</td>
                        <td className="px-4 py-2">{dataPasien.totalAllYears.total_suspect}</td>
                        <td className="px-4 py-2">{dataPasien.totalAllYears.total_detect}</td>
                        <td className="px-4 py-2">{dataPasien.totalAllYears.total_treatment}</td>
                        <td className="px-4 py-2">{dataPasien.totalAllYears.total_recovery}</td>
                    </tr>
                }
            </tbody>
        </table>
    );
};


const Form = ({ handleSubmit, selectedYear, handleYearChange, showOtherYearInput, handleInputChange,dataPasien }) => {
    return (
        <form onSubmit={handleSubmit}>
            <table className="table-auto w-full">
                <tbody>
                    <tr className="font-semibold text-center">
                        <td className="px-4 py-2">
                        <YearSelector 
                            dataPasien={dataPasien} 
                            selectedYear={selectedYear} 
                            handleYearChange={handleYearChange} 
                            showOtherYearInput={showOtherYearInput} 
                        />
                        </td>
                        <td className="px-4 py-2">
                            <InputField name="suspect" placeholder="Input Suspect" handleInputChange={handleInputChange} />
                        </td>
                        <td className="px-4 py-2">
                            <InputField name="detect" placeholder="Input Detect" handleInputChange={handleInputChange} />
                        </td>
                        <td className="px-4 py-2">
                            <InputField name="treatment" placeholder="Input Treatment" handleInputChange={handleInputChange} />
                        </td>
                        <td className="px-4 py-2">
                            <InputField name="recovery" placeholder="Input Recovery" handleInputChange={handleInputChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button 
                type="submit" 
                className="m-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    );
};


const Pasien = () => {
    const [dataPasien, setDataPasien] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState("");
    const [showOtherYearInput, setShowOtherYearInput] = useState(false);

    const fetchPasien = async () => {
        setIsLoading(true);
        try {
            const PasienData = await getPasien();
            setDataPasien(PasienData);
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

    useEffect(() => {
        if (dataPasien && dataPasien.totalPerYear.length > 0) {
            setSelectedYear(dataPasien.totalPerYear[dataPasien.totalPerYear.length - 1].year);
        }
    }, [dataPasien]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("suspect", event.target.elements.suspect.value);
        formData.append("detect", event.target.elements.detect.value);
        formData.append("treatment", event.target.elements.treatment.value);
        formData.append("recovery", event.target.elements.recovery.value);

        let selectedYearValue;
        if (selectedYear === "Other") {
            selectedYearValue = event.target.elements.year.value;
        } else {
            selectedYearValue = selectedYear;
        }
        formData.append("year", selectedYearValue);

        try {
            await updatePasien(formData);
            fetchPasien();
            event.target.reset();
        } catch (error) {
            console.error("gagal mengirimkan update pasien");
        }
    }

    const handleYearChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedYear(selectedValue);
        setShowOtherYearInput(selectedValue === "Other");
    }

    // Fungsi untuk memastikan hanya angka dan tanda minus yang diterima
    const handleInputChange = (e) => {
        const { value } = e.target;
        const filteredValue = value.replace(/[^0-9-]/g, ""); // Hanya membiarkan angka dan tanda minus
        e.target.value = filteredValue;
    }

    return (
        <div className="overflow-x-auto">
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <DataTable dataPasien={dataPasien} />
                    <Form 
                        handleSubmit={handleSubmit}
                        dataPasien={dataPasien} 
                        selectedYear={selectedYear} 
                        handleYearChange={handleYearChange} 
                        showOtherYearInput={showOtherYearInput} 
                        handleInputChange={handleInputChange} 
                    />
                </>
            )}
        </div>
    );
}

export default Pasien;