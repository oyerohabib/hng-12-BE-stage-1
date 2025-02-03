"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperties = exports.digitSum = exports.isArmstrong = exports.isPerfect = exports.isPrime = void 0;
const isPrime = (num) => {
    if (num <= 1)
        return false;
    if (num <= 3)
        return true;
    if (num % 2 === 0 || num % 3 === 0)
        return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0)
            return false;
    }
    return true;
};
exports.isPrime = isPrime;
const isPerfect = (num) => {
    if (num <= 1)
        return false;
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i * i !== num) {
                sum += num / i;
            }
        }
    }
    return sum === num;
};
exports.isPerfect = isPerfect;
const isArmstrong = (num) => {
    const digits = num.toString().split("");
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
    return sum === num;
};
exports.isArmstrong = isArmstrong;
const digitSum = (num) => {
    return Math.abs(num)
        .toString()
        .split("")
        .reduce((acc, digit) => acc + parseInt(digit), 0);
};
exports.digitSum = digitSum;
const getProperties = (num) => {
    const properties = [];
    if ((0, exports.isArmstrong)(num))
        properties.push("armstrong");
    if (num % 2 === 0)
        properties.push("even");
    else
        properties.push("odd");
    return properties;
};
exports.getProperties = getProperties;
