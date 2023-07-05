import { web3Context } from "@/context/Web3Context";
import { useContext, useEffect } from "react";
import { WALLET_ADAPTERS } from "@web3auth/base";
const { Web3Auth } = require("@web3auth/modal");
import { getPublicCompressed } from "@toruslabs/eccrypto";
import { useRouter } from "next/router";
import { globalLoadingContext } from "@/context/LoadingContext";
import GlobalLoader from "./GlobalLoader";
const Web3 = require("web3");
const ethers = require("ethers");

export default function RootLayout({ children }) {
    const {user, setUser} = useContext(web3Context);
    const {globalLoading} = useContext(globalLoadingContext);
    const router = useRouter();

    if(user!==null && user.isRegistered===false){
        router.push("/register");
    }

    return(
        <>
            {globalLoading && <GlobalLoader />}
            {user!==null && children}
        </>
    )
}