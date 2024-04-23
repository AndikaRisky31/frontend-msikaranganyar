import React, { useState } from 'react';
import { Document, Page } from '@react-pdf/renderer';

const PdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={1} />
            </Document>
        </div>
    );
};

export default PdfViewer;