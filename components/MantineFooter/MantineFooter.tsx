'use client';

import {
  ActionIcon,
  Anchor,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconBrandGithubFilled,
  IconBrandMantine,
  IconBrandX,
  IconMailHeart,
} from '@tabler/icons-react';
import { Logo } from '@/components/Logo/Logo';
import packageJson from '../../package.json';
import { AnimateBadge } from './AnimateBadge';
import { apps, highlights, mantineComponentCategories, resources } from './links';
import classes from './MantineFooter.module.css';

type VerticalLink = {
  key: string;
  title: string;
  href: string;
  newWindow?: boolean;
  new?: boolean;
};

const VerticalLinks = ({ list, fz }: { list: VerticalLink[]; fz?: number }) => {
  return (
    <>
      {list.map((item) => (
        <Group key={item.key} gap={6} wrap="nowrap">
          <Anchor
            className={classes.columnAnchor}
            href={item.href}
            target={item.newWindow ? '_blank' : undefined}
            rel={item.newWindow ? 'noopener noreferrer' : undefined}
            fz={fz}
          >
            {item.title}
          </Anchor>
          {item.new && <AnimateBadge />}
        </Group>
      ))}
    </>
  );
};

const ColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <Title className={classes.title} order={6}>
    {children}
  </Title>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <Text className={classes.subTitle} fz={11} fw={600} c="dimmed" tt="uppercase" lts={0.5}>
    {children}
  </Text>
);

export const MantineFooter = () => {
  return (
    <div className={classes.contentFooter}>
      <Container className={classes.footer} size="lg">
        {/* Top tier — About + 3 link columns */}
        <Grid grow>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Stack gap="xs">
              <ThemeIcon>
                <Logo />
              </ThemeIcon>
              <Text fz={13} mr={64}>
                This is a template for Next.js + Mantine + Nextra documentation sites. Feel free to
                use it and{' '}
                <Anchor fz={13} href="https://github.com/gfazioli/next-app-nextra-template">
                  contribute to it
                </Anchor>
                . Don't forget to star it on{' '}
                <Anchor fz={13} href="https://github.com/gfazioli/next-app-nextra-template">
                  GitHub
                </Anchor>
                . And if you wish, you can also follow me on{' '}
                <Anchor fz={13} href="https://twitter.com/gfazioli">
                  Twitter
                </Anchor>
                . Obviously, you can also{' '}
                <Anchor fz={13} href="https://github.com/sponsors/gfazioli">
                  donate
                </Anchor>{' '}
                to support the development of this project.
              </Text>
              <Group>
                <ActionIcon variant="subtle" component="a" href="https://github.com/gfazioli">
                  <IconBrandGithubFilled size={24} />
                </ActionIcon>
                <ActionIcon variant="subtle" component="a" href="https://twitter.com/gfazioli">
                  <IconBrandX size={24} />
                </ActionIcon>
                <ActionIcon variant="subtle" component="a" href="https://undolog.com/">
                  <IconMailHeart size={24} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col className={classes.column} span={{ base: 6, sm: 2 }}>
            <Stack gap="xs">
              <ColumnTitle>HIGHLIGHTS</ColumnTitle>
              <VerticalLinks list={highlights} />
            </Stack>
          </Grid.Col>

          <Grid.Col className={classes.column} span={{ base: 6, sm: 2 }}>
            <Stack gap="xs">
              <ColumnTitle>MANTINE</ColumnTitle>
              <VerticalLinks list={resources} />
            </Stack>
          </Grid.Col>

          <Grid.Col className={classes.column} span={{ base: 6, sm: 2 }}>
            <Stack gap="xs">
              <ColumnTitle>APPS</ColumnTitle>
              <VerticalLinks list={apps} />
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" className={classes.lastDivider} />

        {/* Second tier — Mantine Components grouped by category */}
        <Stack gap="md">
          <ColumnTitle>OTHER MANTINE EXTENSIONS</ColumnTitle>
          <Grid grow>
            {mantineComponentCategories.map((cat) => (
              <Grid.Col key={cat.key} className={classes.column} span={{ base: 6, sm: 3 }}>
                <Stack gap="xs">
                  <SubTitle>{cat.title}</SubTitle>
                  <VerticalLinks list={[...cat.links]} />
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>

        <Divider my={16} className={classes.lastDivider} />

        <Group justify="flex-end">
          <Group justify="right">
            <Text fz={12} inline>
              Made with ❤️ by{' '}
              <Anchor fz={13} href="https://gfazioli.github.io/">
                Undolog
              </Anchor>
            </Text>
            <Divider orientation="vertical" />
            <Text fz={12} inline>
              <Group gap={4} component="span">
                Hosted on{' '}
                <Anchor fz={13} href="https://github.com/">
                  <Group gap={4} component="span">
                    <IconBrandGithubFilled size={16} /> GitHub.com
                  </Group>
                </Anchor>
              </Group>
            </Text>
            <Divider orientation="vertical" />
            <Text fz={12} inline>
              <Group gap={4} component="span" justify="flex-start">
                Built with{' '}
                <Anchor fz={13} href="https://mantine.dev/">
                  <Group gap={4} component="span">
                    <IconBrandMantine size={16} /> Mantine v
                    {packageJson.dependencies['@mantine/core']}
                  </Group>
                </Anchor>
              </Group>
            </Text>
          </Group>
        </Group>
      </Container>
    </div>
  );
};
