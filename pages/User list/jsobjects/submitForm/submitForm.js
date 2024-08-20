export default {
	formSubmit(type) {
		const formvalue = {
			name: nameInput.text,
			email:emailInput.text,
			age:ageInput.text,
			Mobile_No:mobileInput.text
		};

		let isFormValid;
		if(type == 'issuer'){
			isFormValid = validator.validateForm();		 
		}else {
			isFormValid = validator.validateIssuerForm();	
		}

		if(isFormValid) {
			let request_payload = {
				issuer_id:186,
				subject_id:308,
				credential_format:"linked_credentials",
				credential_category:"initial_credential",
				email_to_holder:"true",
				records:[{ slug:formvalue, additional_slug:null	}]
			};

			if(type == 'transfer') {
				request_payload = {
					...request_payload,
					predecessor_credential_uuid:[appsmith.store.selectedId]
				};
			}

			fetch("https://evrc-service.everycred.com/v1/user/credentials/issue", {
				method: "POST",
				body: JSON.stringify(request_payload),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					"Authorization": "Bearer " + appsmith.store.token
				}
			})
				.then((response) => {
				if (!response.ok) {
					// Handle HTTP errors
					return response.text().then(text => {
						throw new Error(`HTTP error! Status: ${response.status}, 
						Response:${text}`);
					});
				}
				return response.json();
			})
				.then((json) =>{
				console.log(json);
				const currentModal = type == 'issuer' ? issuerModal : transferModal;
				closeModal(currentModal.name);
				issuers.run();
				showAlert(
					type == 'issuer' ? 
					'Add issuer submitted successfully':
					'Transfer submitted successfully ',
					'info');
			})
				.catch(error => {
				// Handle network errors or any other errors
				console.error('Fetch error:', error);
				showAlert('An error occurred while submitting the request', 'error');
			});
		} else {
			showAlert('please fill all required fields','error');
		}
	}
}