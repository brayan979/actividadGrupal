export const diofantica = (a,b) => {
    let r =  a%b
    let cociente = (a-r)/b
    if (r === 0) return [0, b]
    else {
         let [x,y] = diofantica(b,r)
         return [y, x - cociente * y]
    } 
}


export const euclides = (num1,num2) => {
    // mcm 200, mcd 2
    let resto = 1
    let cociente = 0
    let salida = false

    let max = maximo(num1,num2)
    let min = minimo(num1,num2)

    let mcd = 0n
    // Realiza el algoritmo de euclides
    while (!salida) {
        resto = max % min
        cociente = (max-resto)/ min
        if (resto == 0) {
            mcd = min
            salida = true
        }else{
            max = min
            min = resto
        }
    }
    return mcd
}


const maximo = (n1,n2) => {
    if (n1 > n2) return n1
    return n2
}
const minimo = (n1,n2) => {
    if (n1 < n2) return n1
    return n2
}
/* diofantica(1819,29) */