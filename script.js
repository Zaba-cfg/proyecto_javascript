// Mostramos un alert al usuario
alert("¡Bienvenido a Juegos para Todos!\n(Todos nuestros juegos poseen un impuesto que dependerá de su país de residencia)")

let videojuegos = [
    { id: 1, nombre: "Hollow Knight", precio: 179.99, genero: "plataformas" },
    { id: 2, nombre: "BioShock Infinite", precio: 395.99, genero: "disparos en primera persona" },
    { id: 3, nombre: "Far Cry 3", precio: 999.00, genero: "mundo abierto" },
    { id: 4, nombre: "Counter-Strike", precio: 129.99, genero: "disparos en primera persona" },
    { id: 5, nombre: "Grand Theft Auto V", precio: 699.99, genero: "mundo abierto" }
]

let precioAFiltrar = prompt("Los juegos menores al precio que ingrese apareceran a continuación:")

const carrito = [];

let videojuegosOfrecidos = `Estos son los videojuegos que tenemos disponibles:\n`


function agregaCarrito() {
    for (juego of videojuegos.filter((juego) => juego.precio < precioAFiltrar)) {
        videojuegosOfrecidos += ` \n ${juego.id} - ${juego.nombre}  |  $ ${juego.precio} ARS`
    }

    videojuegosOfrecidos += `\n\nIngrese el número del videojuego que desea agregar al carrito. Para cerrar el carrito pulse 0 o ENTER`

    let accionUsuario = Number(prompt(videojuegosOfrecidos))

    while (isNaN(accionUsuario)) {
        alert("Por favor, ingrese sólo numeros")
        accionUsuario = Number(prompt(videojuegosOfrecidos))
    }

    while (accionUsuario != 0) {
        switch (accionUsuario) {
            case 1:
                carrito.push(videojuegos[0])
                alert(`Agregamos a tu carrito el videojuego ${videojuegos[0].nombre}`)
                break;
            case 2:
                carrito.push(videojuegos[1])
                alert(`Agregamos a tu carrito el videojuego ${videojuegos[1].nombre}`)
                break;
            case 3:
                carrito.push(videojuegos[2])
                alert(`Agregamos a tu carrito el videojuego ${videojuegos[2].nombre}`)
                break;
            case 4:
                carrito.push(videojuegos[3])
                alert(`Agregamos a tu carrito el videojuego ${videojuegos[3].nombre}`)
                break;
            case 5:
                carrito.push(videojuegos[4])
                alert(`Agregamos a tu carrito el videojuego ${videojuegos[4].nombre}`)
                break;
            default:
                alert("No tenemos ese videojuego")
                break
        }
        accionUsuario = Number(prompt(videojuegosOfrecidos))
    }
    alert("Estos son los videojuegos que a elegido para comprar:")
    mostrarCarrito();
}

let videojuegosCarrito = "Videojuegos seleccionados: \n"
let precioCarrito = 0
let precioConImpuestos = 0

function mostrarCarrito() {
    for (videojuegoCarrito of carrito) {
        videojuegosCarrito += ` \n - ${videojuegoCarrito.nombre}`
        precioCarrito += videojuegoCarrito.precio
    }
    precioConImpuestos += precioCarrito * 1.75
    alert(`${videojuegosCarrito} \n\nPor un total de: $ ${Math.round(precioCarrito)} ARS\nTotal más los impuestos de Argentina: $ ${Math.round(precioConImpuestos)} ARS`)
}
agregaCarrito()