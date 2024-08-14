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

			fetch("https://jsonplaceholder.typicode.com/todos", {
				method: "POST",
				body: JSON.stringify(request_payload),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
				.then((response) => response.json())
				.then((json) =>{
				const currentModal = type == 'issuer' ? issuerModal : transferModal;
				closeModal(currentModal.name);
				issuers.run();
				showAlert(
					type == 'issuer'? 
					'Add issuer submitted successfully':
					'Transfer submitted successfully ',
					'info');
			});
		} else {
			showAlert('please fill all required fields','error');
		}
	}
}