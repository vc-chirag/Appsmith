export default {
	signIn: async () => {
		const email  = "manil.jayswal1@viitor.cloud";
		const password = "Everycred@123";
		if(!email){
			showAlert('Email is required', 'error');
		}
		if(!password) {
			showAlert('Password is required', 'error');
		}

		const user = { email, password };

		fetch("https://evrc-service.everycred.com/v1/login", {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then((response) => response.json())
			.then((json) =>{
			console.log(json);
			if(json.status === 'fail') {
				showAlert(json.message,'error');
			} else {
				storeValue('token', json.data);
				navigateTo('User list');
				showAlert('Login successful','info');
			}
		});
	},

}