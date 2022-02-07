import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jobpostingActions, candidateActions } from "../actions";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

const jobpostingSelector = (state) => state.jobposting.jobpostingList;
const candidateSelector = (state) => state.candidate.candidateList;

function JobsTable() {
  const jobpostingList = useSelector(jobpostingSelector);
  const candidateList = useSelector(candidateSelector);

  const [postingId, setPostingId] = useState(0);
  const [postingDescription, setPostingDescription] = useState("");
  const [postingDeadline, setPostingDeadline] = useState({ date: new Date() });

  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(0);
  const [listDialog, setDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);

  useEffect(() => {
    dispatch(jobpostingActions.getJobPostings());
  }, [dispatch]);

  const renderDialog = () => {
    if (candidateList.length > 0) {
      return (
        <DataTable value={candidateList} responsiveLayout="scroll">
          <Column field="name" header="Name"></Column>
          <Column field="role" header="Role"></Column>
          <Column body={opsDetail}></Column>
        </DataTable>
      );
    } else {
      return <h3>Entitatea nu are copii</h3>;
    }
  };
  const showAddDialog = () => {
    setAddDialog(true);
    setIsNewRecord(true);
  };

  const showEditDialog = (rowData) => {
    setPostingId(rowData.id);
    setPostingDescription(rowData.name);
    setPostingDeadline(rowData.speed);
    setAddDialog(true);
    setIsNewRecord(false);
  };

  const expand = (rowData) => {
    setDialog(true);
    dispatch(candidateActions.getCandidates(rowData.id));
  };

  const hideDialog = () => {
    setDialog(false);
    setAddDialog(false);
    setPostingId(0);
    setPostingDescription("");
    setPostingDeadline(0);
  };
  const handleDeleteClick = (rowData) => {
    dispatch(jobpostingActions.deleteJobPosting(rowData.id));
  };

  const handleSaveClick = () => {
    if (isNewRecord) {
      dispatch(
        jobpostingActions.addJobPosting({
          id: postingId,
          name: postingDescription,
          speed: postingDeadline,
        })
      );
    } else {
      dispatch(
        jobpostingActions.updateJobPosting(postingId, {
          id: postingId,
          name: postingDescription,
          speed: postingDeadline,
        })
      );
    }
  };

  const dialogFooter = (
    <div>
      <Button label="Save" icon="pi pi-save" onClick={handleSaveClick} />
    </div>
  );

  const opsDetail = (rowData) => {
    return (
      <>
        <Button label="Edit" icon="pi pi-pencil" />
        <span> </span>
        <Button
          label="Delete"
          icon="pi pi-times"
          className="p-button p-button-danger"
        />
      </>
    );
  };

  const ops = (rowData) => {
    return (
      <>
        <Button
          label="Detail"
          icon="pi pi-search"
          onClick={() => expand(rowData)}
        />
        <span> </span>
        <Button
          label="Edit"
          icon="pi pi-pencil"
          onClick={() => showEditDialog(rowData)}
        />
        <span> </span>
        <Button
          label="Delete"
          icon="pi pi-times"
          className="p-button p-button-danger"
          onClick={() => handleDeleteClick(rowData)}
        />
      </>
    );
  };

  return (
    <div>
      <Dialog
        header="JobPosting"
        visible={addDialog}
        onHide={hideDialog}
        footer={dialogFooter}
      >
        <div>
          <InputText
            placeholder="id"
            onChange={(evt) => setPostingId(evt.target.value)}
            value={postingId}
          />
        </div>
        <div>
          <InputText
            placeholder="name"
            onChange={(evt) => setPostingDescription(evt.target.value)}
            value={postingDescription}
          />
        </div>
        <div>
          <InputText
            placeholder="Deadline"
            onChange={(evt) => setPostingDeadline(evt.target.value)}
            value={postingDeadline}
          />
        </div>
      </Dialog>
      <DataTable value={jobpostingList} responsiveLayout="scroll">
        <Column field="description" header="Description"></Column>
        <Column field="deadline" header="Deadline"></Column>
        <Column body={ops} />
      </DataTable>
      <Button
        label="Add JobPosting"
        icon="pi pi-plus"
        onClick={showAddDialog}
      ></Button>
      <Dialog visible={listDialog} onHide={hideDialog}>
        {renderDialog()}
      </Dialog>
    </div>
  );
}

export default JobsTable;
