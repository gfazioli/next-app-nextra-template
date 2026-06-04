'use client';

import { BorderAnimate, type BorderAnimateProps } from '@gfazioli/mantine-border-animate';
import { IconArrowRight, IconFileText, IconPackages } from '@tabler/icons-react';
import { Group, SimpleGrid, Stack, Text, ThemeIcon, Title, UnstyledButton } from '@mantine/core';
import { Sponsors } from '../Sponsors/Sponsors';
import classes from './Content.module.css';

interface EcosystemBoxProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  beamProps?: Partial<BorderAnimateProps>;
}

const EcosystemBox = ({ href, icon, title, description, beamProps }: EcosystemBoxProps) => (
  <BorderAnimate radius="lg" h="100%" {...beamProps}>
    <UnstyledButton
      component="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      p="xl"
      className={classes.card}
    >
      <Stack gap="sm">
        <Group gap="sm" wrap="nowrap">
          <ThemeIcon
            variant="gradient"
            gradient={{
              from: (beamProps?.colorFrom as string) ?? 'blue',
              to: (beamProps?.colorTo as string) ?? 'cyan',
            }}
            size="lg"
            radius="md"
          >
            {icon}
          </ThemeIcon>
          <Title order={3}>{title}</Title>
        </Group>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
        <Group gap={4} c="blue" fz="sm" fw={500}>
          Explore <IconArrowRight size={16} />
        </Group>
      </Stack>
    </UnstyledButton>
  </BorderAnimate>
);

export const Content = () => {
  return (
    <Stack align="center" my="2vh">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" maw={860} w="100%" mx="auto" my={32}>
        <EcosystemBox
          href="https://mantine-extensions.vercel.app/"
          icon={<IconPackages size={20} />}
          title="Mantine Extensions Hub"
          description="Browse 25+ Mantine UI extensions — split panes, onboarding tours, players, parallax and more — ready to drop into this template."
          beamProps={{
            beamMode: 'path',
            colorFrom: 'cyan',
            colorTo: 'indigo',
            size: 'lg',
            duration: 6,
          }}
        />
        <EcosystemBox
          href="https://gfazioli.github.io/next-app-fumadocs-template/"
          icon={<IconFileText size={20} />}
          title="Fumadocs template"
          description="Prefer Fumadocs? The same starter with fumadocs-core under the hood and a docs UI built 100% with Mantine."
          beamProps={{
            beamMode: 'conic',
            colorFrom: 'pink',
            colorTo: 'grape',
            size: 'md',
            duration: 8,
            reverse: true,
          }}
        />
      </SimpleGrid>

      <Sponsors />
    </Stack>
  );
};
