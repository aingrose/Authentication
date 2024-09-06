import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {

    const Navigate = useNavigate()
    let [formdata, setformdata] = useState({
        Username: "",
        Password: "",
    })


    let handleChange = (e) => {
        const { name, value } = e.target
        setformdata((prev) => ({ ...prev, [name]: value }));

    }


    let handlesubmit = async (e) => {
        e.preventDefault();

        console.log(e.target)


        console.log(formdata)
        const response = await axios.post("http://localhost:9000/users/register", formdata);
        console.log(response)

        if (response.status === 201) {
            alert("Created successfully");

            Navigate("/login");
        }
        else if (response.status === 200) {
            alert("Username Already Exist")
        }
        else if (response.status === 202) {
            alert("Password doesn't match")
        }

    }



    return (
        <>
            <h1 className='mt-5 pt-5' style={{ textAlign: "center" }}>REGISTER FORM</h1>

            <div className='container'>
                <div className='row'>
                    <div className='col mt-5' style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >

                        <div className="card" style={{ width: "30rem", backgroundColor: "#EEEEEE" }}>
                            <div className="card-body mt-4" style={{ height: "300px" }} >

                                <form onSubmit={handlesubmit} >

                                    <div className="row mb-1">
                                        <label className="mb-2">USERNAME</label>
                                        <input id="email" type="text" name="Username" value={formdata.Username} style={{ borderRadius: "8px", border: "1px solid grey" }} className="input p-2" placeholder="Enter Uername" onChange={handleChange} />
                                    </div>
                                    <div className="row mb-1">
                                        <label className="mb-2">PASSWORD</label>
                                        <input id="email" type="text" name="Password" value={formdata.Password} style={{ borderRadius: "8px", border: "1px solid grey" }} className="input p-2" placeholder="Enter Password" onChange={handleChange} />
                                    </div>

                                    <input type="submit" value="Submit" style={{ padding: "8px 25px" }} className='btn btn-primary mt-5' />
                                </form>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
        </>

    )
}

export default Register