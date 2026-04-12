import React ,{useState}from 'react'
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Adminlogin = ({ setIsAdmin }) => {   // ✅ CHANGE HERE
  
  const[username, setUserName]=useState("");
  const[password, setPassword]=useState("");
  const[loading, setLoading]=useState(false);
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const res = await axios.post(
        "http://127.0.0.1:8000/api/admin/login/",
        { username, password }
      );

      console.log(res.data);
if(res.data.success){

  // ✅ ADD THESE 3 LINES HERE
  localStorage.setItem("isAdmin", "true");
  localStorage.setItem("username", username);
  setIsAdmin(true);

  toast.success(res.data.message);
  navigate("/admin/dashboard");
}
      else{
        toast.error(res.data.message);
      }
    }

    catch(err){
      console.error("FULL ERROR:", err);

      if(err.response){
        console.log("Server Response:", err.response.data);
        toast.error(err.response.data.message || "Server error");
      }
      else{
        toast.error("Backend not reachable");
      }
    }

    finally{
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
        <div className="row justify-content-center">
          <div className="col-md-5">

            <div className="mb-4 text-center">
              <h4 className="fw-semibold mb-1">
                <i className="fa-solid fa-shield-halved text-primary me-2"></i>
                Admin Sign-in
              </h4>

              <p className="text-muted small">
                Use the admin account created with <code>createsuperuser</code>
              </p>
            </div>

            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">UserName</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-regular fa-user bg-transparent"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter admin username:"
                        required
                        value={username}
                        onChange={(e)=>setUserName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-key"></i>
                      </span>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="******"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    {loading ?(
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing in...
                      </>
                    ):
                      <>
                        <i className="fa-solid fa-right-to-bracket"></i> Sign in
                      </>
                    }
                  </button>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminlogin