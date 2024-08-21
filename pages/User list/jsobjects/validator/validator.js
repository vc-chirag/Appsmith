export default {
	validateForm() {
		const validations = [
			!!nameInput.text && nameInput.text.length > 0,
			!!emailInput.text && emailInput.text.includes("@"),
			this.validateAge(),
			!!mobileInput.text && mobileInput.text.length > 0,
			!!batchInput.text && batchInput.text.length > 0,
			!!remarkInput.text && remarkInput.text.length > 0
		];
		return validations.every(Boolean);
	},

	validateAge() {
		const age = Number(ageInput.text);
		return !isNaN(age);
	},

	validateIssuerForm(){
		const validations = [
			!!transferNameInput.text && transferNameInput.text.length > 0,
			!!transferEmailInput.text && transferEmailInput.text.includes("@"),
			this.validateTrasnferAge(),
			!!transferMobileInput.text && transferMobileInput.text.length > 0,
			!!transferBatchInput.text && transferBatchInput.text.length > 0,
			!!transferRemarkInput.text && transferRemarkInput.text.length > 0
		];
		return validations.every(Boolean);
	},

	validateTrasnferAge() {
		const age = Number(transferAgeInput.text);
		return !isNaN(age);
	}
}