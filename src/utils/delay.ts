export const delay = async (timeout: number) =>
  await new Promise((r) => setTimeout(r, timeout));
