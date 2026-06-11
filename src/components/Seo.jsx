import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SITE_NAME = 'Ashes of the Souls';
const DEFAULT_IMAGE = '/imagenes/productos/Decay-Skull-A.O.T.S/IMG_20230912_150851_012.jpg';

const normalizeBaseUrl = (url) => (url || window.location.origin).replace(/\/$/, '');

const setManagedTag = (selector, tagName, attrs) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement(tagName);
    tag.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(tag);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === 'textContent') {
      tag.textContent = value;
      return;
    }
    tag.setAttribute(key, value);
  });
};

const removeManagedTags = (selector) => {
  document.head.querySelectorAll(selector).forEach((tag) => tag.remove());
};

const buildUrl = (baseUrl, pathname, lang) => {
  const url = new URL(pathname, baseUrl);
  url.searchParams.set('lang', lang);
  return url.toString();
};

const Seo = ({
  title,
  description,
  keywords = [],
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  noindex = false,
}) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const siteUrl = normalizeBaseUrl(import.meta.env.VITE_SITE_URL);

  const seo = useMemo(() => {
    const localizedTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const imageUrl = new URL(image, siteUrl).toString();
    const canonicalUrl = buildUrl(siteUrl, location.pathname, lang);
    const alternateEn = buildUrl(siteUrl, location.pathname, 'en');
    const alternateEs = buildUrl(siteUrl, location.pathname, 'es');

    return {
      localizedTitle,
      imageUrl,
      canonicalUrl,
      alternateEn,
      alternateEs,
      keywordText: keywords.filter(Boolean).join(', '),
    };
  }, [image, keywords, lang, location.pathname, siteUrl, title]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = seo.localizedTitle;

    setManagedTag('meta[name="description"]', 'meta', { name: 'description', content: description });
    setManagedTag('meta[name="keywords"]', 'meta', { name: 'keywords', content: seo.keywordText });
    setManagedTag('meta[name="robots"]', 'meta', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    });
    setManagedTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: seo.canonicalUrl });

    removeManagedTags('link[data-seo-managed="true"][rel="alternate"]');
    setManagedTag('link[hreflang="en"]', 'link', { rel: 'alternate', hrefLang: 'en', href: seo.alternateEn });
    setManagedTag('link[hreflang="es"]', 'link', { rel: 'alternate', hrefLang: 'es', href: seo.alternateEs });
    setManagedTag('link[hreflang="x-default"]', 'link', { rel: 'alternate', hrefLang: 'x-default', href: seo.alternateEn });

    setManagedTag('meta[property="og:site_name"]', 'meta', { property: 'og:site_name', content: SITE_NAME });
    setManagedTag('meta[property="og:title"]', 'meta', { property: 'og:title', content: seo.localizedTitle });
    setManagedTag('meta[property="og:description"]', 'meta', { property: 'og:description', content: description });
    setManagedTag('meta[property="og:type"]', 'meta', { property: 'og:type', content: type });
    setManagedTag('meta[property="og:url"]', 'meta', { property: 'og:url', content: seo.canonicalUrl });
    setManagedTag('meta[property="og:image"]', 'meta', { property: 'og:image', content: seo.imageUrl });
    setManagedTag('meta[property="og:locale"]', 'meta', { property: 'og:locale', content: lang === 'es' ? 'es_ES' : 'en_US' });
    setManagedTag('meta[property="og:locale:alternate"]', 'meta', {
      property: 'og:locale:alternate',
      content: lang === 'es' ? 'en_US' : 'es_ES',
    });

    setManagedTag('meta[name="twitter:card"]', 'meta', { name: 'twitter:card', content: 'summary_large_image' });
    setManagedTag('meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: seo.localizedTitle });
    setManagedTag('meta[name="twitter:description"]', 'meta', { name: 'twitter:description', content: description });
    setManagedTag('meta[name="twitter:image"]', 'meta', { name: 'twitter:image', content: seo.imageUrl });

    removeManagedTags('script[data-seo-managed="true"][type="application/ld+json"]');
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-managed', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [description, jsonLd, lang, noindex, seo, type]);

  return null;
};

export default Seo;
