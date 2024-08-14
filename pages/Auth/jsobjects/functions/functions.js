export default {
	signIn: async () => {
		const email  = inp_email.text;
		const password = inp_password.text;
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
			if(json.status === 401) {
				showAlert(json.message,'error');
			} else {
				storeValue('token', json.data);
				navigateTo('User list');
				showAlert('Login successful','info');
			}
		});
	},

}