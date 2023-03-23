const correctResponse = (s: number, m: unknown) => ({ status: s, message: m });
const errorResponse = (s: number, m: unknown) => ({ status: s, message: { message: m } });

export { correctResponse, errorResponse };