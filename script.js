// Declaro un array de objetos con todos mis productos

let productos = [
    { id: 1, nombre: "Hollow Knight", precio: 179.99, genero: "Plataformas | Historia", img: "./images/hollow_knight.jpeg" },
    { id: 2, nombre: "BioShock Infinite", precio: 395.99, genero: "FPS | Historia", img: "./images/bioshock_infinite.jpg" },
    { id: 3, nombre: "Far Cry 3", precio: 999.99, genero: "FPS | Mundo abierto", img: "./images/far_cry3.webp" },
    { id: 4, nombre: "Counter-Strike:Source", precio: 129.99, genero: "FPS | Juego de disparos táctico", img: "./images/counter_strike_source.jpg" },
    { id: 5, nombre: "Grand Theft Auto V", precio: 699.99, genero: "Mundo abierto | Historia", img: "./images/grand_theft_auto_v.jpeg" },
    { id: 6, nombre: "Dead by Daylight", precio: 999.99, genero: "Horror | Supervivencia", img: "./images/dead_by_daylight.jpeg" },
    { id: 7, nombre: "FIFA 23", precio: 8999.99, genero: "Deportes | Fútbol", img: "./images/fifa23.jpg" },
    { id: 8, nombre: "Fallout 4", precio: 799.99, genero: "Mundo abierto | RPG", img: "./images/fallout4.jpg" },
    { id: 9, nombre: "Dying Light 2", precio: 2999.99, genero: "Mundo abierto | Zombies", img: "./images/dying_light.jpeg" },
    { id: 10, nombre: "God of War", precio: 4199.99, genero: "Aventura | Historia", img: "./images/god_of_war.jpeg" },
    { id: 11, nombre: "Grounded", precio: 3199.99, genero: "Supervivencia", img: "./images/grounded.jpeg" },
    { id: 12, nombre: "Age of Empires II", precio: 299.99, genero: "Estrategia", img: "./images/age_of_empires2.jpeg" }
]

let contenedorProductos = document.getElementById("contenedorProductos")

// Código antiguo sin la función de filtrado

/*contenedorProductos.innerHTML = ''
for (const { id, nombre, precio, genero, img } of productos) {
    let tarjetaProducto = document.createElement('div')
    tarjetaProducto.className = 'producto'
    tarjetaProducto.innerHTML = `
    <img src=${img}>
    <h3 class= "productoTarjeta">${nombre}</h3>
    <h4 class= "productoTarjeta">${genero}</h4>
    <h5 class= "productoTarjeta">$${precio}</h5>
    <button class="boton" id=${id}>Agregar al carrito</button>
    `
    contenedorProductos.append(tarjetaProducto)
}*/

// Filtro los productos mediante un input

renderizarProductos()

let inputBusqueda = document.getElementById('busqueda')

inputBusqueda.oninput = () => {
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(inputBusqueda.value))
    renderizarProductos(productosFiltrados)
    actualizarCarrito()
}

function renderizarProductos(productosFiltrados) {
    let productosARenderizar = productos
    if (productosFiltrados) {
        productosARenderizar = productosFiltrados
    }
    contenedorProductos.innerHTML = ''
    for (const { id, nombre, precio, genero, img } of productosARenderizar) {
        let tarjetaProducto = document.createElement('div')
        tarjetaProducto.className = 'producto'
        tarjetaProducto.innerHTML = `
    <img src=${img}>
    <h3 class= "productoTarjeta">${nombre}</h3>
    <h4 class= "productoTarjeta">${genero}</h4>
    <h5 class= "productoTarjeta">$${precio}</h5>
    <button class="boton" id=${id}>Agregar al carrito</button>
    `
        contenedorProductos.append(tarjetaProducto)
    }
}

let botones = document.getElementsByClassName('boton')
let carrito = document.getElementById('carrito')

// Guardo el carrito en localStorage

let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || []

actualizarCarrito()
renderizarCarrito()

// Actualizo el carrito a medida que el usuario interactúa con los botones

function actualizarCarrito() {
    for (const boton of botones) {
        boton.onclick = (e) => {
            let productoBuscado = productos.find(productos => productos.id == e.target.id)

            let posicionProductoEnCarrito = carritoGuardado.findIndex(productos => productos.id == productoBuscado.id)

            if (posicionProductoEnCarrito != -1) {
                carritoGuardado[posicionProductoEnCarrito].unidades++
                carritoGuardado[posicionProductoEnCarrito].subtotal = carritoGuardado[posicionProductoEnCarrito].precioUnidad * carritoGuardado[posicionProductoEnCarrito].unidades
            } else {
                carritoGuardado.push({ id: productoBuscado.id, nombre: productoBuscado.nombre, precioUnidad: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio })
            }

            localStorage.setItem('carrito', JSON.stringify(carritoGuardado))
            renderizarCarrito()
        }
    }
}

// Renderizo el carrito según si había o no un carrito previo

function renderizarCarrito() {
    carrito.innerHTML = `
    <div class="itemCarrito">
        <p>Videojuego:</p>
        <p>Precio:</p>
        <p>Cantidad:</p>
        <p>Subtotal:</p>
    </div>
    `
    let total = 0
    for (const item of carritoGuardado) {
        total += item.subtotal
        carrito.innerHTML += `
        <div class="itemCarrito">
            <p>${item.nombre}</p>
            <p>${item.precioUnidad}</p>
            <p>${item.unidades}</p>
            <p>$${Math.round(item.subtotal)}</p>
        </div>
        `
    }
    carrito.innerHTML += `
    <div class="itemCarrito">
        <h3>Total: $${Math.round(total)}</h3>
    </div>
    `
}

// Botón para borrar LocalStorage y el carrito en si

let btnBorrar = document.getElementById("btnBorrar")
btnBorrar.onclick = () => {
    localStorage.clear()
    location.reload()
}
