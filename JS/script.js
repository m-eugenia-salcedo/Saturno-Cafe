//crear el constructor de Contacto
function Contacto(id, nombre, email, mensaje) {
  this.id = id;
  this.nombre = nombre;
  this.email = email;
  this.mensaje = mensaje;
}

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

if (!localStorage.getItem("contactos")) {
  localStorage.setItem("contactos", JSON.stringify(contactos));
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
