import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: " ",
    age: "",
    dob: "",
    contact: "",
    city: ""
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in first");
      navigate("/login");
    } else {
      axios
        .get("http://localhost:9000/profile/profile", {
          headers: { "x-auth-token": token }
        })
        .then((response) => {

          setUserData(response.data);
          console.log(response.data)
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading profile data:", error);
          alert("Failed to load profile data");
        });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in first");
      navigate("/login");
      return;
    }

    axios
      .put(
        "http://localhost:9000/profile/update",
        { ...userData },
        { headers: { "x-auth-token": token } }
      )
      .then((response) => {
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Profile Page</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={userData.email} onChange={handleChange}      placeholder="Enter your Email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="age">Age</label>
                 <input  type="number" className="form-control" id="age" name="age"  value={userData.age} onChange={handleChange} placeholder="Enter your age"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="dob">Date of Birth</label>
                  <input className="form-control" id="dob" name="dob" value={userData.dob} onChange={handleChange} placeholder="Enter your date of birth dd/mm/year"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="contact">Contact Number</label>
                  <input type="text" className="form-control" id="contact" name="contact" value={userData.contact} onChange={handleChange} placeholder="Enter your contact number"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="city">City</label>
                  <input type="text" className="form-control" id="city" name="city" value={userData.city}  onChange={handleChange}  placeholder="Enter your city"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
