(function() {
	$(document).ready(function() {
		"use strict";


		var time = 300;
		var update;
		// Function to update counters on all elements with class counter
		var doUpdate = function() {

			if (time > 0) {
				$('.countdown').html("");
				var minutes = Math.floor(time / 60);
				var seconds = time - minutes * 60;
				$('.countdown').html(minutes + ":" + seconds);
				time--;
			} else {
				wrapper = $('#wrapper');
				wrapper.html("your are out of time");
			}

		}

		// Schedule the update to happen once every second


		$("#submitUsername").click(login);
		$("#reloadLogin").click(reloadPage);
		var person, names, persons, header, wrapper, p, username;
		var questions = {
			0: ['Вътре в кой HTML елемент слагаме JavaScript?', 2],
			1: ['Какъв е правилният начин да се напише JavaScript масив(array)?', 3],
			2: ['Какъв е правилният начин да закръглите до най-близкото цяло число?', 2],
			3: ['От коя страна се рита топката', 2]
		};
		var answers = {
			0: ['<js>', '<scripting>', '<script>', '<javascript>'],
			1: ['var colors = "red", "green", "blue"',
				'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
				'var colors = (1:"red", 2:"green", 3:"blue")',
				'var colors = ["red", "green", "blue"]'
			],
			2: ['Math.rnd(7.25)', 'rnd(7.25)', 'Math.round(7.25)', 'round(7.25)'],
			3: ['От лявата страна', 'От дясната страна', 'От външната част', 'От вътреншната част']
		};

		function login() {
			username = $("#username").val();
			if (!username) {
				throw new Error("username cannot be empty");
			}

			var pollName = localStorage.getItem("pollName");
			if (pollName === null) {
				names = [];
				person = {
					name: username,
					score: 0,
					alreadyDone: false
				};
				names[0] = person;
				localStorage.setObject("pollName", JSON.stringify(names));
				loadQuestions(username);

			} else {

				persons = localStorage.getObject("pollName");
				var personsArray = JSON.parse(persons);


				if (!checkUserName(personsArray, username)) {
					person = {
						name: username,
						score: 0,
						alreadyDone: false
					};
					personsArray.push(person);
					localStorage.setObject("pollName", JSON.stringify(personsArray));
				}
				if (checkIfTestIsAlreadyDone(personsArray) !== undefined) {
					person = checkIfTestIsAlreadyDone(personsArray);
					var p = $("<p>");
					p.text("already done with that test and your last score was: " + person.score + "%");
					wrapper = $("#wrapper");
					person.score = 0;
					writePersonToLocalStorage(person);
					loadQuestions(username);
					p.appendTo(wrapper);
				} else {
					loadQuestions(username);
				}

			}



		}

		function loadQuestions(username) {
			var countdown = $('.countdown');
	
			if(countdown.length === 0) {

				countdown = $('<div>');
			}
			countdown.addClass('countdown');
			update = setInterval(doUpdate, 1000);
			countdown.prependTo($('body'));
			wrapper = $('#wrapper');
			wrapper.html('');
			header = $('<h1>').text('Welcome ' + username);
			header.appendTo(wrapper);
			var contain = $('<div>');
			contain.attr('id', 'questionContain');
			var button = $('<button>');
			button.text('check results');
			var counter = 0;
			for (var q in questions) {
				var ul = $('<ul>');
				var question = $('<p>');
				question.text(questions[q][0]);
				question.appendTo(ul);
				for (var a in answers) {

					var label = $('<label>');
					var li = $("<li>");
					var input = $('<input>').prop('type', 'radio');
					input.attr('id', counter);
					input.attr('name', "poll" + q);
					label.attr('for', counter);
					label.text(answers[q][a]);
					input.appendTo(li);
					label.appendTo(li);
					li.appendTo(ul);
					counter++;
				}
				ul.appendTo(contain);


			}

			button.click(displayResults);
			button.appendTo(contain);
			contain.appendTo(wrapper);

		}

		function reloadPage() {
			wrapper = $("#wrapper");
			wrapper.html("");
			var span = $("<span>Name:</span>");
			var input = $("<input>").prop("type", "text");
			input.attr("id", "username");
			var btn = $("<button>").text("login");
			btn.attr("id", "submitUsername");
			btn.click(login);
			span.appendTo(wrapper);
			input.appendTo(wrapper);
			btn.appendTo(wrapper);
			clearInterval(update);
			$('.countdown').remove();
			time = 300;

		}

		function checkIfTestIsAlreadyDone(personsArray) {
			var i, len;
			len = personsArray.length;
			for (i = 0; i < len; i += 1) {
				var alreadyDone = personsArray[i].alreadyDone;
				if (alreadyDone) {
					return personsArray[i];

				}
			}

		}

		function checkUserName(array, name) {
			for (var i = 0; i < array.length; i++) {
				if (array[i].name == name) {
					return true;
				}
			}
			return false;
		}


		function displayResults() {
			var answersResult = [];
			var person, currectAnswer;
			var results = $('input').filter(':checked');
			if (results.length != 4) {

				alert("you must answer to all questions");
				loadQuestions(username);
				return;

			}
			if (findPersonByUsername(username) !== undefined) {
				person = findPersonByUsername(username);
			}

			var personScore = person.score;

			for (var q in questions) {
				var idStr = results[q].id;
				var id = parseInt(idStr) % 4;
				var currectAnswerNumber = questions[q][1];
				if (id === currectAnswerNumber) {
					personScore += 25;
					currectAnswer = "for question: \n" + questions[q][0] +
						" currect answer is " + answers[q][id] + " - you gain 25 ponts";
					answersResult.push(currectAnswer);
				} else {
					currectAnswer = "for question: \n" + questions[q][0] +
						" currect answer is " + answers[q][currectAnswerNumber] + "\n and your answer is: " +
						answers[q][id] + " - you gain 0 points";
					answersResult.push(currectAnswer);

				}

			}

			wrapper = $('#wrapper');
			wrapper.html("");

			for (var i = 0; i < answersResult.length; i++) {
				var p = $("<p>");
				p.text(answersResult[i]);
				p.appendTo(wrapper);
			}

			var p = $('<p>');
			p.text("Final score is " + personScore + "%");
			p.appendTo(wrapper);
			person.score = personScore;
			person.alreadyDone = true;
			writePersonToLocalStorage(person);
			clearInterval(update);
			$('.countdown').remove();
		}

		function findPersonByUsername(username) {
			var persons = localStorage.getObject("pollName");
			var personsArray = JSON.parse(persons);
			for (var i = 0; i < personsArray.length; i++) {
				if (personsArray[i].name === username) {
					return personsArray[i];
				}
			}

			return undefined;
		}

		function writePersonToLocalStorage(person) {
			var persons = localStorage.getObject("pollName");
			var personsArray = JSON.parse(persons);
			var personResult = [];
			for (var i = 0; i < personsArray.length; i++) {
				if (personsArray[i].name == person.name) {
					personResult.push(person);
				} else {
					personResult.push(personsArray[i]);
				}
			}
			localStorage.setObject("pollName", JSON.stringify(personResult));

		}

	});

}());