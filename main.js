import {tChino} from './js/chino.js'
import {diofantica,euclides} from './js/diofantica.js'
import {diccionarioLetraNumero,algoritmoEnteros} from './js/cifrado.js'


// Ecuacion diofantica
let btnDiofantica = document.querySelector('.btnDiofantica')
let xDiofantica = document.querySelector('#xDiofantica')
let yDiofantica = document.querySelector('#yDiofantica')
let mDiofantica = document.querySelector('#cDiofantica')
let resultadoDiofantica = document.querySelector('.resultadoDiofantica')
let resultadoGeneeralDiofantica = document.querySelector('.resultadoGeneeralDiofantica')

let btnChino = document.querySelector('.btnChino')

btnDiofantica.addEventListener('click',() => {
    //euclides
    let s = Number(xDiofantica.value)
    let t =  Number(yDiofantica.value)
    let m = Number(mDiofantica.value)

    // Calcular el maximo comun divisor
    let mcd = euclides(s,t)
    // Soluciones enteras si mcd divide a c
    if (m % mcd == 0) {
        let cooprimo  = [s/mcd, t/mcd,m / mcd]
        let resultado = diofantica(cooprimo[0],cooprimo[1]) 
        resultadoDiofantica.innerText = `Solucion particualar: x_0 = ${resultado[0]*cooprimo[2]} y_0 = ${resultado[1]*cooprimo[2]}`
        resultadoGeneeralDiofantica.innerText = `Solucion General: \nx = ${resultado[0]*cooprimo[2]} + ${cooprimo[1]}t\n y = ${resultado[1]*cooprimo[2]} - ${cooprimo[0]}t`
    }else
        resultadoDiofantica.innerText = 'La operacion no se puede realizar'

    xDiofantica.value = ''
    yDiofantica.value = ''
    mDiofantica.value = ''
})



// Teorema de los restos chinos

let resutadoRestoChino = document.querySelector('.resutadoRestoChino')
let addEcuacion = document.querySelector('.addEcuacion')
let contendorChino = document.querySelector('.contendorChino')
let removeEcuacion = document.querySelector('.removeEcuacion')
// Añade mas ecuaciones para calcualar
addEcuacion.addEventListener('click',() => {
    let ecuacion = ` <div class="ecuacion">
    x ≡
    <input type="text" class="restoEcuacion" >
    mod(
    <input type="text" class="moduloEcuacion">
    )
    </div>`
    contendorChino.innerHTML += ecuacion
})

// Limpia los campos
removeEcuacion.addEventListener('click',() => {
    location.reload()
})


btnChino.addEventListener('click',() => {
    const restoEcuacion = document.querySelectorAll('.restoEcuacion')
    const moduloEcuacion = document.querySelectorAll('.moduloEcuacion')
    let modulos= []
    let restos = []
    let respuesta = ''
    for (let i = 0; i < restoEcuacion.length; i++) {
        // Dar la respuest en forma de string 
/*         respuesta += `x ≡ ${restoEcuacion[i].value} mod(${moduloEcuacion[i].value}) \n`
 */
        modulos.push(Number(restoEcuacion[i].value))
        restos.push(Number(moduloEcuacion[i].value))

     
    }
    console.log(modulos);
    console.log(restos);
    let longitud = modulos.length
    console.log(longitud);
    console.log(tChino(modulos,restos,longitud));
    respuesta += `Solucion: x= ${tChino(modulos,restos,longitud)}`
    resutadoRestoChino.innerText = respuesta


})


// Ejercicio RSA

// Crear una clave valor para cada letra del abecedario
const crearDiccionario = diccionarioLetraNumero()
// Obtener datos de los input
let btnCifrar = document.querySelector('.btnCifrar')
let dato_p = document.querySelector('.dato_p')
let dato_q = document.querySelector('.dato_q')
let dato_e = document.querySelector('.dato_e')
let mensajeInput = document.querySelector('#mensaje')
let contendorMensajeCifrado = document.querySelector('.contendorMensajeCifrado')



