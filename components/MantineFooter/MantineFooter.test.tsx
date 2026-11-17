import { render, screen, within } from '@/test-utils';
import { site } from '@/config/site';
import { HUB_URL, templateList } from '@/config/templates';
import { MantineFooter } from './MantineFooter';

describe('MantineFooter', () => {
  it('is the page footer', () => {
    render(<MantineFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('links the three sibling templates at their live demos and marks this one', () => {
    render(<MantineFooter />);
    const column = screen.getByRole('navigation', { name: 'Templates' });
    for (const template of templateList) {
      expect(
        within(column).getByRole('link', { name: `Mantine + ${template.engine}` })
      ).toHaveAttribute('href', template.demo);
    }
    expect(within(column).getAllByText('This site')).toHaveLength(1);
    expect(within(column).getByRole('link', { current: 'page' })).toHaveTextContent(
      `Mantine + ${site.engine}`
    );
  });

  it('links the Mantine Extensions Hub', () => {
    render(<MantineFooter />);
    expect(screen.getByRole('link', { name: 'Mantine Extensions Hub' })).toHaveAttribute(
      'href',
      HUB_URL
    );
  });
});
