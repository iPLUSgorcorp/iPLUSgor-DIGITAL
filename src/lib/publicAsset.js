export function publicAsset(path) {
  const value = String(path);
  if (/^(?:[a-z]+:)?\/\//i.test(value) || /^(?:data|blob):/i.test(value)) return value;
  const relativePath = value.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${relativePath}`;
}
