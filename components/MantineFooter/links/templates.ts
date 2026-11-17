import { site } from '@/config/site';
import { templateList } from '@/config/templates';

/** A footer link. */
export interface FooterLink {
  key: string;
  title: string;
  href: string;
  newWindow?: boolean;
  /** A badge beside the link */
  new?: boolean;
  /** This very site, among its siblings */
  current?: boolean;
}

/** The three sibling templates at their live demos, this one marked: every footer lists them. */
export const templateLinks: FooterLink[] = templateList.map((template) => ({
  key: template.key,
  title: `Mantine + ${template.engine}`,
  href: template.demo,
  current: template.key === site.key,
}));
