alert("Script successfully loaded!")

let bool = true
let str = 'Hello world!'
let int = 13
let arr = [1, 2]


//A2
console.log(typeof bool + ' has value ' + bool)
console.log(typeof str + ' has value ' + str)
console.log(typeof int + ' has value ' + int)
console.log(typeof arr + ' has value ' + arr)

//Q1
var paraq1 = document.createElement("p");

var nodeq1 = document.createTextNode('Q1: Two equal signs will return true, \
if the two compared things have the same value but are not of the same \
type, e.g. when comparing string "2016" and integer "2016". If the triple \
equal sign would be used, false would be returned, as the triple equal \
sign check for the same type as well. Other ways to compare the elements \
is through not equal or less/greater operators.\
');

paraq1.appendChild(nodeq1);
document.body.append(paraq1);

//A3


result = []

arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
arr2 = [1, 0, 3, 5, 564, 7, 86, 86, 5, 34]

for (let i = 0; i < 5; i++) {
    result[i] = arr1[i * 2] + arr2[i * 2]
}

console.log(result)

//Q2

var paraq2 = document.createElement("p");

var nodeq2 = document.createTextNode('Q2: In this case, it\'s two separate \
functions. First one returns the type of whatever is passed into it. \
The second function simply returns number 1, whenever it\'s called');

paraq2.appendChild(nodeq2);
document.body.append(paraq2);

//A4
function print_range(range_start, range_end) {
    for (let n=range_start; n < range_end + 1; n++){
        if (n % 3 === 0 & n % 5 === 0) {
            console.log('InfoViz')
        } else if (n % 3 === 0) {
            console.log('Info')
        } else if (n % 5 === 0) {
            console.log('Viz')
        } else {
            console.log(n)
        }
    }
}


print_range(1, 16)

//A5

window.focus();
   d3.select(window).on("keydown", function(e) {
         alert(d3.event.key);
   });