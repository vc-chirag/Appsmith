export default {
	trasnferCar () {
		fetch("https://jsonplaceholder.typicode.com/todos", {
			method: "POST",
			body: JSON.stringify({
				userId: 1,
				title: "Fix my bugs",
				completed: false
			}),
			headers: {
				"Content-type": "application/json; chzarset=UTF-8"
			}
		})
			.then((response) => response.json())
			.then((json) =>{
			console.log(json);
			showAlert('Data Trasnfer sucuessfully','success');
		});
	}
}