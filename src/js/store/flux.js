const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
		},
		actions: {
			loadContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/ipince")
					.then(response => response.json())
					.then(data => {
						setStore({ contacts: data });
					});
			},
			deleteContact: IdContact => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + IdContact, {
					method: "DELETE"
				})
					.then(response => response.json())
					.then(data => {
						console.log("delete", data);
						getActions().loadContacts();
						alert("Contact Delete, OK!");

						// props.history.push("/Contacts")
					})
					.catch(error => console.error("Error:", error));
			},
			EditContact: (contactObj, IdContact) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + IdContact, {
					method: "PUT",
					body: JSON.stringify(contactObj),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => {
						alert("Success:", JSON.stringify(data));
						//1.-para acceder a los metodos primera forma
						//const actions = getActions();
						//actions.loadContacts();
						//2.- segunda forma
						getActions().loadContacts();
					})
					.catch(error => console.log("Error:", error));
			},
			NewContact: Objcontact => {
				console.log("input", Objcontact);
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(Objcontact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => {
						console.log("output", data);
						alert("New Contact Add, OK!");
						getActions().loadContacts();
						// props.history.push("/Contacts")
					})
					.catch(error => console.error("Error:", error));
			}
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
