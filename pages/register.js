import { web3Context } from "@/context/Web3Context"
import { Button, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"


export default function Register() {

    const {token, setUser, user} = useContext(web3Context)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [panCardNo, setPanCardNo] = useState("")
    const [account, setAccount] = useState("")
    const [ifscCode, setIfscCode] = useState("")
    const router = useRouter()

    let handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let resp = await fetch("http://localhost:9000/req", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    url: "http://localhost:5000/api/user/register",
                    method: "POST",
                    body: {firstName: firstName,
                    lastName: lastName,
                    panCardNo: panCardNo,
                    account: account,
                    ifscCode: ifscCode,}
                })
            })
            resp = await resp.json();
            if(resp.success){
                setUser({...user, isRegistered: true, firstName: firstName, lastName: lastName, panCardNo: panCardNo, account: account, ifscCode: ifscCode});
            }else{
                window.alert(resp.message);
            }
        }catch(err){
            window.alert("Unable totregister, please try again later")
        }
        
    }

    useEffect(() => {
        if(user!==null && user.isRegistered===true){
            router.push("/");
        }
    }, [])

    return(
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="col-6 bg-light shadow mx-auto mt-5">
                <h1 className="text-center">Register</h1>
                {/* create form with Mui  */

                <form className="d-flex flex-column justify-content-center align-items-center my-3" onSubmit={handleSubmit}>
                    <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} variant="outlined" className="" />
                    <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}  variant="outlined" className="mt-3" />
                    <TextField label="Pan Card No." value={panCardNo} onChange={(e) => setPanCardNo(e.target.value)} variant="outlined" className="mt-3" />
                    <TextField label="Account No." value={account} onChange={(e) => setAccount(e.target.value)} variant="outlined" className="mt-3" />
                    <TextField label="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} variant="outlined" className="mt-3" />

                    <Button variant="contained" color="primary" type="submit" className="mt-3">Submit</Button>
                </form>

                }

            </div>
        </div>
        
    )
}