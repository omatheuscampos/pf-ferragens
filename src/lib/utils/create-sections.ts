import { getPluralOfCompoundName, getPluralOfName } from "./get-plural-of-name";
import { removeAccentsAndSpecialChars } from "./remove-accents-and-special-chars";

export function createSections(
  productsByName: ProductsByName
): ProductSection[] {
  const sections: Array<ProductSection | MixedSection> = [];
  for (const [name, products] of Object.entries(productsByName)) {
    if (products.length >= 5) {
      const title = getPluralOfCompoundName(name);
      const id = removeAccentsAndSpecialChars(title);
      sections.push({
        id,
        title,
        products,
      });
      continue;
    }
    const mixedSection = sections.find((section) => {
      return section instanceof MixedSection && section.amount < 10;
    }) as MixedSection | undefined;
    if (mixedSection) {
      mixedSection.addProducts(products);
      continue;
    }
    const newMixedSection = new MixedSection();
    newMixedSection.addProducts(products);
    sections.push(newMixedSection);
  }
  return sections.sort((a, b) => {
    return a.title > b.title ? 1 : -1;
  });
}

class MixedSection {
  private _products: Product[] = [];
  addProducts(products: Product[]) {
    this._products.push(...products);
  }

  get products() {
    return this._products;
  }

  get amount() {
    return this._products.length;
  }

  get title() {
    return MixedSection.createSectionTitle(this._products);
  }

  get id() {
    return removeAccentsAndSpecialChars(this.title);
  }

  static createSectionTitle(products: Product[]): string {
    if (products.length === 0) return "";
    const names = products.map((product) => product.name.split(" ")[0]);
    const uniqueNames = [...new Set(names)].sort();
    if (uniqueNames.length === 1) {
      // Todos os produtos têm o mesmo nome
      return getPluralOfName(uniqueNames[0]);
    }
    // Produtos têm nomes diferentes
    const pluralNames = uniqueNames.map((name) => getPluralOfName(name));
    const last = pluralNames.pop();
    return pluralNames.length > 0
      ? `${pluralNames.join(", ")} e ${last}`
      : last || "";
  }

  toJSON() {
    return {
      title: this.title,
      products: this.products,
      id: this.id,
    };
  }
}
