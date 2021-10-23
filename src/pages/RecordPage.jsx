import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useApi } from "../contexts/ApiContext";
import { PDFViewer } from "@react-pdf/renderer";
import RecordPdf from "../components/record/RecordPdf";
import useWindowDimensions from "../hooks/UseDimens";
import { Container, Button } from "@material-ui/core";
import SignatureDialog from "../components/record/SignatureDialog";

function RecordPage() {
  const { height, width } = useWindowDimensions();
  const [pdfWidth, setPdfWidth] = useState();
  const [pdfHeight, setPdfHeight] = useState();
  let history = useHistory();
  const { id } = useParams();
  const { user, apiGet } = useApi();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSignButton, setShowSignButton] = useState(false);
  const [openSignDialog, setOpenSignDialog] = useState(false);

  function showSignDialog() {
    setOpenSignDialog(true);
  }

  function handleSignDialogClose(success) {
    setOpenSignDialog(false);
    if (success) window.location.reload();
  }

  useEffect(() => {
    function onProjectLoaded(data) {
      console.log(data);
      setProject(data);

      var userHasntSigned =
        data.userList.filter((u) => user.id === u.id)[0].signature === null;

      setShowSignButton(userHasntSigned);

      var bottomMargin;
      if (userHasntSigned) {
        bottomMargin = 90;
      } else {
        bottomMargin = 49;
      }

      setPdfWidth(width - 4);
      setPdfHeight(height - bottomMargin);

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
        <>
          <PDFViewer width={pdfWidth} height={pdfHeight}>
            <RecordPdf project={project} />
          </PDFViewer>
          {showSignButton ? (
            <Container component="article">
              <Button onClick={showSignDialog} fullWidth>
                Assinar
              </Button>
              <SignatureDialog
                open={openSignDialog}
                handleClose={handleSignDialogClose}
                project={project}
              />
            </Container>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default RecordPage;
