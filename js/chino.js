export const tChino = (mod, resto,k ) => {
    let x = 1 
    while(true){
        let j = 0
        while(j<k){
            if(x % mod[j] !== resto[j]) {
                break
            }
            j+=1
        }
        if (j == k) {
            return x
        } 
        x+=1
    }
}
