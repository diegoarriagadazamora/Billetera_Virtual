let user = JSON.parse(localStorage.getItem('user'));
let contacts = JSON.parse(localStorage.getItem('contacts'));
let transactions = JSON.parse(localStorage.getItem('transactions'));

const lblSaldo = $('#lblAvailable');
const btnBack = $('.btnBack');
const btnAddContact = $('#btnAddContact');
const formSent = $('#formSentMoney');
const formAdd = $('#formAddContact');
const cantidad = $('#txtSentMoney');
const mensaje = $('#txtTransferMessage');
const listaContactos = $('#divContactos');
const divAgregarContacto = $('#divAddContact');
const nombreContacto = $('#txtAddName');
const cuentaContacto = $('#txtAddAccount');
const aliasContacto = $('#txtAddAlias');
const alerta = $('#alertTransferencia');

btnBack.on('click', function () {
  $(location).attr('href', 'menu.html');
});

formSent.on('submit', function (event) {
  event.preventDefault();
  sentMoney();
});

formAdd.on('submit', function (event) {
  event.preventDefault();
  agregarContacto();
});

btnAddContact.on('click', function () {
  if (divAgregarContacto.css('display') == 'none') {
    divAgregarContacto.show();
    btnAddContact.val('Cerrar');
  } else {
    divAgregarContacto.hide();
    btnAddContact.val('Agregar Nuevo Contacto');
  }
});

$(document).ready(function () {
  setAvisoSaldo(lblSaldo, user.balance);
  cargarContactos();
});

function setAvisoSaldo(element, saldo) {
  element.text(`Monto Maximo de Transferencia: ${saldo}`);
}

function sentMoney() {
  const num = parseInt(cantidad.val());

  if (
    !isNaN(num) &&
    num > 0 &&
    num <= user.balance &&
    $("input[name='radContacts']:checked").val()
  ) {
    registrarTransferencia(num);
    transferenciaExitosa();
  } else if (!isNaN(num) && num === 0) {
    transferenciaFallida('El monto a Transferir no puede ser 0');
  } else if (!isNaN(num) && num > 0 && num > user.balance) {
    transferenciaFallida(
      'El monto a transferir no puede execeder al monto en su cuenta'
    );
  } else if (!$("input[name='radContacts']:checked")) {
    transferenciaFallida('Debe seleccionar un Contacto');
  } else if (!mensaje.val()) {
    transferenciaFallida('Debe ingresar un mensaje');
  } else if (!cantidad.val()) {
    transferenciaFallida('Debe Ingresar un monto');
  } else {
    transferenciaFallida('Ocurrio un error, intente nuevamente');
  }
}

function cargarContactos() {
  let body = '';
  if (contacts) {
    body =
      '<table id="tableContacts" class="table table-responsive table-hover table-sm table-borderless-column"><theader><th></th><th>Alias</th><th>Nombre</th><th>Numero de Cuenta</th></theader><tbody>';
    contacts.forEach((element) => {
      body +=
        '<tr><td><input type="radio" name="radContacts" value="' +
        element.nombre +
        '" id="' +
        element.cuenta +
        '"></td><td><label>' +
        element.alias +
        '</label></td><td><label>' +
        element.nombre +
        '</label></td><td><label>' +
        element.cuenta +
        '</label></td></tr>';
    });
    body += '</tbody></table>';
  } else {
    body = '<span>No hay Contactos Registrados</span>';
  }

  listaContactos.html(body);
}

function registrarTransferencia(cantidad) {
  user.balance -= cantidad;
  setAvisoSaldo(lblSaldo, user.balance);
  localStorage.setItem('user', JSON.stringify(user));
  transactions.push({
    amount: cantidad,
    desc: mensaje.val(),
    to: $("input[name='radContacts']:checked").val(),
    tipo: 1,
  });
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function agregarContacto() {
  contacts.push({
    nombre: nombreContacto.val(),
    cuenta: parseInt(cuentaContacto.val()),
    alias: aliasContacto.val(),
  });
  cargarContactos();
  $(`#${cuentaContacto.val()}`).prop('checked', true);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  divAgregarContacto.hide();
}

function transferenciaExitosa() {
  alerta.removeClass('alert-danger');
  alerta.addClass('alert-success');
  alerta.show();
  alerta.html('Transferencia realizada Exitosamente');
}

function transferenciaFallida(message) {
  alerta.removeClass('alert-success');
  alerta.addClass('alert-danger');
  alerta.show();
  alerta.html(message);
}
