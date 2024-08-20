export default {
	logout () {
		clearStore();
		navigateTo('Auth');
		showAlert('Logout sucessfully');
	}
}