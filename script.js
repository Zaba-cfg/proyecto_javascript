// Mostramos un alert al usuario
alert("¡Bienvenido a Juegos para Todos!\nA continuación le mostraremos los juegos disponibles:\n(Todos los juegos listados tienen impuestos según su lugar de residencia)")

// Declaro las variables
let hollow = 179.99
let bio = 395.99
let far = 999.00
let counter = 129.99

let impuesto = Number(1.75)

let resultado = 0

// Función para calcular los impuestos en Argentina
function calculoImpuestos(opcion) {
    if (opcion == 1) {
        return resultado = hollow * impuesto
    } if (opcion == 2) {
        return resultado = bio * impuesto
    } if (opcion == 3) {
        return resultado = far * impuesto
    } else {
        return resultado = counter * impuesto
    }
}

// Switch para la elección y cálculo de los juegos
let opcion
do {
    opcion = Number(prompt("Seleccione el juego que desea comprar:\n1 - Hollow Knight --- ARS$ 179,99 \n2 - BioShock Infinite --- ARS$ 395,99\n3 - Far Cry 3 --- ARS$ 999,00\n4 - Counter-Strike --- ARS$ 129,99\n\n0 - CERRAR MENÚ"))
    switch (opcion) {
        case 1:
            alert("El precio total sumado los impuestos es de: "+Math.round(calculoImpuestos(1)) + " ARS$")
            break
        case 2:
            alert("El precio total sumado los impuestos es de: "+Math.round(calculoImpuestos(2)) + " ARS$")
            break
        case 3:
            alert("El precio total sumado los impuestos es de: "+Math.round(calculoImpuestos(3)) + " ARS$")
            break
        case 4:
            alert("El precio total sumado los impuestos es de: "+Math.round(calculoImpuestos(4)) + " ARS$")
            break
        case 0:
            alert("Gracias por visitarnos, cerrando...")
            break
        default:
            alert("Valor incorrecto, seleccione alguna de las opciones")
            break
    }
} while (opcion !== 0)
