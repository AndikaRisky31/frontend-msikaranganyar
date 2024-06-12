import React from "react";
const EmptyState = ({ dataName, create }) => {
    return (
        <div className="mx-auto px-10 py-4 bg-white">
            <div></div>
            <div className="flex flex-col justify-center items-center">
                <img className="w-1/2" src="/images/Nodata-amico.png" alt="No data" />
                <p className="text-xl font-semibold text-gray-600 mb-2">{dataName} kosong</p>
                <p className="text-gray-500 text-center mb-6">Tidak ada data yang bisa ditampilkan</p>
                {/* Tampilkan tombol hanya jika prop create memiliki nilai (fungsi) */}
                {create && (
                    <button onClick={create} className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:bg-blue-600">
                        Tambah {dataName}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
