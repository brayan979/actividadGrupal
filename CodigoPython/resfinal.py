print("\n")
print("Debes introducir los números de la misma ecuación en el orden, es decir, al primer valor del módulo le corresponde el primero del resto.")
print("\n")
#Aquí nombramos las variables que vamos a necesitar
z = True
v = True
mod = []
resto = []
#Pedimos los números para usar el teorema
while z == True:
    l = int(input("Añade los números que haya en el módulo.(Cuando quiere parar pon un 0):\n"))
    if l != 0:
        mod.append(l) 
    else:
        z = False
while v == True:
    r = int(input("Añade los números que haya de resto.(Cuando quiere parar pon un 0):\n"))
    if r != 0:
        resto.append(r) 
    else:
        v = False
k = len(mod)

#Teorema restos chinos

#Creamos una función
def findMinX(mod, resto, k):
    x = 1
    #Bucle infinito
    while(True):
        j = 0
        while(j < k):
            #Vamos probando hasta que tenemos que una x entre el mod da el resto
            if (x % mod[j] != resto[j]):
                break
            #Una vez que la x ha cumplido con un mod, probamos con el siguiente mod.
            j += 1
        if (j == k):
            #Cuando la x cumple que dividiendo a todos los nº de mod da el resto correspondiente, el programa devuelve la x
            return x
        #Si la x no ha cumplido las condiciones se pasa al siguiente posible número
        x += 1
 


print("La solución es:", findMinX(mod, resto, k))