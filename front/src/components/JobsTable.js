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

  const [selectedId, setSelectedId] = useState(0);

  const [postingId, setPostingId] = useState(0);
  const [postingDescription, setPostingDescription] = useState("");
  const [postingDeadline, setPostingDeadline] = useState({ date: new Date() });

  const [candidateId, setCandidateId] = useState(0);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateCv, setCandidateCv] = useState("");
  const [candidateJobId, setCandidateJobId] = useState(0);
  const [isNewCandidate, setIsNewCandidate] = useState(false);
  const [asc, setAsc] = useState(0);
  const [listDialog, setDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [cvDialog, setCvDialog] = useState(false);
  const [cv, setCv] = useState("");
  const [candidateDialog, setCandidateDialog] = useState(false);
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

  const setDeadline = (value) => {
    setPostingDeadline({ date: value });
  };

  useEffect(() => {
    dispatch(jobpostingActions.getJobPostings());
  }, [dispatch]);

  const hideCv = () => {
    setCvDialog(false);
    setDialog(true);
  };
  const openCV = (rowData) => {
    setCv(rowData.cv);
    setCvDialog(true);
  };
  const renderCV = () => {
    return <div>{cv}</div>;
  };

  const hideCandidate = () => {
    setCandidateDialog(false);
  };
  const showCandidate = (rowData) => {
    setCandidateId(rowData.id);
    setCandidateName(rowData.name);
    setCandidateEmail(rowData.email);
    setCandidateCv(rowData.cv);
    setCandidateJobId(rowData.jobPostingId);
    setCandidateDialog(true);
    setIsNewCandidate(false);
  };

  const addCandidate = (rowData) => {
    setCandidateId(0);
    setCandidateName("");
    setCandidateEmail("");
    setCandidateCv("");
    setCandidateJobId(0);
    setCandidateDialog(true);
    setIsNewCandidate(true);
  };

  const showAddDialog = () => {
    setAddDialog(true);
    setIsNewRecord(true);
  };

  const sortFromBack = () => {
    if (asc === 0) {
      setAsc(1);
    } else {
      setAsc(0);
    }
    dispatch(jobpostingActions.getSortedJobPostings(asc));
  };

  const showEditDialog = (rowData) => {
    setPostingId(rowData.id);
    setPostingDescription(rowData.description);
    setPostingDeadline({ date: new Date(rowData.deadline) });
    setAddDialog(true);
    setIsNewRecord(false);
  };

  const expand = (rowData) => {
    setSelectedId(rowData.id);
    setDialog(true);
    try {
      dispatch(candidateActions.getCandidates(rowData.id));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(jobpostingActions.getJobPostings());
  }, [dispatch]);

  const hideDialog = () => {
    setDialog(false);
    setAddDialog(false);
    setPostingId(0);
    setPostingDescription("");
    setPostingDeadline({ date: new Date() });
  };
  const handleDeleteClick = (rowData) => {
    dispatch(jobpostingActions.deleteJobPosting(rowData.id));
  };

  const handleSaveClick = () => {
    if (isNewRecord) {
      dispatch(
        jobpostingActions.addJobPosting({
          id: postingId,
          description: postingDescription,
          deadline: postingDeadline.date,
        })
      );
    } else {
      dispatch(
        jobpostingActions.updateJobPosting(postingId, {
          id: postingId,
          description: postingDescription,
          deadline: postingDeadline.date,
        })
      );
    }
  };
  const startFilter = () => {
    if (filter !== "") {
    }
  };

  const handleCandidateDelete = (rowData) => {
    dispatch(
      candidateActions.deleteCandidate(rowData.jobPostingId, rowData.id)
    );
    dispatch(candidateActions.getCandidates(rowData.id));
  };

  const handleCandidateSaveClick = () => {
    if (isNewCandidate) {
      dispatch(
        candidateActions.addCandidate(
          {
            id: candidateId,
            name: candidateName,
            cv: candidateCv,
            email: candidateEmail,
            jobPostingId: candidateJobId,
          },
          candidateJobId
        )
      );
    } else {
      dispatch(
        candidateActions.updateCandidate(
          candidateId,
          {
            id: candidateId,
            name: candidateName,
            cv: candidateCv,
            email: candidateEmail,
            jobPostingId: candidateJobId,
          },
          candidateJobId
        )
      );
    }
    dispatch(candidateActions.getCandidates(selectedId));
  };

  const candidateFooter = (
    <div>
      <Button
        label="Save"
        icon="pi pi-save"
        onClick={handleCandidateSaveClick}
      />
    </div>
  );

  const dialogFooter = (
    <div>
      <Button label="Save" icon="pi pi-save" onClick={handleSaveClick} />
    </div>
  );

  const renderDialog = () => {
    if (candidateList.length > 0) {
      return (
        <>
          <DataTable value={candidateList} responsiveLayout="scroll">
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column body={opsDetail}></Column>
          </DataTable>
          <Button
            label="Add Candidate"
            icon="pi pi-plus"
            onClick={addCandidate}
          ></Button>
          <Dialog header="CV" visible={cvDialog} onHide={hideCv}>
            {renderCV()}
          </Dialog>
          <Dialog
            header="Candidate"
            visible={candidateDialog}
            onHide={hideCandidate}
            footer={candidateFooter}
          >
            <div>
              <InputText
                placeholder="Id"
                onChange={(evt) => setCandidateId(evt.target.value)}
                value={candidateId}
              />
            </div>
            <div>
              <InputText
                placeholder="Name"
                onChange={(evt) => setCandidateName(evt.target.value)}
                value={candidateName}
              />
            </div>
            <div>
              <InputText
                placeholder="Email"
                onChange={(evt) => setCandidateEmail(evt.target.value)}
                value={candidateEmail}
              />
            </div>
            <div>
              <InputText
                placeholder="Cv"
                onChange={(evt) => setCandidateCv(evt.target.value)}
                value={candidateCv}
              />
            </div>
            <div>
              <InputText
                placeholder="JobPostingId"
                onChange={(evt) => setCandidateJobId(evt.target.value)}
                value={candidateJobId}
              />
            </div>
          </Dialog>
        </>
      );
    } else {
      return (
        <div>
          <h3>Nu exista candidati</h3>
          <Button
            label="Add Candidate"
            icon="pi pi-plus"
            onClick={addCandidate}
          ></Button>
          <Dialog
            header="Candidate"
            visible={candidateDialog}
            onHide={hideCandidate}
            footer={candidateFooter}
          >
            <div>
              <InputText
                placeholder="Id"
                onChange={(evt) => setCandidateId(evt.target.value)}
                value={candidateId}
              />
            </div>
            <div>
              <InputText
                placeholder="Name"
                onChange={(evt) => setCandidateName(evt.target.value)}
                value={candidateName}
              />
            </div>
            <div>
              <InputText
                placeholder="Email"
                onChange={(evt) => setCandidateEmail(evt.target.value)}
                value={candidateEmail}
              />
            </div>
            <div>
              <InputText
                placeholder="Cv"
                onChange={(evt) => setCandidateCv(evt.target.value)}
                value={candidateCv}
              />
            </div>
            <div>
              <InputText
                placeholder="JobPostingId"
                onChange={(evt) => setCandidateJobId(evt.target.value)}
                value={candidateJobId}
              />
            </div>
          </Dialog>
        </div>
      );
    }
  };

  const opsDetail = (rowData) => {
    return (
      <>
        <Button label="CV" icon="pi pi-book" onClick={() => openCV(rowData)} />
        <span> </span>
        <Button
          label="Edit"
          icon="pi pi-pencil"
          onClick={() => showCandidate(rowData)}
        />
        <span> </span>
        <Button
          label="Delete"
          icon="pi pi-times"
          className="p-button p-button-danger"
          onClick={() => handleCandidateDelete(rowData)}
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
            placeholder="Id"
            onChange={(evt) => setPostingId(evt.target.value)}
            value={postingId}
          />
        </div>
        <div>
          <InputText
            placeholder="Description"
            onChange={(evt) => setPostingDescription(evt.target.value)}
            value={postingDescription}
          />
        </div>
        <div>
          <Calendar
            inline
            value={postingDeadline.date}
            onChange={(e) => setDeadline(e.value)}
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
      <span> </span>
      <Button label="Asc/Desc" onClick={sortFromBack}></Button>
      <Dialog visible={listDialog} onHide={hideDialog} header="Candidates">
        {renderDialog()}
      </Dialog>
      <span> </span>
      <InputText
        placeholder="Filter Description"
        onChange={(evt) => {
          setFilter(evt.target.value);
          startFilter();
        }}
      />
    </div>
  );
}

export default JobsTable;
