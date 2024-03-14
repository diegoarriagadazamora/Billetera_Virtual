const demoUser = {
  name: 'Diego Arriagada',
  username: 'Admin',
  password: '123456',
  balance: 0,
};

const transactions = [
  {
    amount: 50000,
    desc: 'Transferencia a Jorge',
    to: 'Jorge Leal',
    tipo: 1,
  },
  {
    amount: 7000,
    desc: 'Transferencia a Juan',
    to: 'Juan Beleño',
    tipo: 1,
  },
  {
    amount: 15000,
    desc: 'cuota cumpleaños',
    to: 'Benjamín Sepulveda',
    tipo: 1,
  },
  {
    amount: 2000,
    desc: 'Transferencia a Cami',
    to: 'Camila Villegas',
    tipo: 1,
  },
  {
    amount: 300000,
    desc: 'Deposito',
    to: 'Cuenta Personal',
    tipo: 0,
  },
  {
    amount: 25000,
    desc: 'Entradas TomorrowLand',
    to: 'TomorrowLand Ticket',
    tipo: 1,
  },
];

const contacts = [
  { nombre: 'Jorge Leal', cuenta: 123456, alias: 'Jorge' },
  { nombre: 'Juan Beleño', cuenta: 234567, alias: 'Juan' },
  { nombre: 'Benjamin Sepulveda', cuenta: 345678, alias: 'Benja' },
  { nombre: 'Camila Villegas', cuenta: 456789, alias: 'Cami' },
  { nombre: 'TomorrowLand Ticket', cuenta: 567890, alias: 'TomorrowLand' },
];

const user = $('#loginUser');
const pass = $('#loginPassword');
const formulario = $('#loginForm');
const alerta = $('#alertLogin');
const helpUser = $('#userMessage');
const helpPassword = $('#pwdMessage');

formulario.on('submit', (event) => {
  event.preventDefault();
  user.removeClass('is-invalid');
  pass.removeClass('is-invalid');
  login();
});

function login() {
  if (user.val() && pass.val()) {
    if (user.val() === demoUser.username && pass.val() === demoUser.password) {
      loginExitoso();
      inicializarData();
      setTimeout(() => {
        $(location).attr('href', 'html/menu.html');
      }, 1000);
    } else {
      if (
        user.val() !== demoUser.username ||
        pass.val() !== demoUser.password
      ) {
        loginFallido('Credenciales Erroneas');
      }
    }
  } else {
    if (!user.val()) {
      user.addClass('is-invalid');
      helpUser.html('Debe ingreser un nombre de Usuario');
    }

    if (!pass.val()) {
      pass.addClass('is-invalid');
      helpPassword.html('Debe Ingrear una contraseña');
    }
  }
}

function inicializarData() {
  localStorage.setItem('user', JSON.stringify(demoUser));
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loginExitoso() {
  alerta.removeClass('alert-danger');
  alerta.addClass('alert-success');
  alerta.show();
  alerta.html('Login Exitoso, Redirigiendo....');
}

function loginFallido(message) {
  alerta.removeClass('alert-success');
  alerta.addClass('alert-danger');
  alerta.show();
  alerta.html(message);
}