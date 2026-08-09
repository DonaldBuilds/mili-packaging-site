// Data layer — product data lives in products.json so the ops workbench can
// edit products and auto-deploy. This file re-exports the data plus lookup helpers.
import data from './products.json';

export const { boundaryTexts, productGroups, priceDisclaimer, detailData, skuCatalog, productCatalog } = data;

export const getGroup = (slug) => productGroups.find(g => g.slug === slug);

export const getProduct = (groupSlug, productSlug) => {
  const list = productCatalog[groupSlug] || [];
  return list.find(p => p.slug === productSlug);
};

export const getDetail = (slug) => detailData[slug];

export const getSkus = (slug) => skuCatalog[slug] || [];
