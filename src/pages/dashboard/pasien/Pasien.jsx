import React, { useState, useEffect } from 'react';
import { getPasien, updatePasien } from '../../../API/PasienAPI';

const Pasien = () => {
    const [dataPasien, setDataPasien] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState("");
    const [showOtherYearInput, setShowOtherYearInput] = useState(false);

    const fetchPasien = async () => {
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
            <form onSubmit={handleSubmit}>
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
                            <tr key={index} className="text-center">
                                <td className="px-4 py-2">{yearData.year}</td>
                                <td className="px-4 py-2">{yearData.total_suspect}</td>
                                <td className="px-4 py-2">{yearData.total_detect}</td>
                                <td className="px-4 py-2">{yearData.total_treatment}</td>
                                <td className="px-4 py-2">{yearData.total_recovery}</td>
                            </tr>
                        ))}
                        <tr className="font-semibold text-center">
                            <td className="px-4 py-2">Total</td>
                            <td className="px-4 py-2">{dataPasien.totalAllYears.total_suspect}</td>
                            <td className="px-4 py-2">{dataPasien.totalAllYears.total_detect}</td>
                            <td className="px-4 py-2">{dataPasien.totalAllYears.total_treatment}</td>
                            <td className="px-4 py-2">{dataPasien.totalAllYears.total_recovery}</td>
                        </tr>
                        <tr className="font-semibold text-center">
                            <td className="px-4 py-2">
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
                            </td>
                            <td className="px-4 py-2">
                                <input 
                                    type="text" 
                                    name="suspect" 
                                    placeholder="Input Suspect" 
                                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2" 
                                    onChange={handleInputChange} // Menambahkan event listener
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input 
                                    type="text" 
                                    name="detect" 
                                    placeholder="Input Detect" 
                                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2" 
                                    onChange={handleInputChange} // Menambahkan event listener
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input 
                                    type="text" 
                                    name="treatment" 
                                    placeholder="Input Treatment" 
                                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2" 
                                    onChange={handleInputChange} // Menambahkan event listener
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input 
                                    type="text" 
                                    name="recovery" 
                                    placeholder="Input Recovery" 
                                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2" 
                                    onChange={handleInputChange} // Menambahkan event listener
                                />
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
        </div>
    );
}

export default Pasien;