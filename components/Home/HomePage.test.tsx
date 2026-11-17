import { render, screen, within } from '@/test-utils';
import { site } from '@/config/site';
import { HUB_URL, templateList } from '@/config/templates';
import pack from '../../package.json';
import { HomePage } from './HomePage';
import { plainVersion } from './Stack';

describe('HomePage', () => {
  it('has one h1, and it names the engine', () => {
    render(<HomePage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(`Mantine Next.js + ${site.engine} template`);
  });

  it('renders no <main> of its own: the page or the shell provides it', () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector('main')).toBeNull();
  });

  it('offers the template at the version of package.json', () => {
    render(<HomePage />);
    const links = screen.getAllByRole('link', { name: `Use template v${pack.version}` });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) =>
      expect(link).toHaveAttribute('href', `https://github.com/${site.repo}`)
    );
  });

  it('shows the versions package.json declares', () => {
    render(<HomePage />);
    const stack = screen.getByRole('region', { name: 'The stack' });
    for (const name of ['next', 'react', '@mantine/core', site.enginePackage] as const) {
      const range = (pack.dependencies as Record<string, string>)[name];
      expect(within(stack).getAllByText(plainVersion(range)).length).toBeGreaterThan(0);
    }
    // Every other dependency is there with its range as declared
    const marquee = pack.dependencies['@gfazioli/mantine-marquee'];
    expect(within(stack).getByText('@gfazioli/mantine-marquee').nextSibling).toHaveTextContent(
      marquee
    );
  });

  it('presents the three templates, marks the current one and links the other two', () => {
    render(<HomePage />);
    const section = screen.getByRole('region', { name: /Pick the engine/ });
    for (const template of templateList) {
      expect(
        within(section).getByRole('heading', { level: 3, name: template.engine })
      ).toBeInTheDocument();
    }
    expect(within(section).getAllByText('You are here')).toHaveLength(1);
    for (const template of templateList.filter((item) => item.key !== site.key)) {
      expect(
        within(section).getByRole('link', { name: `Live demo of the ${template.engine} template` })
      ).toHaveAttribute('href', template.demo);
    }
  });

  it('links the Mantine Extensions Hub', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('link', { name: 'Explore the Mantine Extensions Hub' })
    ).toHaveAttribute('href', HUB_URL);
  });

  it('keeps the sponsors wall at #sponsors', () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector('#sponsors')).toHaveTextContent('Become a sponsor');
  });
});

describe('plainVersion', () => {
  it('drops the range operator and keeps the number', () => {
    expect(plainVersion('^10.6.7')).toBe('10.6.7');
    expect(plainVersion('~4.0.21')).toBe('4.0.21');
    expect(plainVersion('9.8.1')).toBe('9.8.1');
  });
});
