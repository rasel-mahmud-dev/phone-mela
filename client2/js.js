
/**
 * @param {string} s
 * @return {number}
 */

let romanNumbers = {
	I:1,
	V:5,
	X:10,
	L:50,
	C:100,
	D:500,
	M:1000,
}




/*
	Input: s = "MCMXCIV"
	Output: 1994
	Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
*/

var romanToInt = function(s) {
	let sum = 0
	for (let i = 0; i < s.length; i++) {
		let n = romanNumbers[s[i]]
		if(((sum + 1) * 4) > n){
			sum = sum -1
		} else {
			sum += n
		}
	}
	return sum
};

console.log(romanToInt("I"))