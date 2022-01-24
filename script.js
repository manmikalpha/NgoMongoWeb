const api_url = "https://manmiktest.herokuapp.com/user";
//const api_url = "http://localhost:8080/user";

function loadData(records = []) {
  var table_data = "";
  for (let i = 0; i < records.length; i++) {
    table_data += `<tr>`;
    table_data += `<td>${records[i].name}</td>`;
    table_data += `<td>${JSON.stringify(records[i].address)}</td>`;
    table_data += `<td>${records[i].sector}</td>`;
    table_data += `<td>${records[i].contact}</td>`;
    table_data += `<td>${JSON.stringify(records[i].members)}</td>`;
    table_data += `<td>`;
    table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
  </svg> Update</button></a>`;
    table_data += "&nbsp;&nbsp;";
    table_data += `<button class="btn btn-success" onclick=deleteData('${records[i]._id}')><span class="glyphicon glyphicon-remove-sign"></span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>  Delete</button>`;
    table_data += `</td>`;
    table_data += `</tr>`;
  }
  //console.log(table_data);
  document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
      loadData(data);
    });
}

function getDataById(id) {
  fetch(`${api_url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("id").value = data._id;
      document.getElementById("name").value = data.name;
      console.log(document.getElementById("name"));
      document.getElementById("address").value = JSON.stringify(data.address);
      document.getElementById("sector").value = data.sector;
      document.getElementById("contact").value = data.contact;
      document.getElementById("members").value = JSON.stringify(data.members);
    });
}

function postData() {
  var name = document.getElementById("name").value;
  var address = document.getElementById("address").value;
  var sector = document.getElementById("sector").value;
  var contact = document.getElementById("contact").value;
  var members = document.getElementById("members").value;

  data = {
    name: name,
    address: address,
    sector: sector,
    contact: contact,
    members: members,
  };

  fetch(api_url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "start.html";
    });
}

function putData() {
  var _id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var address = document.getElementById("address").value;
  var sector = document.getElementById("sector").value;
  var contact = document.getElementById("contact").value;
  var members = document.getElementById("members").value;

  data = {
    _id: _id,
    name: name,
    address: address,
    sector: sector,
    contact: contact,
    members: members,
  };

  fetch(api_url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
      window.location.href = "start.html";
    });
}

function deleteData(id) {
  user_input = confirm("Are you sure you want to delete this record?");
  if (user_input) {
    fetch(api_url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  }
}
