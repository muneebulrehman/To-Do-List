const listContainer = document.querySelector('.list-container');
const list = document.querySelector('.list');
const addbtn = document.querySelector('.add-btn');
const input = document.querySelector('.add-item');
const container = document.querySelector('.app');

class AddData {
	#array = [];
	constructor() {
		addbtn.addEventListener('click', this.storeList.bind(this));
		listContainer.addEventListener('click', this.updateListEl.bind(this));
		this.getLocalstorage();
		listContainer.addEventListener('change', this.onChange.bind(this));
	}

	setLocalStorage() {
		localStorage.setItem('array', JSON.stringify(this.#array));
	}

	getLocalstorage() {
		if (this.#array.length === 0) container.style.border = 'none';
		else container.style.border = '1px solid turquoise';
		listContainer.innerHTML = '';
		const data = JSON.parse(localStorage.getItem('array'));
		if (!data) return;
		this.#array = data;
		this.#array.forEach((el, i) => {
			this.createList(el, i);
		});
	}
	storeList() {
		const message = input.value;
		if (message) {
			const list = new List(message);
			this.#array.push(list);
			this.setLocalStorage();
			this.getLocalstorage();
		}
		input.value = '';
		input.focus();
	}
	createList(list, i) {
		const checked = list.checkBox === true ? 'line-through' : '';
		const html = `<div class="list">
					<input class="checkbox" type="checkbox" id="${i}" />
					<input type="text" class="overlay hidden" />
					<span class="content ${checked}">${list.item}</span>
					<span class="date">${list.date}</span>
					<div class="buttons">
						<button class="edit button" data-dataid = ${i}>Edit</button>
						<button class="delete button" data-dataid = ${i}>Delete</button>
					</div>
				</div>`;
		listContainer.insertAdjacentHTML('afterbegin', html);
		document.getElementById(i).checked = list.checkBox;
	}
	updateListEl(e) {
		if (e.target.classList.contains('delete')) {
			const num = e.target.dataset.dataid;
			this.#array.splice(num, 1);
			this.setLocalStorage();
			this.getLocalstorage();
		}

		if (e.target.classList.contains('checkbox')) {
			const target = e.target.checked;
			const id = e.target.id;
			this.#array[id].checkBox = e.target.checked;
			this.setLocalStorage();
			this.getLocalstorage();
		}

		if (e.target.classList.contains('edit')) {
			const el = e.target;
			const num = e.target.dataset.dataid;
			const target =
				el.parentElement.parentElement.firstElementChild.nextElementSibling;
			const nextTarget = target.nextElementSibling;
			target.classList.toggle('hidden');
			nextTarget.classList.toggle('hidden');
			target.value = this.#array[num].item;
		}
	}

	onChange(e) {
		if (e.target.classList.contains('overlay')) {
			const id = e.target.previousElementSibling.id;
			const value = e.target.value;
			this.#array[id].item = value;
			this.setLocalStorage();
			this.getLocalstorage();
		}
	}
}

class List {
	constructor(item) {
		this.item = item;
		this.date = this.setDate();
		this.checkBox = false;
	}
	setDate() {
		const now = Date.now();
		const options = {
			month: '2-digit',
			year: 'numeric',
			day: '2-digit',
		};

		const time = Intl.DateTimeFormat([], options).format(now);
		return time;
	}
}

const app = new AddData();