btnCifrar.addEventListener('click',() => {
    // Recibir los datos 
    // Clave publicas
    let palabra = mensajeInput.value.toUpperCase()
    let p = Number(dato_p.value)
    let q = Number(dato_q.value)
    const E = Number(dato_e.value)
    let phi = (p-1)*(q-1)

    // Clave privada
    // Se calcula la ecuacion diofanti para obtener el numeor de D
    let d = diofantica(E,phi)[0]
    let n = p*q

    // Separar el mensaje cada 2 letras
    let letrasPares = [];
    let letters = 2;
    let i = 0;

    while(i < palabra.length){
        let initIndex = i
        let endIndex = i + letters
        letrasPares.push(palabra.substring(initIndex, endIndex));
        i = endIndex;
    }
    //*******************************

    // Convertir las letras en numeros
    let lsMsCifrado = []
    for (let i = 0; i < letrasPares.length; i++) {
        if (letrasPares[i].length % 2 == 0){
            let lsNumeros = []

            for (let j = 0; j < letrasPares[i].length; j++) {
                let {numero} = crearDiccionario.find((elem) =>  elem.letra == letrasPares[i][j])
                lsNumeros.push(numero)
            }       

            for (let i = 0; i < lsNumeros.length; i++) {
                let num1 = lsNumeros[i]
                let num2 = lsNumeros[++i]
                if (num2 < 10) {
                    lsMsCifrado.push(Number(`${num1}0${num2}`))
                }
                else{
                    lsMsCifrado.push(Number(`${num1}${num2}`))
                }
            }

        }else{
            let {numero} = crearDiccionario.find((elem) =>  elem.letra == letrasPares[i])
            lsMsCifrado.push(numero)
        }
    }

    // Cifrar el mensaje
    let msgCifrado = []
    for (let i = 0; i < lsMsCifrado.length; i++) {
        msgCifrado.push(algoritmoEnteros(lsMsCifrado[i],E,n))
    }
    // Insertar mensaje cifrado
    contendorMensajeCifrado.innerText =  `Copiar los que pone en le mesaje e introducirlo donde pone Mensaje Cifrado(Incluir las comas)\n Mensaje cifrado(copiar solo los numeros y la coma): ${msgCifrado}\n Numero D: ${d}\nNumero N: ${n} `

})

// Obtener datos de los input
let $mensajeCifrado = document.querySelector('.mensajeCifrado') 
let $contendorMensajeFinal = document.querySelector('.contendorMensajeFinal') 
let dato_d = document.querySelector('.dato_d')
let dato_n = document.querySelector('.dato_n')
let btnDescifrar = document.querySelector('.btnDescifrar')

btnDescifrar.addEventListener('click',() => {
    // Recibe le texto del input y lo separa en array gracias a la coma
    let msgCifradoDescifrar = $mensajeCifrado.value.split(',')
    // Desencripta el mensaje y lo almacena en un array
    let msgDescripted = []
    for (let i = 0; i < msgCifradoDescifrar.length; i++) {
        let letraDescifrada = algoritmoEnteros(msgCifradoDescifrar[i],Number(dato_d.value), Number(dato_n.value))
        msgDescripted.push(letraDescifrada)  
    }
    // Convierte cada elemetno del array que viene en bloques de 4 numeros a string. Para separarlos mas facilmente y convertirlos en bloques de 2 numeros
    let numerosDescripted = []
    for (let i = 0; i < msgDescripted.length; i++) {
        if (msgDescripted[i].toString().length == 3) {
            let num1L = msgDescripted[i].toString().substring(0,1)
            let num2L = msgDescripted[i].toString().substring(1,3)
            numerosDescripted.push(Number(num1L))
            numerosDescripted.push(Number(num2L))
        }
        else if (msgDescripted[i].toString().length == 4) {
            let num1L = msgDescripted[i].toString().substring(0,2)
            let num2L = msgDescripted[i].toString().substring(2,4)
            numerosDescripted.push(Number(num1L))
            numerosDescripted.push(Number(num2L))
        }else{
            numerosDescripted.push(msgDescripted[i])
        }
    }
    // Teniendo ya el mensaje en bloques de 2 numeros ya procede a pasar de numeros a letra
    let mensajeFinal = ''
    for (let i = 0; i < numerosDescripted.length; i++) {
        let {letra} = crearDiccionario.find((elem) =>  elem.numero == numerosDescripted[i])
        mensajeFinal += letra
    }
    // Inseter contenido en la interfaz grafica
    $contendorMensajeFinal.innerText = mensajeFinal
    console.log('Resutaldo Final: ',mensajeFinal);
})

