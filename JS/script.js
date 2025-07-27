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

  const nuevaReserva = new Reserva(
    id,
    nombre,
    apellido,
    email,
    personas,
    dia,
    horario
  );
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
      contactos.forEach((contacto) => {
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
      reservas.forEach((reserva) => {
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

//----CARRITO
document.addEventListener("DOMContentLoaded", function () {
  const carritoImg = document.getElementById("carrito-img");
  const carritoContainer = document.getElementById("carrito-container");
  const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

  carritoImg.addEventListener("click", (e) => {
    e.preventDefault();
    carritoContainer.classList.toggle("carrito-visible");
    carritoContainer.classList.toggle("carrito-hidden");
  });

  cerrarCarritoBtn.addEventListener("click", () => {
    carritoContainer.classList.add("carrito-hidden");
    carritoContainer.classList.remove("carrito-visible");
  });

  vaciarCarritoBtn.addEventListener("click", () => {
    const lista = document.getElementById("carrito-lista");
    lista.innerHTML = "";
    localStorage.removeItem("carrito");
  });

  cargarCarritoDesdeLocalStorage();
});

function guardarCarritoEnLocalStorage() {
  const lista = document.getElementById("carrito-lista");
  const items = lista.querySelectorAll("li");

  const productos = [];

  items.forEach((item) => {
    const img = item.querySelector("img");
    const texto = item.querySelector("span")?.textContent;

    productos.push({
      imagen: img?.src || "",
      descripcion: texto || "",
    });
  });

  localStorage.setItem("carrito", JSON.stringify(productos));
}

function cargarCarritoDesdeLocalStorage() {
  const lista = document.getElementById("carrito-lista");
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];

  productos.forEach((producto) => {
    const item = document.createElement("li");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.justifyContent = "space-between";
    item.style.gap = "10px";
    item.style.marginBottom = "10px";

    const imgMini = document.createElement("img");
    imgMini.src = producto.imagen;
    imgMini.alt = "Producto";
    imgMini.style.width = "60px";
    imgMini.style.height = "60px";
    imgMini.style.objectFit = "cover";
    imgMini.style.borderRadius = "5px";
    item.appendChild(imgMini);

    const texto = document.createElement("span");
    texto.textContent = producto.descripcion;
    item.appendChild(texto);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.backgroundColor = "#7b6d8d";
    btnEliminar.style.border = "none";
    btnEliminar.style.color = "white";
    btnEliminar.style.padding = "2px 6px";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.style.borderRadius = "50px";
    btnEliminar.style.fontSize = "12px";

    btnEliminar.addEventListener("click", () => {
      item.remove();
      guardarCarritoEnLocalStorage();
    });
    item.appendChild(btnEliminar);
    lista.appendChild(item);
  });
}

//Agregar productos al carrito
const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombre = boton.getAttribute("data-nombre");
    const precio = boton.getAttribute("data-precio");

    const contenedorProducto = boton.closest(".remeras-card");
    const talleSelect = contenedorProducto.querySelector(".custom-select");
    const talle = talleSelect ? talleSelect.value : "Sin Talle";

    let color = "";
    const colorSeleccionado = contenedorProducto.querySelector(
      ".color-dot.seleccionado"
    );
    const hayOpcionesDeColor = contenedorProducto.querySelector(".color-dot");

    if (hayOpcionesDeColor && !colorSeleccionado) {
      alert(
        "¡Por favor, selecciona un color antes de agregar al carrito, gracias! 🪐"
      );
      return;
    }

    if (colorSeleccionado) {
      color = colorSeleccionado.getAttribute("data-color");
    }

    let imagenSrc = "";
    const carouselItems = contenedorProducto.querySelectorAll(".carousel-item");
    if (carouselItems.length > 0) {
      carouselItems.forEach((item) => {
        if (item.classList.contains("active")) {
          const img = item.querySelector("img");
          if (img) {
            imagenSrc = img.getAttribute("src");
          }
        }
      });
    } else {
      const img = contenedorProducto.querySelector("img");
      if (img) {
        imagenSrc = img.getAttribute("src");
      }
    }

    const item = document.createElement("li");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.justifyContent = "space-between";
    item.style.gap = "10px";
    item.style.marginBottom = "10px";

    const imgMini = document.createElement("img");
    imgMini.src = imagenSrc;
    imgMini.alt = nombre;
    imgMini.style.width = "60px";
    imgMini.style.height = "60px";
    imgMini.style.objectFit = "cover";
    imgMini.style.borderRadius = "5px";
    item.appendChild(imgMini);

    const texto = document.createElement("span");
    let descripcion = `${nombre} - $${precio}`;
    if (talleSelect) descripcion += ` - Talle: ${talle}`;
    if (color) descripcion += ` - Color: ${color}`;
    texto.textContent = descripcion;
    item.appendChild(texto);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.backgroundColor = "#7b6d8d";
    btnEliminar.style.border = "none";
    btnEliminar.style.color = "white";
    btnEliminar.style.padding = "2px 6px";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.style.borderRadius = "50px";
    btnEliminar.style.fontSize = "12px";

    btnEliminar.addEventListener("click", () => {
      item.remove();
      guardarCarritoEnLocalStorage();
    });

    item.appendChild(btnEliminar);
    const lista = document.getElementById("carrito-lista");
    lista.appendChild(item);

    guardarCarritoEnLocalStorage();

    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.classList.add("carrito-visible");
    carritoContainer.classList.remove("carrito-hidden");
  });
});

//Selecciob de color
document.querySelectorAll(".remeras-card").forEach((card) => {
  const dots = card.querySelectorAll(".color-dot");
  const carrusel = card.querySelector(".carousel-inner");
  const items = carrusel ? carrusel.querySelectorAll(".carousel-item") : [];

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      dots.forEach((d) => d.classList.remove("seleccionado"));
      dot.classList.add("seleccionado");

      const colorSeleccionado = dot.getAttribute("data-color");

      if (items.length > 0) {
        items.forEach((item) => {
          if (item.getAttribute("data-color") === colorSeleccionado) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  });
});
