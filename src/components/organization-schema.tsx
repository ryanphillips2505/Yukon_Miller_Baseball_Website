import { nonprofit } from "@/lib/nonprofit";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: nonprofit.legalName,
    legalName: nonprofit.legalName,
    alternateName: [...nonprofit.alternateNames],
    url: nonprofit.websiteUrl,
    email: nonprofit.email,
    taxID: nonprofit.ein,
    description: nonprofit.officialSite,
    address: {
      "@type": "PostalAddress",
      name: "Mailing address",
      postOfficeBoxNumber: "850433",
      addressLocality: "Yukon",
      addressRegion: "OK",
      postalCode: "73085",
      addressCountry: "US",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
