import { useState, useEffect } from 'react';
import DocumentCard from '../../components/card/DocumentCard';
import LaporanTahunan from '../../components/card/LaporanTahunan';
import TBPediaCard from '../../components/card/TBPediaCard';
import {getDocumentByPage} from '../../API/DocumentAPI';
import Heading from '../../components/common/heading/Heading';

const Publish = () => {
    const [listTbPedia, setListTbPedia] = useState([]);
    const [listLaporan, setListLaporan] = useState([]);
    const [dokumen, setListDokumen] = useState([]);

    const fetchTbPedia = async () => {
        try {
            const data = await getDocumentByPage(1,5,'tbpedia'); // Mengambil data TbPedia dengan halaman 1 dan batasan 10
            setListTbPedia(data.dokumen); // Menyimpan data TbPedia ke state
        } catch (error) {
            console.error('Error fetching TbPedia:', error);
        }
    };

    const fetchLaporan = async () => {
        try {
            const data = await getDocumentByPage(1, 10,'tahunan'); // Mengambil data laporan dengan halaman 1 dan batasan 10
            setListLaporan(data.dokumen); // Menyimpan data laporan ke state
        } catch (error) {
            console.error('Error fetching laporan:', error);
        }
    };

    const fetchDokumen = async () => {
        try {
            const data = await getDocumentByPage(1, 10,'dokumen'); // Mengambil data dokumen dengan halaman 1 dan batasan 10
            setListDokumen(data.dokumen); // Menyimpan data dokumen ke state
        } catch (error) {
            console.error('Error fetching dokumen:', error);
        }
    };

    useEffect(() => {
        fetchTbPedia(); // Mengambil data TbPedia saat komponen dipasang
        fetchLaporan(); // Mengambil data laporan saat komponen dipasang
        fetchDokumen(); // Mengambil data dokumen saat komponen dipasang
    }, []); // Menjalankan efek sekali saat komponen dipasang

    return (
        <>
        <div className="m-auto max-w-[90%] mt-10">
            <Heading subtitle="Berita" title="TBPedia" link="#" />
            <div className="mx-auto">
              <div className="flex overflow-x-auto snap-mandatory snap-x justify-start">
                {listTbPedia.map((blog) => (
                  <div key={blog.id} className="snap-start mx-2">
                    <TBPediaCard Document={blog} />
                  </div>
                ))}
              </div>
            </div>
          </div>
            {/* <LaporanTahunan data={listLaporan} />
            <DocumentCard data={dokumen} />
            <TBPediaCard data={listTbPedia} /> */}
        </>
    );
};

export default Publish;