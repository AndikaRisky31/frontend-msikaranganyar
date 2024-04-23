import PdfViewer from "../item/PdfViewer"

const TBPediaCard = ({Document})=>{
    return(
        <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <PdfViewer pdfUrl={process.env.REACT_APP_IMAGE_URL + '/uploads/dokumen/03dfe6fc-a17a-4ebe-9611-7d2027bf00d5.pdf'} />
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">2023</p>
                <div className="my-1">
                    <p className="text-base md:text-xl font-avenir text-gray-500 cursor-pointer hover:tracking-widest duration-500">Selengkapnya <i className="fas fa-arrow-right"></i></p>
                </div>
            </div>
        </a>
    )
}
export default TBPediaCard