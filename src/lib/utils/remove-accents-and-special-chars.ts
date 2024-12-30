export function removeAccentsAndSpecialChars(input: string): string {
  return input
    .trim() // Remover espaços no início e no fim da string
    .replace(/\s+/g, "_") // Substituir espaços por underscore
    .normalize("NFD") // Decompor caracteres com acento
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .toLowerCase(); // Remover caracteres especiais mantendo letras, números e underscore
}
