const inputsArr = document.querySelectorAll('input');
const errorTextArr = document.querySelectorAll('.error-text');
const form = document.getElementById('form');
const eyes = document.querySelectorAll('.eye');
const confirmErrorText = document.querySelector('.confirm');

const classAdder = (i, input) => {
  input.classList.remove('error');
  input.classList.add('no-error');
  errorTextArr[i].classList.remove('active');
};

const classRemover = (i, input) => {
  input.classList.add('error');
  input.classList.remove('no-error');
  errorTextArr[i].classList.add('active');
};

const validate = e => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const coPassword = document.getElementById('co-password').value;
  inputsArr.forEach((input, i) => {
    if (!input.value.trim()) {
      input.classList.add('error');
      errorTextArr[i].classList.add('active');
    }
  });

  if (password !== coPassword) {
    confirmErrorText.classList.add('active');
  }

  if ([...inputsArr].every(cur => cur.classList.contains('no-error'))) {
    alert('done');
    form.reset();
    document
      .querySelectorAll('input[type=password]')
      .forEach(input => input.setAttribute('type', 'password'));
    inputsArr.forEach(input => input.classList.remove('no-error'));
  }
};

function checkValidation(input, i) {
  if (i === 0) {
    if (input.value.trim().length >= 3) {
      classAdder(i, input);
    } else {
      classRemover(i, input);
    }
  }

  if (i === 1) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(input.value)) {
      classAdder(i, input);
    } else {
      classRemover(i, input);
    }
  }

  if (i === 2) {
    const copassword = document.getElementById('co-password');
    const copasswordValue = document.getElementById('co-password').value;

    if (input.value === copasswordValue) {
      confirmErrorText.classList.remove('active');
      copassword.classList.remove('error');
      copassword.classList.add('no-error');
    }
    if (input.value.length >= 6) {
      classAdder(i, input);
    } else {
      classRemover(i, input);
    }
  }

  if (i === 3) {
    const password = document.getElementById('password').value;

    if (input.value !== password) {
      input.classList.remove('no-error');
      input.classList.add('error');
    }
    if (input.value === password) {
      input.classList.remove('error');
      input.classList.add('no-error');
      errorTextArr[i].classList.remove('active');
    }
  }
}

inputsArr.forEach((input, i) => {
  input.addEventListener('input', () => {
    checkValidation(input, i);
  });
});

form.addEventListener('submit', e => {
  validate(e);
});

const see = e => {
  const element = e.target;
  const input = document.getElementById(`${element.dataset.key}`);
  if (!input.value) return;
  if (document.getElementById(`${element.dataset.key}`).getAttribute('type') === 'text') {
    document.getElementById(`${element.dataset.key}`).setAttribute('type', 'password');
  } else {
    document.getElementById(`${element.dataset.key}`).setAttribute('type', 'text');
  }
};

eyes.forEach(eye => eye.addEventListener('click', see));
