import { instagramImages, projects } from "../../data/projects";
import { services } from "../../data/services";
import { site } from "../../data/site";

const origin = site.url;

function absolute(path: string) {
  return new URL(path, origin).href;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderJsonLd() {
  const person = `${origin}/#kelvin`;
  const organization = `${origin}/#kcsa`;
  const website = `${origin}/#website`;

  const document = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": website,
        url: `${origin}/`,
        name: "KCSA Studio",
        alternateName: site.brand,
        inLanguage: "pt-BR",
        publisher: { "@id": organization },
      },
      {
        "@type": "WebPage",
        "@id": `${origin}/#webpage`,
        url: `${origin}/`,
        name: "Kelvin Carlos | Fotógrafo e Audiovisual em São Paulo | KCSA Studio",
        description:
          "Kelvin Carlos é fotógrafo e profissional de audiovisual em São Paulo, especializado em ensaios, retratos, eventos, casamentos e projetos com direção e identidade.",
        inLanguage: "pt-BR",
        isPartOf: { "@id": website },
        about: { "@id": person },
        primaryImageOfPage: absolute(site.images.hero),
      },
      {
        "@type": "Person",
        "@id": person,
        name: site.name,
        jobTitle: "Fotógrafo e profissional de audiovisual",
        description: site.description,
        url: `${origin}/`,
        image: absolute(site.images.about),
        email: site.contact.email,
        telephone: "+55-11-96904-1720",
        sameAs: [site.contact.instagram],
        homeLocation: {
          "@type": "Place",
          name: "São Paulo",
          address: {
            "@type": "PostalAddress",
            addressLocality: site.location.city,
            addressRegion: site.location.state,
            addressCountry: "BR",
          },
        },
        worksFor: { "@id": organization },
      },
      {
        "@type": "ProfessionalService",
        "@id": organization,
        name: "KCSA Studio",
        alternateName: site.brand,
        url: `${origin}/`,
        image: absolute("/images/retrato-mulher.jpg"),
        logo: absolute(site.logo),
        email: site.contact.email,
        telephone: "+55-11-96904-1720",
        founder: { "@id": person },
        sameAs: [site.contact.instagram],
        areaServed: [
          {
            "@type": "City",
            name: "São Paulo",
            containedInPlace: { "@type": "AdministrativeArea", name: "São Paulo" },
          },
          { "@type": "Country", name: "Brasil" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de fotografia e audiovisual",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: `${origin}/#${service.id}`,
              provider: { "@id": organization },
              areaServed: "São Paulo",
            },
          })),
        },
      },
    ],
  };

  return JSON.stringify(document);
}

type SitemapImage = {
  loc: string;
  title: string;
  caption: string;
};

export function renderSitemap(lastmod = new Date().toISOString().slice(0, 10)) {
  const images = new Map<string, SitemapImage>();

  const add = (path: string, title: string, caption: string) => {
    if (!path || images.has(path)) return;
    images.set(path, { loc: absolute(path), title, caption });
  };

  for (const project of projects) {
    add(project.image, project.title, project.alt);
  }
  for (const image of instagramImages) {
    add(image.image, image.title, image.alt);
  }
  add(site.images.about, "Kelvin Carlos", site.images.aboutAlt);
  add(site.images.closing, "Kelvin Carlos", site.images.closingAlt);
  add(site.images.hero, site.images.heroAlt, site.images.heroAlt);
  add(site.images.differentiator, site.images.differentiatorAlt, site.images.differentiatorAlt);
  add(site.images.before, "Antes", site.images.beforeAlt);
  add(site.images.after, "Depois", site.images.afterAlt);

  const imageXml = [...images.values()]
    .map(
      (image) => `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${lastmod}</lastmod>
${imageXml}
  </url>
</urlset>
`;
}
