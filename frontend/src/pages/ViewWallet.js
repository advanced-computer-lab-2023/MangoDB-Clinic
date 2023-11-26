import React, { useState, useEffect } from "react";

import AccountBalance from "../components/AccountBalance";
import { viewWallet } from "../services/api";

const ViewWallet = () => {
	
	const [wallet, setWallet] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
        const fetchData = async () => {
          try {
                setIsPending(true);
                setError(null);

                const token = localStorage.getItem("token");
                // setTimeout(async () => {
                    const response = await fetch(
                    "http://localhost:4000/patient/view_wallet",
                    {
                        method: "GET",
                        headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        },
                    }
                    );
    
                    if (!response.ok) {
                    throw new Error("Could not fetch the data for that resource");
                    }
    
                    const data = await response.json();
					setWallet(data);
                    setIsPending(false);
                    setError(null);
                // }, 10000);
            } catch (err) {
            setIsPending(false);
            setError(err.message);
            }
        };
      fetchData();
    }, []);

	return (
		<div>
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{wallet !== null && <AccountBalance balance={wallet.balance} />}
		</div>
	);
};

export default ViewWallet;
