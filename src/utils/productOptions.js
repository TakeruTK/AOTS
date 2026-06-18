export const MATERIAL_OPTIONS = [
  { value: 'product.material.silver', labelKey: 'product.material.silver' },
  { value: 'product.material.bronze', labelKey: 'product.material.bronze' },
];

const materialValues = new Set(MATERIAL_OPTIONS.map((option) => option.value));

export const normalizeMaterialValues = (materials) => (
  Array.isArray(materials)
    ? [...new Set(materials.map((material) => String(material || '').trim()))]
      .filter((material) => materialValues.has(material))
    : []
);

export const getAvailableMaterials = (product) => {
  const materials = normalizeMaterialValues(product?.materials);

  if (!materials.length) {
    return MATERIAL_OPTIONS;
  }

  return MATERIAL_OPTIONS.filter((option) => materials.includes(option.value));
};

export const isMaterialAllowed = (product, materialValue) => (
  getAvailableMaterials(product).some((option) => option.value === materialValue)
);
