import { WALLET_ADAPTERS } from "@web3auth/base";
const { Web3Auth } = require("@web3auth/modal");
import { getPublicCompressed } from "@toruslabs/eccrypto";
const Web3 = require("web3");
const ethers = require("ethers");
import { createContext, useState, useEffect, useContext } from "react";
import { globalLoadingContext } from "./LoadingContext";

export const web3Context = createContext();


export const Web3ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const {setGlobalLoading} = useContext(globalLoadingContext);

    const get_pub_key = async(_web3Auth) => {
        const privateKey = await _web3Auth.provider.request({
            method: "eth_private_key"
          });
          const publicKey = getPublicCompressed(Buffer.from(privateKey.padStart(64, "0"), "hex")).toString("hex");
        return publicKey;
    }

    const init = async() => {
        
        try{
            setGlobalLoading(true);
            const web3auth = new Web3Auth({
                clientId: "BFmf8DCLlhggIEcPD_ivTOyA9Px8MR6bTk7_kzyuN0D5Lf4ufa9Pd_pL8peOPokkKsj5-Cq5JCXbMUCN70DREvU", // get it from Web3Auth Dashboard
                web3AuthNetwork: "testnet",
                chainConfig: {
                    chainNamespace: "eip155",
                    chainId: "0x13881",
                    rpcTarget: "https://rpc-mumbai.maticvigil.com",
                    // Avoid using public rpcTarget in production.
                    // Use services like Infura, Quicknode etc
                    displayName: "Polygon Mumbai",
                    blockExplorer: "https://mumbai.polygonscan.com",
                    ticker: "MATIC",
                },
            });
    
            await web3auth.initModal({
                modalConfig: {
                    [WALLET_ADAPTERS.OPENLOGIN]: {
                        label: "openlogin",
                        loginMethods: {
                            // Disable facebook and reddit
                            apple: {
                                name: "facebook",
                                showOnModal: false,
                            },
                            reddit: {
                                name: "reddit",
                                showOnModal: false,
                            },
                            line: {
                                name: "line",
                                showOnModal: false,
                            },
                            github: {
                                name: "github",
                                showOnModal: false,
                            },
                            wechat: {
                                name: "wechat",
                                showOnModal: false,
                            },
                            twitter: {
                                name: "twitter",
                                showOnModal: false,
                            },
                            kakao: {
                                name: "kakao",
                                showOnModal: false,
                            },
                            linkedin: {
                                name: "linkedin",
                                showOnModal: false,
                            },
                            weibo: {
                                name: "weibo",
                                showOnModal: false,
                            },
                            google: {
                                name: "google",
                                showOnModal: false,
                            },
                            facebook: {
                                name: "facebook",
                                showOnModal: false,
                            },
                            reddit: {
                                name: "reddit",
                                showOnModal: false,
                            },
                            twitch: {
                                name: "twitch",
                                showOnModal: false,
                            },
                            discord: {
                                name: "discord",
                                showOnModal: false,
                            },
                            sms_passwordless: {
                                name: "sms_passwordless",
                                showOnModal: false,
                            },
                        },
                    },
                    'metamask': {
                        showOnModal: false,
                    },
                    'torus-evm': {
                        showOnModal: false,
                    },
                    'wallet-connect-v1': {
                        showOnModal: false,
                    },
                    'wallet-connect-v2': {
                        showOnModal: false,
                    },
                }
            });
            const web3authProvider = await web3auth.connect();
            const w = new ethers.BrowserProvider(web3authProvider);
            await web3auth.connect();
            let data = await web3auth.getUserInfo();
            // let idToken = await web  3auth.
            const signer = await w.getSigner();
            // Get user's Ethereum public address
            const publicAddress = await signer.getAddress();
            data.pubKey = await get_pub_key(web3auth);
            data.publicAddress = publicAddress;
            data.web3 = signer;
            console.log(data);
            
            let resp = await fetch("http://localhost:9000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apppubkey": data.pubKey,
                    "authorization": `Bearer ${data.idToken}`
                },
            });
            resp = await resp.json();
            if(resp.success){
                data = {...data, ...resp.user};
                setUser(data);
                setToken(resp.token);
            }else{
                window.alert("Error logging in");
            }
            setGlobalLoading(false);
        }catch(err){
            console.log(err);
            setGlobalLoading(false);
            window.alert("Error logging in");
        }
        
    }
    
    useEffect(() => {
        init();
    }, [])
    return (
        <web3Context.Provider value={{ user, setUser, token }}>
            {children}
        </web3Context.Provider>
    )
}