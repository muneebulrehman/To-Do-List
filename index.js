const list = document.querySelector('.list');
const checkbox = document.querySelector('.checkbox');
const date = document.querySelector('.date');
const edit = document.querySelector('.edit');
const del = document.querySelector('.delete');
const addbtn = document.querySelector('.add-btn');
const input = document.querySelector('.add-item');
let array;

class AddData {
	array = [];
	constructor() {
		addbtn.addEventListener('click', this.createList.bind(this));
	}

	setLocalStorage() {
		localStorage.setItem('array', JSON.stringify(this.array));
	}

	getLocalstorage() {
		const data = JSON.parse(localStorage.getItem('array'));
		if (!data) return;
		this.array = data;
		array.forEach((el) => {
			this.renderList(el);
		});
	}
	createList() {
		const message = input.value;
		const list = new List(message);
		this.array.push(list);
	}
	renderList() {}
}

class List extends AddData {
	constructor(input) {
		super();
		this.input = input;
		this.date = this.setDate();
	}
	setDate() {
		const now = Date.now();
		const options = {
			month: '2-digit',
			year: 'numeric',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		};

		const time = Intl.DateTimeFormat([], options).format(now);
		return time;
	}
}

const app = new AddData();
