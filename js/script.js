"use strict";
document.addEventListener("DOMContentLoaded", () =>{

	// Работа с формой опраляем данные через AJAX на formspree.io для дальнейшей пересылке в необходимое место
	// Working with the form, we send data via AJAX to formspree.io for further forwarding to the required place
	let modalThanksTimeout;
	let form = document.getElementById("my-form");
	async function handleSubmit(event) {
	event.preventDefault();
	let data = new FormData(event.target);
	fetch(event.target.action, {
	method: form.method,
	body: data,
	headers: {
		'Accept': 'application/json'
	}
	}).then(response => {
	if (response.ok) {
		showThanksModal(["Thank you for contacting me", "I will answer you as soon as possible!"]);
		form.reset();
	} else {
		response.json().then(data => {
		if (Object.hasOwn(data, 'errors')) {
		const formError = data["errors"].map(error => error["message"]).join(", ");
		showThanksModal([formError, "Please contact me in another way."]);
		} else {
			showThanksModal(["Unfortunately, something went wrong.", "Please contact me in another way."]);
		}
	})
	}
	}).catch(error => {
		showThanksModal(["Unfortunately, something went wrong.", "Please contact me in another way."]);
	});
	}
	// Отображает модальное окно
	// Displays a modal window
    function showModal(modal, mesage) {
        modal.style.display = "block";
		modal.querySelector('.modal__title').innerHTML = mesage[0];
		modal.querySelector('.modal__sub-title').innerHTML = mesage[1];
        modal.querySelector('.modal__item-wrapper').classList.add("modal__item-wrapper_show");
    }
    // Скрывает модальное окно
	// Hides the modal window
    function modalHide(modal){
        modal.style.display = "none";
        modal.querySelector('.modal__item-wrapper').classList.remove("modal__item-wrapper_show");
    }
    // Открывает модальное окно с благодарностью
	// Opens a modal window with thanks
    function showThanksModal(mesage) {
        const modal = document.querySelector("#modal-thanks");
        showModal(modal, mesage);
        modalThanksTimeout = setTimeout(()=>{
            modalHide(modal);
            }, 555000)
    }
	// Закрываем модальное окно при нажатии крестика и обнуляем таймер закрытия
	// Close the modal window when the cross is clicked and reset the close timer
	document.querySelector('#modal-thanks .modal__cross').addEventListener('click', (e)=>{
        const modal = document.querySelector('#modal-thanks');
        modalHide(modal);
        clearTimeout(modalThanksTimeout);
    })
	form.addEventListener("submit", handleSubmit);

	// Организовываем работу меню
	// Organize the menu
    const menu = document.querySelector(".nav__menu"),
          menuIcon = document.querySelector(".menu-icon"),
          menuCrossIcon = document.querySelector(".nav__menu-cross"),
          overlay = document.querySelector('.nav__overlay'),
          elemProgres = document.querySelectorAll('.skills__grid-elem-progres');

	menuIcon.addEventListener('click', e => {
		menu.classList.toggle('nav__menu_activ');
		overlay.classList.toggle('nav__overlay_show');
	})

	menuCrossIcon.addEventListener('click', e =>{
		menu.classList.toggle('nav__menu_activ');
		overlay.classList.toggle('nav__overlay_show');
	})

	document.addEventListener('click', e =>{
	if(e.target && e.target.classList.contains('nav__overlay')){
		menu.classList.toggle('nav__menu_activ');
		overlay.classList.toggle('nav__overlay_show');
	}
	})
	
	menu.querySelectorAll("a").forEach(a =>{
		a.addEventListener("click", ()=>{
			menu.classList.toggle('nav__menu_activ');
			overlay.classList.toggle('nav__overlay_show');
		})
	})

	// Автозаполнение прогресс баров
	// Autofill progress bars
	elemProgres.forEach(elem =>{
		const progres = parseInt(elem.querySelector('.skills__grid-elem-progres-top-progress').innerHTML),
		filedProgres = elem.querySelector('.skills__grid-elem-progres-bottom-filled');
		filedProgres.style.width = progres + '%';
	})
  });