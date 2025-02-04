export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

export const isPerfect = (num: number): boolean => {
  if (num <= 1) return false;

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

export const isArmstrong = (num: number): boolean => {
  if (num < 0) return false;

  const digits = Math.abs(num).toString().split("");
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(parseInt(digit), power),
    0
  );
  return sum === num;
};

export const digitSum = (num: number): number => {
  const isNegative = num < 0;
  const sum = Math.abs(num)
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);
  return isNegative ? -sum : sum;
};

export const getProperties = (num: number): string[] => {
  const properties: string[] = [];

  if (isArmstrong(num)) properties.push("armstrong");
  if (num % 2 === 0) properties.push("even");
  else properties.push("odd");

  if (num > 0) properties.push("positive");
  else if (num < 0) properties.push("negative");
  else properties.push("zero");

  return properties;
};

export const isValidInteger = (input: string): boolean => {
  const validIntegerPattern = /^-?\d+$/;
  if (!validIntegerPattern.test(input)) {
    return false;
  }

  const num = Number(input);
  return Number.isSafeInteger(num);
};
