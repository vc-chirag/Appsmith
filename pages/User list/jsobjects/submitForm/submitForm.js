export default {
	formSubmit(){
		const name = Input1.text;
		const email = Input2.text;
		console.log({name:name, email:email});
		closeModal('Modal1');
	}
}