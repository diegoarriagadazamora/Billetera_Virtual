let user = JSON.parse(localStorage.getItem('user'));

const saldo = $('#lblSaldo');
const saludo = $('#lblSaludo');
const enviar = $('#btnSend');
const depositar = $('#btnAdd');
const movimientos = $('#btnTransactions');

enviar.on('click', function () {
  redireccionar('sendmoney.html');
});

depositar.on('click', function () {
  redireccionar('deposit.html');
});

movimientos.on('click', function () {
  redireccionar('transactions.html');
});

$(document).ready(function () {
  saldo.text(user.balance);
  saludo.text(`Bienvenido, ${user.name}`);
});

function redireccionar(url) {
  $(location).attr('href', url);
}
