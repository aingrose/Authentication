import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate(); 

    const [formdata, setFormData] = useState({
        Username: "",
        Password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9000/users/login", formdata);

            if (response.status === 200) {

                localStorage.setItem("token", response.data.token);
                console.log(response.data.token)
                alert("Login successful");

                navigate("/profile");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <>
            <h1 className="mt-5 pt-5" style={{ textAlign: "center" }}>
                LOGIN
            </h1>

            <div className="container">
                <div className="row">
                    <div
                        className="col mt-5"
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <div className="card" style={{ width: "30rem", backgroundColor: "#EEEEEE" }}>
                            <div className="card-body mt-4" style={{ height: "300px" }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-1">
                                        <label className="mb-2">USERNAME</label>
                                        <input id="username" type="text" name="Username" value={formdata.Username} style={{ borderRadius: "8px", border: "1px solid grey" }} className="input p-2"
                                            placeholder="Enter Username"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="row mb-1">
                                        <label className="mb-2">PASSWORD</label>
                                        <input id="password" type="password" name="Password" value={formdata.Password} style={{ borderRadius: "8px", border: "1px solid grey" }} className="input p-2" placeholder="Enter Password" onChange={handleChange}
                                        />
                                    </div>
                                    <input type="submit" value="Submit" style={{ padding: "8px 75px" }} className="btn btn-primary mt-5 w-100"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
