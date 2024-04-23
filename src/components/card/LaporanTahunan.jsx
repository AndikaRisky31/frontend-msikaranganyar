const LaporanTahunan = () =>{
    return(
        <>
            <div className="flex items-center justify-center h-56 w-56 rounded-lg bg-white border border-red-700">
                <div className="text-center">
                    <h1 className="text-xl font-avenir font-thin">Laporan Tahunan</h1>
                    <h1 className="text-4xl ">2023</h1>
                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium font-avenir rounded-full text-lg px-5 py-2.5 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Download PDF<i className="fas fa-download"></i></button>
                </div>
            </div>
        </>
    )
}
export default LaporanTahunan