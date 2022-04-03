export const diccionarioLetraNumero = () => {
    let abecedario =[' ',',','.','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    let diccionario = []
    let contado = 1
    for (let i = 0; i < abecedario.length; i++) {
        let objeto = {
            letra: abecedario[i],
            numero: contado
        }
        contado++
        diccionario.push(objeto)   
    }
    return diccionario
}


// Algoritmo de exponenciacion modular rapida
export const  algoritmoEnteros = ( a,  e,  n) =>{
    let accum = 1;
    let x = e;
    let apow = a;
    while (x != 0){
       if ((x & 0x01) == 0x01){
          accum = (accum * apow) % n;
       };
       x >>= 1;
       apow = (apow * apow) % n;
    };
    return accum;
}







