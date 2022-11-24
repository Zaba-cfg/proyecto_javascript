let productos = []

// Hago un timeout para simular tiempo de espera a la hora de usar el fetch

setTimeout(() => {
    fetch('./productos.json')
        .then(response => response.json())
        .then(productos => renderizarCodigo(productos))
}, 500)

// Creo una función que engloba todo el código para que al momento de usar el fetch este no falle

function renderizarCodigo(productos) {
    let contenedorProductos = document.getElementById("contenedorProductos")

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
    <button class="boton" id=${id}>AGREGAR AL CARRITO</button>
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
                // Uso toastify con los botones de las cards
                Toastify({
                    text: "¡Videojuego agregado al carrito!",
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'right',
                    style: {
                        background: "#191717",
                        text: "#ffffff"
                    },
                    onClick: function () {
                        carrito.classList.toggle("oculto")
                    }
                }).showToast();
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
        <h3>TOTAL: $${Math.round(total)}</h3>
    </div>
    `
    }

    // Botón para borrar LocalStorage y el carrito en si

    let btnBorrar = document.getElementById("btnBorrar")
    btnBorrar.onclick = () => {
        localStorage.clear()
        location.reload()
    }

    //Ocultador de carrito

    const verCarrito = document.getElementById("verCarrito")
    verCarrito.onclick = () => {
        carrito.classList.toggle("oculto")
    }
}