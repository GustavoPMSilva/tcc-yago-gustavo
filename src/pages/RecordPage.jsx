import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import RecordPdf from "../components/record/RecordPdf";
import useWindowDimensions from "../hooks/UseDimens";

function RecordPage() {
  const { height, width } = useWindowDimensions();

  return (
    <PDFViewer width={width - 4} height={height - 49}>
      <RecordPdf />
    </PDFViewer>
  );
}

export default RecordPage;
