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
  const digits = num.toString().split("");
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(parseInt(digit), power),
    0
  );
  return sum === num;
};

export const digitSum = (num: number): number => {
  return Math.abs(num)
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);
};

export const getProperties = (num: number): string[] => {
  const properties: string[] = [];

  if (isArmstrong(num)) properties.push("armstrong");
  if (num % 2 === 0) properties.push("even");
  else properties.push("odd");

  return properties;
};
