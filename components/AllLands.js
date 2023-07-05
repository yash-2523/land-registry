import { globalLoadingContext } from "@/context/LoadingContext";
import { web3Context } from "@/context/Web3Context";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";


export default function AllLands() {
    const {token} = useContext(web3Context);
    const [lands, setLands] = useState("loading")
    const {setGlobalLoading} = useContext(globalLoadingContext);

    useEffect(() => {
        setGlobalLoading(true);
        fetch("http://localhost:9000/req", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                url: "http://localhost:5000/api/user/getOtherProperties",
                method: "GET",
            })
        }).then(resp => resp.json()).then(resp => {
            if(resp.success){
                console.log(resp.data);
                setLands(resp.data || []);
            }else{
                window.alert(resp.message);
            }
            setGlobalLoading(false);
        }).catch(err => {
            setGlobalLoading(false);
            window.alert("Unable to fetch lands, please try again later");
        }
        )
    }, [])

    return (
        <>{lands!=="loading" && <div className="mt-4 mx-5 py-2" style={{widht:"100%", columnGap: "1rem", rowGap: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>

            {lands.length > 0 && lands.map((land, index) => (
                <Card sx={{ minWidth: 275 }} className="shadow">
                    <CardContent>
                        <div className="d-flex justify-content-between">
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Id: {land.propertyId}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Type: {land.propertyType}
                        </Typography>
                        </div>
                        <Typography variant="h6" component="div">
                        Property Name: {land.propertyNo}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Address: {`${land.propertyAddress1}, ${land.propertyAddress2}, ${land.city}-${land.pincode}, ${land.state}`}
                        </Typography>
                        <Typography variant="body2">
                        Neaby Places: {land.nearPlace}
                        </Typography>

                        <Typography variant="body2">
                        Coordinates: {`[${land.coordinates.map(c => c.toString()+", ")}]`}
                        </Typography>

                        <Typography variant="h5" className="mt-3" component="div">
                         Owner: {land.currentOwner.length > 0 ? land.currentOwner[0].firstName + " " +  land.currentOwner[0].lastName : ""}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Buy Now</Button>
                    </CardActions>
                </Card>
            ))
               
             }
            </div> 
    }
            
            {lands.length==0 && <div className="w-100 d-flex justify-content-center"><p style={{fontSize: "20px"}}>No Lands <SentimentDissatisfied /></p></div> }
            

        </>  
    )
}