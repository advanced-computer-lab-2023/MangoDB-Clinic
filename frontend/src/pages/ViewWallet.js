import React, { useState, useEffect } from "react";

import AccountBalance from "../components/AccountBalance";
import { viewWallet } from "../services/api";

const ViewWallet = () => {
	const id = "6526d30a0f83f5e462288354";
	const [wallet, setWallet] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState("");

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
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{wallet !== null && <AccountBalance balance={wallet.balance} />}
		</div>
	);
};

export default ViewWallet;
