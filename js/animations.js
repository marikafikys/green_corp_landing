/* Создание анимации счетчика*/

const INCREASE_NUMBER_ANIMATION_SPEED = 50;

function increaseNumberAnimationStep (i, element, endNumber) 
{
	if (i <= endNumber) 
	{
	  if (i === endNumber) 
	  {
		 element.innerText = i + '+';
	  } 
		else 
	  	{
		 element.innerText = i;
		}
		i += 100;
		setTimeout(increaseNumberAnimationStep, INCREASE_NUMBER_ANIMATION_SPEED, i, element, endNumber);
		// setTimeout(function() 
		// {
		// 	increaseNumberAnimationStep(i, element, endNumber);
		// }, INCREASE_NUMBER_ANIMATION_SPEED);
	}
}

function initIncreaseNumberAnimation() 
{
let element = document.querySelector(".features__clients-count");
increaseNumberAnimationStep(0, element, 5000);
}


/* Создание дополнительного поля ввода при выборе "Другое" в поле формы "Примерный бюджет" */

document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
	if (event.target.value === 'other') {
		let formContainer = document.createElement('div');
		formContainer.classList.add('form__group');
		formContainer.classList.add('form__other-input');

		const input = document.createElement('input');
    	input.placeholder = "Введите ваш вариант";
    	input.type = "text";

		formContainer.appendChild(input);
		document.querySelector('.form form').insertBefore(formContainer, document.querySelector('.form__submit'));
	}
 
	const otherInput = document.querySelector('.form__other-input');
	if (event.target.value !== 'other' && otherInput) {
		document.querySelector('.form form').removeChild(otherInput);
	}
 });


/* Изменение шапки header при скроле и запуск анимации счетчика*/

let animationInited = false;

function updateScroll() {
	if (window.scrollY > 0) {
		let header = document.querySelector('header');
		header.classList.add('header__scrolled');
	} else {
		let header = document.querySelector('header');
		header.classList.remove('header__scrolled');
	}
	let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
	let windowBottomPosition = window.scrollY + window.innerHeight;
	if (windowBottomPosition >= countElementPosition && !animationInited) {
		animationInited = true;
		initIncreaseNumberAnimation();
	}
}

window.addEventListener('scroll', updateScroll);


/* Создаём плавный скролл при нажатии на ссылки */
 
function addSmoothScroll(anchor) { /* функция, которая будет тегу a добавлять обработчик */
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
	
		document.querySelector(this.getAttribute('href')).scrollIntoView({
		  behavior: 'smooth'
		});
	 });
  }
	
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	 addSmoothScroll(anchor);
  });

function onLinkClick(event) { /* функция, которая будет обработчиком клика */
	event.preventDefault();
	document.querySelector(event.target.getAttribute('href')).scrollIntoView({
		behavior: 'smooth'
	});
}

addSmoothScroll(document.querySelector('.more-button'));