export type RouteSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  canonical?: string;
};

export type BreadcrumbItem = {
  name: string;
  item: string;
};

export type OpenGraphMeta = {
  title: string;
  description: string;
  url: string;
  type?: string;
  image?: string;
};
