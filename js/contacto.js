const persona = {
    id : 0,
    nombres : '',
    apellidos : '',
    telefono : '',
    email : '',
    ciudad : '',
    pais : ''
}
const personaArray = JSON.parse(localStorage.getItem('personas')) || [];

function processContactForm(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const persona = {
        nombre: document.forms["contactos"]["name"].value,
        apellido: document.forms["contactos"]["lname"].value,
        telefono: document.forms["contactos"]["tele"].value,
        email: document.forms["contactos"]["email"].value,
        ciudad: document.forms["contactos"]["ciudad"].value,
        pais: document.forms["contactos"]["pais"].value
    };

    // Verificar que todos los campos tengan valores
    if (!persona.nombre || !persona.apellido || !persona.telefono || !persona.email || !persona.ciudad || !persona.pais) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Agregar el objeto persona al array personaArray
    personaArray.push(persona);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('personas', JSON.stringify(personaArray));

    // Mostrar un mensaje de éxito
    alert("Datos guardados con éxito.");
}
function listarContactos() {
    const tableContainer = document.getElementById('tablecontac');
    tableContainer.innerHTML = ''; // Limpiar el contenido previo

    if (personaArray.id < 0) {
        personaArray.id = new Date().valueOf();
        tableContainer.innerHTML = '<p>No hay contactos guardados.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-striped';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'Ciudad', 'País', 'Acciones'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    personaArray.forEach((persona, index) => {
        const row = document.createElement('tr');

        // Agregar el ID
        const idCell = document.createElement('td');
        idCell.textContent = index + 1; // El ID será el índice + 1
        row.appendChild(idCell);

        // Agregar los demás campos
        Object.values(persona).forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });

        // Agregar el botón "Detalles"
        const actionCell = document.createElement('td');
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Detalles';
        detailsButton.className = 'btn btn-primary';
        detailsButton.onclick = () => window.location.href = `detalles.html?index=${index}`; // Redirigir a detalles.html con el índice
        actionCell.appendChild(detailsButton);

        // Agregar el botón "Modificar"
        const modifiButton = document.createElement('button');
        modifiButton.textContent = 'Modificar';
        modifiButton.className = 'btn btn-primary';
        modifiButton.onclick = () => window.location.href = `detalles.html?index=${index}`; // Redirigir a detalles.html con el índice
        actionCell.appendChild(modifiButton);

        // Agregar el botón "Eliminar"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'btn btn-danger';
        deleteButton.onclick = () => deleteContact(index); // Llamar a deleteContact con el índice
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableContainer.appendChild(table);
}

function deleteContact(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
        personaArray.splice(index, 1); // Eliminar el contacto del array
        localStorage.setItem('personas', JSON.stringify(personaArray)); // Actualizar el localStorage
        listarContactos(); // Volver a listar los contactos
    }
}