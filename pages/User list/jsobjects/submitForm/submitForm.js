export default {
	loader : false,

	formSubmit(type) {
		let formValue;
		if(type == 'issuer') {
			formValue = {
				name: nameInput.text,
				email:emailInput.text,
				Age:ageInput.text,
				Mobile_No:mobileInput.text
			};
		}else {
			formValue = {
				name: transferNameInput.text,
				email:transferEmailInput.text,
				Age:transferAgeInput.text,
				Mobile_No:transferMobileInput.text
			};
		}

		this.loader = true;
		let isFormValid;

		if(type == 'issuer'){
			isFormValid = validator.validateForm();		 
		}else {
			isFormValid = validator.validateIssuerForm();	
		}

		if(isFormValid) {
			let request_payload = {
				batch: type == 'issuer' ? batchInput.text : transferBatchInput.text,
				remarks:type == 'issuer' ? remarkInput.text : transferRemarkInput.text,
				records:[{ slug:formValue, additional_slug:{}	}]
			};

			if(type == 'transfer') {
				request_payload = {
					...request_payload,
					predecessor_credential_uuid:[appsmith.store.selectedId]
				};
			}

			const queryStrings = {
				issuer_id: 186,
				subject_id: 308,
				credential_format: "linked_credentials",
				credential_category: 
				type =='issuer' ? "initial_credential": "chained_credential",
				email_to_holder: "true"
			};
			const queryParams = this.jsonToQueryString(queryStrings).toString();

			const url = 
						`https://evrc-service.everycred.com/v1/user/credentials/issue?${queryParams}`;

			fetch(url, {
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
				this.loader = false;
				const currentModal = type == 'issuer' ? issuerModal : transferModal;
				closeModal(currentModal.name);
				issuers.run();
				showAlert(
					type == 'issuer' ? 
					'Add issuer submitted successfully':
					'Transfer submitted successfully',
					'info');
			})
				.catch(error => {
				console.error('Fetch error:', error);
				showAlert('An error occurred while submitting the request', 'error');
			});
		} 
		else {
			showAlert('please fill all required fields','error');
		}
	},

	jsonToQueryString(param) {
		return Object.keys(param)
			.map(function(key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(param[key]);
		}).join('&');
	}
}