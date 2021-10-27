import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  Button,
} from "@material-ui/core";
import GpfTextField from "../core/GpfTextfield";
import GpfSelect from "../core/GpfSelect";
import { RecordEvaluation } from "../../models/record";

function RecordInfoDialog({ open, handleClose, record }) {
  const [thesisId, setThesisId] = useState("");
  const [thesisDate, setThesisDate] = useState("");
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeDescription, setGradeDescription] = useState("");

  function updateRecord() {
    record.thesisId = thesisId;
    record.thesisDate = thesisDate;
    record.beginTime = beginTime + ":00";
    record.endTime = endTime + ":00";
    record.location = location;
    record.evaluation = evaluation;
    record.deadline = deadline;
    record.grade = grade.replace(",", ".");
    record.gradeDescription = gradeDescription;

    handleClose(record);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={(event) => {
          event.stopPropagation();
          handleClose(null);
        }}
        fullWidth
      >
        <DialogTitle>Dados da ata</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                updateRecord();
              }}
            >
              <GpfTextField
                id="thesis_id"
                label="Número da defesa"
                value={thesisId}
                onChange={setThesisId}
                required
              />
              <GpfTextField
                id="thesis_date"
                label="Data"
                value={thesisDate}
                onChange={setThesisDate}
                type="date"
                shrinkLabel
                required
              />
              <GpfTextField
                id="begin_time"
                label="Início"
                value={beginTime}
                onChange={setBeginTime}
                type="time"
                shrinkLabel
                required
              />
              <GpfTextField
                id="end_time"
                label="Término"
                value={endTime}
                onChange={setEndTime}
                type="time"
                shrinkLabel
                required
              />
              <GpfTextField
                id="location"
                label="Local"
                value={location}
                onChange={setLocation}
                required
              />
              <GpfSelect
                id="evaluation"
                label="Avaliação"
                options={RecordEvaluation}
                value={evaluation}
                onChange={setEvaluation}
                required
              />
              {evaluation === "PASSED_WITH_MODIFICATIONS" ? (
                <GpfTextField
                  id="deadline"
                  label="Prazo"
                  value={deadline}
                  onChange={setDeadline}
                  required
                />
              ) : (
                <></>
              )}
              <GpfTextField
                id="grade"
                label="Grau obtido"
                value={grade}
                onChange={setGrade}
                type="number"
                required
              />
              <GpfTextField
                id="grade_description"
                label="Grau por extenso"
                value={gradeDescription}
                onChange={setGradeDescription}
                required
              />
              <Button color="primary" type="submit" fullWidth>
                Gerar
              </Button>
            </form>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={(event) => {
              event.preventDefault();
              handleClose(null);
            }}
            fullWidth
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RecordInfoDialog;
