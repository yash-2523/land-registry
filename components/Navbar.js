import { web3Context } from "@/context/Web3Context";
import { Avatar, Tooltip } from "@mui/material";
import { useContext } from "react";


export default function Navbar() {
    const {user} = useContext(web3Context);
    return (
        <div className="w-100 p-3 d-flex justify-content-between align-items-center">
            <h2>Land Registry</h2>
            <Tooltip title={`${user.firstName} ${user.lastName}`}><Avatar style={{cursor: "pointer"}} sx={{ bgcolor: 'green' }}>{user.firstName.charAt(0)} {user.lastName.charAt(0)}</Avatar></Tooltip>
        </div>
    )


}