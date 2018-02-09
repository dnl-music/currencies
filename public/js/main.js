
function fillTable() {
  document.getElementById('notification').innerText = 'Updating...';
  fetch('/api')
    .then(function(res){return res.json()})
    .then(function(res){
      var tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
      tableBody.innerHTML = '';
      res.currencies.forEach(e => {
        var newRow = document.createElement('tr');

        var tdName = document.createElement('td');
        var tdVolume = document.createElement('td');
        var tdAmount = document.createElement('td');

        tdName.innerText = e.name;
        tdVolume.innerText = e.volume;
        tdAmount.innerText = e.amount.toFixed(2);

        newRow.appendChild(tdName);
        newRow.appendChild(tdVolume);
        newRow.appendChild(tdAmount);

        tableBody.appendChild(newRow);
      })
      document.getElementById('notification').innerText = 'Updated at ' + res.updatedAt;
    }).catch(function(err) {
        console.log(err);
        document.getElementById('notification').innerText = 'Could not get data from the server';
    })
}

window.onload = function() {
  fillTable();
  setInterval(fillTable, 15000);
  document.getElementById('update_btn').onclick = function(e) {
    fillTable();
  }
}