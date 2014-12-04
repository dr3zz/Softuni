(function() {
	"use strict";
	var wrapper, btnRemove, input, btn, totalVisits, sessionVisits, visits, header, value;
	wrapper = document.getElementById("wrapper");
	btnRemove = document.getElementById("removeItem");
	btnRemove.addEventListener("click", removeNameAndCounterLocalStorage);
	if (localStorage.getItem("greetingName") === null) {

		input = document.createElement("input");
		btn = document.createElement("BUTTON");
		btn.appendChild(document.createTextNode("submit"));
		btn.addEventListener("click", setName);
		input.type = "text";
		input.id = "input";
		wrapper.appendChild(input);
		wrapper.appendChild(btn);

	} else {

		if (sessionStorage.getItem("greetingCounter") === null) {
			sessionStorage.setItem("greetingCounter", 0);
		}

		totalVisits = parseInt(localStorage.getItem("greetingCounter"));
		sessionVisits = parseInt(sessionStorage.getItem("greetingCounter"));
		sessionVisits++;
		totalVisits++;
		localStorage.setItem("greetingCounter", totalVisits);
		sessionStorage.setItem("greetingCounter", sessionVisits);
		visits = document.createElement("p");
		visits.innerHTML = "Total Visits: " + localStorage.getItem("greetingCounter") + "<br>" + "Session visits: " + sessionStorage.getItem("greetingCounter");
		header = document.createElement("h1");
		header.innerHTML = "Welcome " + escapeTag(localStorage.getItem("greetingName"));
		wrapper.appendChild(header);
		wrapper.appendChild(visits);
	}

	function setName() {
		input = document.getElementById("input");
		value = input.value;
		sessionStorage.setItem("greetingCounter", "0");
		localStorage.setItem("greetingName", value);
		localStorage.setItem("greetingCounter", "0");
		header = document.createElement("h4");
		header.innerHTML = "Reload Page";
		btn = document.createElement("BUTTON");
		btn.appendChild(document.createTextNode("Reload"));
		btn.addEventListener("click", reloadPage);
		wrapper.appendChild(header);
		wrapper.appendChild(btn);
	}

	function removeNameAndCounterLocalStorage() {
		localStorage.removeItem("greetingName");
		localStorage.removeItem("greetingCounter");
		sessionStorage.removeItem("greetingCounter");
		location.reload();
	}

	function reloadPage() {
		location.reload();
	}

	function escapeTag(str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

}());