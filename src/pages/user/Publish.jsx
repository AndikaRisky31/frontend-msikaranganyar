import { useState, useEffect } from 'react';
import DocumentCard from '../../components/card/DocumentCard';
import LaporanTahunan from '../../components/card/LaporanTahunan';
import TBPediaCard from '../../components/card/TBPediaCard';
import {getDocumentByPage} from '../../API/DocumentAPI';
import HeadingOnly from '../../components/common/heading/HeadingOnly';

const Publish = () => {
    const [listTbPedia, setListTbPedia] = useState([]);
    const [listLaporan, setListLaporan] = useState([]);
    const [listDokumen, setListDokumen] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTbPedia = async (page = 1) => {
        try {
            const data = await getDocumentByPage('tbpedia', page, 5);
            setListTbPedia(data.dokumen);
            setTotalPages(data.totalPages); // Mengatur total halaman berdasarkan respons API
        } catch (error) {
            console.error('Error fetching TbPedia:', error);
        }
    };

    const fetchLaporan = async () => {
        try {
            const data = await getDocumentByPage('tahunan',1); // Mengambil data laporan dengan halaman 1 dan batasan 10
            setListLaporan(data.dokumen); // Menyimpan data laporan ke state
        } catch (error) {
            console.error('Error fetching laporan:', error);
        }
    };

    const fetchDokumen = async () => {
        try {
            const data = await getDocumentByPage('dokumen',1); // Mengambil data dokumen dengan halaman 1 dan batasan 10
            setListDokumen(data.dokumen); // Menyimpan data dokumen ke state
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
        fetchTbPedia(); // Mengambil data TbPedia saat komponen dipasang
        fetchLaporan(); // Mengambil data laporan saat komponen dipasang
        fetchDokumen(); // Mengambil data dokumen saat komponen dipasang
    }, []); // Menjalankan efek sekali saat komponen dipasang

    const toPdf = (data) => {
        window.open(`${process.env.REACT_APP_IMAGE_URL}${data.nama_file}`, '_blank'); // Membuka URL file PDF dalam tab baru
    };

    return (
        <>
        <div className="m-auto w-[90%] md:max-w-[85%] mt-10">
            {
                listLaporan && listLaporan.length > 0 && (
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
                )
            }
            {
                listDokumen && listDokumen.length > 0 && (
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
                )
            }
            {
                listTbPedia && listTbPedia.length > 0 && (
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
                )}

                {listTbPedia && listTbPedia.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Previous</button>
                        <span className="text-lg font-bold">{currentPage} / {totalPages}</span>
                        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">Next</button>
                    </div>
                )}
          </div>
        </>
    );
};

export default Publish;