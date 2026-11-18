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

  it('is drawn on paper, and its drawings are hidden from assistive tech', () => {
    const { container } = render(<HomePage />);
    // What theme/site.css reads to turn the document to blueprint paper
    expect(container.querySelector('[data-site-paper]')).not.toBeNull();
    // One line drawing per feature card, two arcs beside the templates' heading
    const sketches = container.querySelectorAll(
      'svg[viewBox="0 0 96 72"], svg[viewBox="0 0 120 120"]'
    );
    expect(sketches).toHaveLength(8);
    sketches.forEach((sketch) => expect(sketch).toHaveAttribute('aria-hidden', 'true'));
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

  it('shows the live numbers it is given', () => {
    const stars = { docs: 1, nextra: 38, fumadocs: 5 };
    render(<HomePage stats={{ stars, downloads: 309_494 }} />);
    const section = screen.getByRole('region', { name: /Pick the engine/ });
    // The figure, and the words a screen reader hears after it
    expect(within(section).getByText('1')).toHaveTextContent('1 star on GitHub');
    expect(within(section).getByText('38')).toHaveTextContent('38 stars on GitHub');
    expect(within(section).getByText('5')).toHaveTextContent('5 stars on GitHub');
    // The hero's star link carries this template's own count
    const star = screen.getByRole('link', { name: /^Star the .+ template on GitHub/ });
    expect(star).toHaveAttribute('href', `https://github.com/${site.repo}`);
    // The same file runs in the three templates: the figure is this template's own
    const own = stars[site.key];
    expect(star).toHaveTextContent(new RegExp(`GitHub\\s*${own} ${own === 1 ? 'star' : 'stars'}$`));
    const extensions = screen.getByRole('region', { name: /extensions/ });
    expect(within(extensions).getByText('309k')).toBeInTheDocument();
    expect(extensions).toHaveTextContent('309k downloads last month');
  });

  it('shows no number it was not given: no zero, no placeholder', () => {
    // No stats at all, as in a test or a story: nothing is fetched here
    const { unmount } = render(<HomePage />);
    expect(screen.queryByText(/stars? on GitHub$/)).toBeNull();
    expect(screen.queryByText(/downloads last month/)).toBeNull();
    // The hero's star link is still there, without a figure
    const star = screen.getByRole('link', { name: /^Star the .+ template on GitHub/ });
    expect(star).toHaveAttribute('href', `https://github.com/${site.repo}`);
    expect(star).not.toHaveTextContent(/\d/);
    unmount();

    // One template's stars missing (a failed request): the other two are still there
    render(<HomePage stats={{ stars: { nextra: 38, fumadocs: 5 } }} />);
    const section = screen.getByRole('region', { name: /Pick the engine/ });
    expect(within(section).getAllByText(/stars? on GitHub$/)).toHaveLength(2);
    expect(within(section).queryByText('0')).toBeNull();
    expect(screen.queryByText(/downloads last month/)).toBeNull();
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
