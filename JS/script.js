//crear el constructor de Contacto
function Contacto(id, nombre, email, mensaje) {
  this.id = id;
  this.nombre = nombre;
  this.email = email;
  this.mensaje = mensaje;
}

//crear el constructor de Reserva
function Reserva(id, nombre, apellido, email, personas, dia, horario) {
  this.id = id;
  this.nombre = nombre;
  this.apellido = apellido;
  this.email = email;
  this.personas = personas;
  this.dia = dia;
  this.horario = horario;
}

//localstorage de contactos
let contactos = JSON.parse(localStorage.getItem("contactos")) || [
  {
    id: 1,
    nombre: "Juan",
    email: "juan@mail.com",
    mensaje: "Quiero saber sobre remeras. Gracias",
  },
  {
    id: 2,
    nombre: "Ana",
    email: "ana@mail.com",
    mensaje: "Hola podría mandar un cv?",
  },
];

//localstorage para Reservas
let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

//validacion localstorage
if (!localStorage.getItem("contactos")) {
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

if (!localStorage.getItem("reservas")) {
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

function registrarContacto() {
  const nombre = document.querySelector("#nombreContacto").value;
  const email = document.querySelector("#emailContacto").value;
  const mensaje = document.querySelector("#mensajeContacto").value;

  // Validaciones
  if (!nombre || !email || !mensaje) {
    alert("Por favor, completá todos los campos.");
    return;
  }
  if (!email.includes("@")) {
    alert("El email debe contener '@'.");
    return;
  }

  // genero nuevo id
  const ultimoId = contactos.length ? contactos[contactos.length - 1].id : 0;
  const id = ultimoId + 1;

  // creo y guardo lo del form en el array
  const contacto = new Contacto(id, nombre, email, mensaje);
  contactos.push(contacto);
  localStorage.setItem("contactos", JSON.stringify(contactos));
  alert(
    "Gracias por comunicarte con nosotros! Te enviaremos una respuesta lo más pronto posible."
  );

  // Limpiar formulario y mostrar array en consola
  document.getElementById("formulario").reset();
  console.log(contactos);
}

function registrarReserva() {
  const nombre = document.getElementById("nombreTitular").value.trim();
  const apellido = document.getElementById("apellidoTitular").value.trim();
  const email = document.getElementById("emailTitular").value.trim();
  const personas = document.getElementById("cantidadPersonas").value;
  const dia = document.getElementById("diaReserva").value;
  const horario = document.getElementById("horarioReserva").value;

  if (!nombre || !apellido || !email || !personas || !dia || !horario) {
    alert("Por favor, completá todos los campos.");
    return;
  }
  if (!email.includes("@")) {
    alert("El email debe contener '@'.");
    return;
  }

  const ultimoId = reservas.length ? reservas[reservas.length - 1].id : 0;
  const id = ultimoId + 1;

  const nuevaReserva = new Reserva(id, nombre, apellido, email, personas, dia, horario);
  reservas.push(nuevaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert(`¡Reserva confirmada para el ${dia} a las ${horario}!`);

  document.getElementById("formularioReserva").reset();

  console.log("Reservas actuales:", reservas);
}

function iniciarSesion() {
  const user = document.getElementById("usuariologin").value;
  const password = document.getElementById("contraseñalogin").value;

  if (!user || !password) {
    alert("Por favor completá ambos campos.");
    return;
  }

  // Credenciales hardcodeadas
  if (user === "GerenteSaturno" && password === "saturno567") {
    window.location.href = "panel.html";
  } else {
    alert("Credenciales incorrectas");
  }
}

// Mostrar datos en panel.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("panel.html")) {
    const listaContactos = document.getElementById("lista-contactos");
    const listaReservas = document.getElementById("lista-reservas");

    // Mostrar contactos
    if (contactos.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No hay contactos registrados.";
      listaContactos.appendChild(p);
    } else {
      contactos.forEach(contacto => {
        const ficha = document.createElement("div");
        ficha.className = "ficha-item";

        const nombre = document.createElement("p");
        nombre.textContent = `🧑 Nombre: ${contacto.nombre}`;

        const email = document.createElement("p");
        email.textContent = `📧 Email: ${contacto.email}`;

        const mensaje = document.createElement("p");
        mensaje.textContent = `💬 Mensaje: ${contacto.mensaje}`;

        ficha.appendChild(nombre);
        ficha.appendChild(email);
        ficha.appendChild(mensaje);

        listaContactos.appendChild(ficha);
      });
    }

    // Mostrar reservas
    if (reservas.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No hay reservas registradas.";
      listaReservas.appendChild(p);
    } else {
      reservas.forEach(reserva => {
        const ficha = document.createElement("div");
        ficha.className = "ficha-item";

        const nombre = document.createElement("p");
        nombre.textContent = `🧑 Nombre: ${reserva.nombre} ${reserva.apellido}`;

        const email = document.createElement("p");
        email.textContent = `📧 Email: ${reserva.email}`;

        const personas = document.createElement("p");
        personas.textContent = `👥 Personas: ${reserva.personas}`;

        const diaHora = document.createElement("p");
        diaHora.textContent = `📅 Día y hora: ${reserva.dia} a las ${reserva.horario}`;

        ficha.appendChild(nombre);
        ficha.appendChild(email);
        ficha.appendChild(personas);
        ficha.appendChild(diaHora);

        listaReservas.appendChild(ficha);
      });
    }
  }
});