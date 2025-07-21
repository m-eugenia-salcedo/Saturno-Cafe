//crear el constructor de Contacto
function Contacto(id, nombre, email, mensaje) {
  this.id = id;
  this.nombre = nombre;
  this.email = email;
  this.mensaje = mensaje;
}

//crear el constructor de Reserva
function Reserva(id, nombre, apellido, email, personas, dia, horario) {
  this.id       = id;
  this.nombre   = nombre;
  this.apellido = apellido;
  this.email    = email;
  this.personas = personas;
  this.dia      = dia;
  this.horario  = horario;
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

document.addEventListener("DOMContentLoaded", () => {
  const formRes = document.getElementById("formularioReserva");
  formRes.addEventListener("submit", (e) => {
    e.preventDefault();
    registrarReserva();
  });
});

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

  const ultimoId = reservas.length? reservas[reservas.length - 1].id: 0;
  const id = ultimoId + 1;

  const nuevaReserva = new Reserva(id, nombre, apellido, email, personas, dia, horario);
  reservas.push(nuevaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert(`¡Reserva confirmada para el ${dia} a las ${horario}!`);

  // acá buscás el form de nuevo y lo reseteás
  document.getElementById("formularioReserva").reset();

  console.log("Reservas actuales:", reservas);
}