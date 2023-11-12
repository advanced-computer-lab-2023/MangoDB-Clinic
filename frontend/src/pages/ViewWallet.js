import AccountBalance from "../components/AccountBalance";
import { useParams } from "react-router-dom";
import { viewWallet } from "../services/api";
import { useState, useEffect } from "react";
// import useFetch from "../useFetch";


const ViewWallet = () => {
    const { id } = useParams();
    // const { data: wallet, isPending, error } = useFetch(`http://localhost:4000/patient/view_wallet/${id}`);
    // console.log(wallet.balance);

    const [wallet, setWallet] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setWallet(null);
        setIsPending(true);

        viewWallet(id)
        
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
    }, [id]);


    return ( 
        <div>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { wallet !== null && <AccountBalance balance={wallet.balance} /> }
        </div>
        
     );
}
 
export default ViewWallet;