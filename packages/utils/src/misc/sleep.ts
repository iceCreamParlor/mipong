export async function sleep(milliseconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}
