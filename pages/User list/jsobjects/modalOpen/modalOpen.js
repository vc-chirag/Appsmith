export default {
	openModalWithData(item) {
		storeValue('selectedId', item.id); 
		showModal(transferModal.name); 
	}
}