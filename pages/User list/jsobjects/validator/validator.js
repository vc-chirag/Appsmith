export default {
	validateForm() {
		const validations = [
			!!nameInput.text && nameInput.text.length > 0,
			!!emailInput.text && emailInput.text.includes("@"),
			this.validateAge(),
			!!mobileInput.text && mobileInput.text.length > 0
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
			!!trasnferMobileInput.text && trasnferMobileInput.text.length > 0
		];
		return validations.every(Boolean);
	},

	validateTrasnferAge() {
		const age = Number(transferAgeInput.text);
		return !isNaN(age);
	},


}