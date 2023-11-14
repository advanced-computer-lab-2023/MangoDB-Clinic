import AccountBalance from "../components/AccountBalance";
import { useParams } from "react-router-dom";
import { viewWallet } from "../services/api";
import { useState, useEffect } from "react";
// import useFetch from "../useFetch";
import axios from 'axios';

const ViewWallet = async() => {
   // const { id } = useParams();
    // const { data: wallet, isPending, error } = useFetch(`http://localhost:4000/patient/view_wallet/${id}`);
    // console.log(wallet.balance);

    const [wallet, setWallet] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState('');

    const getID = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/Patient/myInfo",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				return response.data._id;
			}
		} catch (error) {}
	};
    const idd = await getID();
    useEffect(async () => {
        setWallet(null);
        setIsPending(true);

       await viewWallet(getID)
        
        .then((result) => {
            console.log("Data:", result.data.wallet.balance);

            setWallet(result.data.wallet);
            setIsPending(false);
        })
        .catch((err) => {
            console.error("Error:", err);

            setIsPending(false);
            setError(err.message);
        });
    }, [idd]);


    return ( 
        <div>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { wallet !== null && <AccountBalance balance={wallet.balance} /> }
        </div>
        
     );
}
 
export default ViewWallet;