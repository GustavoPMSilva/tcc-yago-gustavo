import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useApi } from "../contexts/ApiContext";
import { PDFViewer } from "@react-pdf/renderer";
import RecordPdf from "../components/record/RecordPdf";
import useWindowDimensions from "../hooks/UseDimens";

function RecordPage() {
  const { height, width } = useWindowDimensions();
  let history = useHistory();
  const { id } = useParams();
  const { apiGet } = useApi();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onProjectLoaded(data) {
      console.log(data);
      setProject(data);
      setLoading(false);
    }

    function onError(error) {
      history.push("/404");
    }

    apiGet(`project/${id}`, onProjectLoaded, onError);
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <PDFViewer width={width - 4} height={height - 49}>
          <RecordPdf project={project} />
        </PDFViewer>
      )}
    </>
  );
}

export default RecordPage;
