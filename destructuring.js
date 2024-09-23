console.clear();

//const x = [1,2,3,4,5];
//const [y, z] = x

//console.log("imprimo el valor de x " + x);
//console.log("imprimo el valor de y " + y);
//console.log("imprimo el valor de z " + z);


const miArray = [1,2];
const [x, y, z] = miArray
console.log(typeof miArray)
console.log(typeof x)
console.log(typeof y)
console.log(typeof z)

console.log("imprimo el valor de x " + x);
console.log("imprimo el valor de y " + y);
console.log("imprimo el valor de z " + z);

const user = {
    id: 42,
    is_verified: true
}

console.log(typeof user)
console.log(user)

console.log(user.id)
console.log(user.is_verified)
user.is_verified = false
console.log(user.is_verified)

user.name = "Pepito Rodriguez"

console.log(user)

const { id: mi_id, is_verified: mi_is_verified, name: mi_name } = user;
console.log(`destructuring id ${mi_id}`)
console.log(`destructuring is_verified ${mi_is_verified}`)
console.log(`destructuring name ${mi_name}`)
console.log(typeof mi_id)
console.log(typeof mi_is_verified)