let user = JSON.parse(localStorage.getItem('user'));
let transactions = JSON.parse(localStorage.getItem('transactions'));

const saldo = $('#lblAvisoSaldo');
const back = $('.btnBack');
const deposit = $('#formDeposit');
const cantidad = $('#txtAmount');
const alerta = $('#alertDeposito');
const helper = $('#amountHelper');

back.on('click', function () {
  $(location).attr('href', 'menu.html');
});

deposit.on('submit', function (event) {
  event.preventDefault();
  cantidad.removeClass('is-valid');
  cantidad.removeClass('is-invalid');
  agregarSaldo();
});

$(document).ready(function () {
  setAvisoSaldo(saldo, user.balance);
});

function setAvisoSaldo(element, saldo) {
  element.text(`Saldo: $${saldo}`);
}

function agregarSaldo() {
  if (cantidad.val()) {
    num = parseInt(cantidad.val());
    if (!isNaN(num) && num > 0) {
      cantidad.addClass('is-valid');
      registrarDeposito(num);
      depositoExitoso();
    } else if (!isNaN(num) && num === 0) {
      cantidad.addClass('is-invalid');
      helper.html('El Monto no puede ser 0');
    } else {
      errorDeposito('Ocurrio un error, intente nuevamente');
    }
  } else {
    cantidad.addClass('is-invalid');
    helper.html('Debe ingresar un número');
  }
}

function registrarDeposito(cantidad) {
  user.balance += cantidad;
  localStorage.setItem('user', JSON.stringify(user));
  setAvisoSaldo(saldo, user.balance);
  transactions.push({
    amount: cantidad,
    desc: 'Recarga de Saldo',
    to: 'Cuenta Personal',
    tipo: 0,
  });
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function depositoExitoso() {
  alerta.removeClass('alert-danger');
  alerta.addClass('alert-success');
  alerta.show();
  alerta.html('Recarga Realizada Exitosamente');
}

function errorDeposito(message) {
  alerta.removeClass('alert-success');
  alerta.addClass('alert-danger');
  alerta.show();
  alerta.html(message);
}
