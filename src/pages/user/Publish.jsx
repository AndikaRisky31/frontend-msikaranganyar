import React, { useState, useEffect } from 'react';
import DocumentCard from '../../components/card/DocumentCard';
import LaporanTahunan from '../../components/card/LaporanTahunan';
import TBPediaCard from '../../components/card/TBPediaCard';
import { getDocumentByPage } from '../../API/DocumentAPI';
import HeadingOnly from '../../components/common/heading/HeadingOnly';
import EmptyState from '../../components/modal/EmptyState';
import LoadingState from '../../components/modal/LoadingState'; // Import komponen LoadingState

const Publish = () => {
    const [listTbPedia, setListTbPedia] = useState([]);
    const [listLaporan, setListLaporan] = useState([]);
    const [listDokumen, setListDokumen] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // State untuk menampilkan status loading

    const fetchTbPedia = async (page = 1) => {
        try {
            const data = await getDocumentByPage('tbpedia', page, 5);
            setListTbPedia(data.dokumen);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching TbPedia:', error);
        }
    };

    const fetchLaporan = async () => {
        try {
            const data = await getDocumentByPage('tahunan', 1);
            setListLaporan(data.dokumen);
        } catch (error) {
            console.error('Error fetching laporan:', error);
        }
    };

    const fetchDokumen = async () => {
        try {
            const data = await getDocumentByPage('dokumen', 1);
            setListDokumen(data.dokumen);
        } catch (error) {
            console.error('Error fetching dokumen:', error);
        }
    };

    const nextPage = () => {
        const nextPageNumber = Math.min(currentPage + 1, totalPages);
        setCurrentPage(nextPageNumber);
        fetchTbPedia(nextPageNumber);
    };

    const prevPage = () => {
        const prevPageNumber = Math.max(currentPage - 1, 1);
        setCurrentPage(prevPageNumber);
        fetchTbPedia(prevPageNumber);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([fetchTbPedia(), fetchLaporan(), fetchDokumen()]);
                setIsLoading(false); // Setelah semua data terambil, atur status loading menjadi false
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toPdf = (data) => {
        window.open(`${process.env.REACT_APP_IMAGE_URL}${data.nama_file}`, '_blank');
    };

    return (
        <>
            {isLoading ? ( // Tampilkan komponen LoadingState saat data sedang dimuat
                <LoadingState />
            ) : (
                <div className="m-auto w-[90%] md:max-w-[85%] mt-10">
                    {(listLaporan && listLaporan.length > 0) ? (
                        <div>
                            <HeadingOnly title="Laporan Tahunan"/>
                            <div className="mx-auto">
                                <div className="flex overflow-x-auto snap-mandatory snap-x justify-start gap-5">
                                    {listLaporan.map((blog) => (
                                        <div key={blog.id} className="snap-start mx-2">
                                            <LaporanTahunan Document={blog} toPdf={() => toPdf(blog)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {(listDokumen && listDokumen.length > 0) ? (
                        <div className="mt-10">
                            <HeadingOnly title="Dokumen Publish"/>
                            <div className="mx-auto">
                                <div className="flex overflow-x-auto snap-mandatory snap-x justify-start gap-5">
                                    {listDokumen.map((blog) => (
                                        <div key={blog.id} className="snap-start mx-2">
                                            <DocumentCard Document={blog} toPdf={() => toPdf(blog)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {(listTbPedia && listTbPedia.length > 0) ? (
                        <div className="mt-10">
                            <HeadingOnly title="TBPedia"/>      
                            <div className="mx-auto">
                                <div className="flex flex-col">
                                    {listTbPedia.map((blog) => (
                                        <div key={blog.id} className="snap-start mx-2">
                                            <TBPediaCard Document={blog} toPdf={() => toPdf(blog)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {(listLaporan.length === 0 && listDokumen.length === 0 && listTbPedia.length === 0) && (
                        <EmptyState dataName="Dokumen"/>
                    )}
                    {(listTbPedia && listTbPedia.length > 0) && (
                        <div className="flex justify-center mt-6">
                            <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Previous</button>
                            <span className="text-lg font-bold">{currentPage} / {totalPages}</span>
                            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Next</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );    
};

export default Publish;