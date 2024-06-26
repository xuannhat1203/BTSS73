import { useDispatch, useSelector } from "react-redux";
import "../CSS/index.css";
import React, { useEffect, useState } from "react";
import {
  addJob,
  deleteJob,
  editJob,
  getJobs,
  updateJobStatus,
} from "../store/reducers/render";

export default function Todolist() {
  const jobs = useSelector((state: any) => state.jobs.jobs);
  const [status, setStatus] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const [nameJob, setNameJob] = useState("");
  const [check, setCheck] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    setId(id);
    setStatus(true);
  };

  const confirmDelete = () => {
    if (id !== null) {
      dispatch(deleteJob(id));
      setId(null);
      setStatus(false);
    }
  };

  const cancelDelete = () => {
    setStatus(false);
  };

  const handleEdit = (id: number) => {
    setId(id);
    const find = jobs.find((item: any) => item.id === id);
    setNameJob(find.nameJob);
    setCheck(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameJob(e.target.value);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (check) {
      const jobToEdit = jobs.find((item: any) => item.id === id);
      dispatch(editJob({ id: id!, nameJob, status: jobToEdit.status }));
      setCheck(false);
    } else {
      const newJob: any = {
        nameJob,
        status: false,
      };
      dispatch(addJob(newJob));
    }
    setNameJob("");
    setId(null);
  };

  const handleChecked = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    const find = jobs.find((item: any) => item.id === id);
    dispatch(updateJobStatus({ id, nameJob: find.nameJob, status: checked }));
  };

  // Lọc công việc theo trạng thái
  const filteredJobs = jobs.filter((job: any) => {
    if (filter === "completed") return job.status === true;
    if (filter === "incomplete") return job.status === false;
    return true;
  });

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form
                    className="d-flex justify-content-center align-items-center mb-4"
                    onSubmit={handleAdd}
                  >
                    <div className="form-outline flex-fill">
                      <input
                        type="text"
                        id="form2"
                        className="form-control"
                        placeholder="Nhập tên công việc"
                        onChange={handleChange}
                        value={nameJob}
                      />
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      {check ? "Cập nhật" : "Thêm"}
                    </button>
                  </form>
                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li
                      className="nav-item"
                      role="presentation"
                      onClick={() => setFilter("all")}
                    >
                      <a
                        className={`nav-link ${
                          filter === "all" ? "active" : ""
                        }`}
                      >
                        Tất cả
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      role="presentation"
                      onClick={() => setFilter("completed")}
                    >
                      <a
                        className={`nav-link ${
                          filter === "completed" ? "active" : ""
                        }`}
                      >
                        Đã hoàn thành
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      role="presentation"
                      onClick={() => setFilter("incomplete")}
                    >
                      <a
                        className={`nav-link ${
                          filter === "incomplete" ? "active" : ""
                        }`}
                      >
                        Chưa hoàn thành
                      </a>
                    </li>
                  </ul>
                  {/* Tabs navs */}
                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {filteredJobs.map((job: any, index: number) => (
                          <li
                            key={index}
                            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                checked={job.status}
                                onChange={(e) => handleChecked(job.id, e)}
                              />
                              <span>
                                {job.status ? (
                                  <s>{job.nameJob}</s>
                                ) : (
                                  <span>{job.nameJob}</span>
                                )}
                              </span>
                            </div>
                            <div className="d-flex gap-3">
                              <i
                                onClick={() => handleEdit(job.id)}
                                className="fas fa-pen-to-square text-warning"
                              />
                              <i
                                onClick={() => handleDelete(job.id)}
                                className="far fa-trash-can text-danger"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {status && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i className="fas fa-xmark" onClick={cancelDelete}></i>
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc này?</p>
            </div>
            <div className="modal-footer-footer">
              <button className="btn btn-light" onClick={cancelDelete}>
                Hủy
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
