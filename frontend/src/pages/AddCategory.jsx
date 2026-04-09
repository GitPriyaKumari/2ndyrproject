import React, { useState, useEffect } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ added
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin/login");
    } else {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/categories/"
      );
      setCategories(res.data);
    }
    catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/categories/add/",
        { name, status }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Category created");
        setName("");
        setStatus("1");
        fetchCategories();
      }
      else {
        toast.error(res.data.message);
      }
    }

    catch (err) {
      console.error("FULL ERROR:", err);

      if (err.response) {
        console.log("Server Response:", err.response.data);
        toast.error(err.response.data.message || "Server error");
      }
      else {
        toast.error("Backend not reachable");
      }
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(135deg,#f3f5ff,#fdfdff)",
        minHeight: "100vh"
      }}
    >
      <div className="container">
        <div className=" row mb-8 mx-auto">
          <div className="col-md-5">

            <div className="mb-4 text-center">
              <h4 className="fw-semibold mb-1">
                <i className="fa-solid fa-layer-group text-primary me-2"></i>
                Add Category
              </h4>

              <p className="text-muted small">
                Create new book category and manage their active status <code>createsuperuser</code>
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-5">

                <div className="card border-0 shadow-sm rounded-3">
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>

                      <div className="mb-3">
                        <label className="form-label small fw-medium">CategoryName</label>
                        <div className="input-group">

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter category name:"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label small fw-medium">Status</label>

                        <div className="d-flex gap-3">
                          <div className='form-check'>

                            <input
                              type="radio"
                              className='form-check-input'
                              value="1"
                              checked={status === "1"}
                              onChange={(e) => setStatus(e.target.value)}
                              id="status-active"
                              name="status"
                            />
                            <label className='form-check-label small' htmlFor='status-active'>
                              Active
                            </label>
                          </div>

                          <div className='form-check'>

                            <input
                              type="radio"
                              className='form-check-input'
                              value="0"
                              checked={status === "0"}
                              onChange={(e) => setStatus(e.target.value)}
                              id="status-inactive"
                              name="status"
                            />
                            <label className='form-check-label small' >
                              Inactive
                            </label>
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Adding categories...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-plus"></i>
                            Create category
                          </>
                        )}
                      </button>

                    </form>
                  </div>
                </div>

              </div>

              <div className="col-md-7">
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategory