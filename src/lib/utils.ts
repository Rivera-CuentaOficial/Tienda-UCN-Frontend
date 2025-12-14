export const isValidId = (id: string): boolean => {
  return /^[1-9]\d*$/.test(id);
};

export const isRutValid = (rut: string): boolean => {
  const rutRegex = /^\d{7,8}-[0-9kK]$/;
  if (!rutRegex.test(rut)) return false;

  const [body, dv] = rut.split("-");
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i), 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  const dvCalculated =
    expectedDv === 11 ? "0" : expectedDv === 10 ? "K" : expectedDv.toString();

  return dvCalculated.toUpperCase() === dv.toUpperCase();
};

export const hasLegalAge = (birthDate: Date): boolean => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

export function thousandSeparatorPipe(num: number): string {
  const [integer, decimal] = num.toFixed(2).split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return 2 > 0 ? `${formattedInteger},${decimal}` : formattedInteger;
}

export function formatDate(date: string): string {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}

export async function urlToFile(
  url: string,
  fileName: string,
  mimeType: string = "image/jpeg"
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: mimeType });
}

export async function convertUrlsToFiles(urls: string[]): Promise<File[]> {
  const filePromises = urls.map((url, index) => {
    const extension = url.split(".").pop()?.toLowerCase() || "jpg";
    const mimeType = `image/${extension === "jpg" ? "jpeg" : extension}`;
    return urlToFile(url, `existing-image-${index + 1}.${extension}`, mimeType);
  });

  return Promise.all(filePromises);
}

export function parsePrice(price: string): number {
  if (typeof price === "number") return price;

  const cleanPrice = price
    .replace(/\,/g, "")
    .replace(".", ",")
    .replace("$", "");
  const parsed = parseFloat(cleanPrice);
  return isNaN(parsed) ? 0 : parsed;
}
