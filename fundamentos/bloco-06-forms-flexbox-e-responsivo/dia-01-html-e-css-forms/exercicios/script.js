const statesSelect = document.getElementById('state');
const dateInput = document.getElementById('start-date');
const createButton = document.getElementById('generate-cv');
const curriculumArea = document.getElementById('curriculum');
const states = ['Acre','Alagoas','Amapá','Amazonas','Bahia','Ceará','Distrito Federal','Espirito Santo','Goiás','Maranhão','Mato Grosso do Sul','Mato Grosso','Minas Gerais','Pará','Paraíba','Paraná','Pernambuco','Piauí','Rio de Janeiro','Rio Grande do Norte','Rio Grande do Sul','Rondônia','Roraima','Santa Catarina','São Paulo','Sergipe','Tocantins'];

const personalData = [
  { 
    type: 'text',
    id: 'name',
    labelContent: "Nome",
    maxlength: 40,
    required: true
  }, { 
    type: 'text',
    id: 'email',
    labelContent: "Email",
    maxlength: 50,
    required: true
  }, { 
    type: 'text',
    id: 'city',
    labelContent: "Cidade",
    maxlength: 28,
    required: true
  }, { 
    type: 'select',
    id: 'state',
    labelContent: "Estado",
    options: states,
    required: true
  }, { 
    type: 'radio',
    id: 'residence',
    labelContent: "Moradia",
    options: ['casa', 'apartamento'],
    required: true
  }
]

const professionalData = [
  { 
    type: 'textarea',
    id: 'summary',
    labelContent: "Resumo do curriculo",
    maxlength: 1000,
    required: true
  }, { 
    type: 'text',
    id: 'name',
    labelContent: "Cargo",
    maxlength: 40,
    required: true
  }, { 
    type: 'textarea',
    id: 'name',
    labelContent: "Cargo",
    maxlength: 40,
    required: true
  }, {
    type: 'date',
    id: 'start-date',
    required: true
  }
];

function validDate(date) {
  const day = parseInt(date.slice(0, 2));
  const month = parseInt(date.slice(2, 4));

  if (!(day > 0 && day <= 31 && month > 0 && month <= 12)) {
    alert('A data que você inseriu é invalida'); 
  }
}

function formatDate(event) {
  const regexRemove = /\D+/gm;
  const regexAdd = /(\d{2})(\d{2})(\d{4})/gm
  let content = event.target.value;
  content = content.replace(regexRemove, '');
  content = content.replace(regexAdd, '$1/$2/$3');
  event.target.value = content;
  
  if (content.length === 10) {
    validDate(content);
  }
}

function renderInputText(objectArray) {
  const input = document.createElement('input');
  input.id = objectArray.id;
  input.type = objectArray.type;
  if (objectArray.required) {
    input.required = true
  }
  input.maxLength = objectArray.maxLength;

  return input;
}

function renderInputRadio(objectArray) {
  const element = document.createElement('div');
  let input;
  let label;

  for (let i = 0; i < objectArray.options.length; i += 1) {
    label = document.createElement('label');
    input = document.createElement('input');

    input.name = objectArray.id;
    input.value = objectArray.options[i];
    input.type = 'radio';

    label.appendChild(input);
    label.innerHTML += objectArray.options[i];
    element.appendChild(label);
  }

  return element;
}

function renderSelect(objectArray) {
  const select = document.createElement('select');
  let option;
  select.id = objectArray.id;

  for (let i = 0; i < objectArray.options.length; i += 1) {
    option = document.createElement('option');
    option.innerText = states[i];
    option.value = states[i];
    select.appendChild(option);
  }

  return select
}

function createRow(fieldset, objectArray) {
  const element = document.createElement('div');
  const label = document.createElement('label');
  let input;

  label.innerText = objectArray.labelContent;
  element.appendChild(label);

  if (objectArray.type === 'text') {
    input = renderInputText(objectArray);
    element.appendChild(input);
  }

  if (objectArray.type === 'select') {
    input = renderSelect(objectArray);
    element.appendChild(input);
  }

  if (objectArray.type === 'radio') {
    input = renderInputRadio(objectArray);
    element.appendChild(input);
  }

  fieldset.appendChild(element);
  
}

function createForms() {
  const form = document.querySelector('form');
  const element = document.createElement('fieldset');
  form.appendChild(element);
  for(let i = 0; i < personalData.length; i += 1) {
    createRow(element, personalData[i]);
  }
}

// dateInput.addEventListener('keyup', formatDate);
window.onload = () => {
  createForms();
}