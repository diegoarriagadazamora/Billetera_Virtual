const transactions = JSON.parse(localStorage.getItem('transactions'));
const ultimosMovimientos = $('#divMovimientos');
const back = $('.btnBack');

back.on('click', function () {
  $(location).attr('href', 'menu.html');
});

$(document).ready(function () {
  cargarUltimosMovimientos();
});

function cargarUltimosMovimientos() {
  let tbody =
    '<table class="table table-responsive table-hover table-sm table-borderless-column"><thead><th>Monto</th><th>Descripcion</th><th>Destinatario</th><th>Tipo de Movimiento</th></thead><tbody>';
  for (let i = transactions.length - 1; i >= 0; i--) {
    tbody += `<tr><td>${transactions[i].amount}</td><td>${
      transactions[i].desc
    }</td><td>${transactions[i].to}</td><td>${setTipo(
      transactions[i].tipo
    )}</td></tr>`;
  }
  tbody += '</tbody></table>';
  ultimosMovimientos.html(tbody);
  console.log(tbody);
  console.log(transactions.length);
}

function setTipo(val) {
  let tipo = '';
  if (val === 0) {
    tipo = 'Deposito';
  }
  if (val === 1) {
    tipo = 'Transferencia';
  }

  return tipo;
}
