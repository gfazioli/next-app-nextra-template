'use client';

import { Anchor, Avatar, Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconCoffee, IconHeartFilled, IconPlus } from '@tabler/icons-react';
import { sponsors } from '../MantineFooter/links';
import classes from './Sponsors.module.css';

/**
 * Sponsors wall — gradient title, pitch, sponsor avatars and the "Become a sponsor" CTA.
 * Rendered on the home page below the ecosystem boxes; the navbar Sponsor button
 * scrolls/navigates to the `#sponsors` anchor.
 */
export const Sponsors = () => {
  return (
    <Stack gap="md" align="center" id="sponsors" className={classes.sponsorsSection} my={64}>
      <Title order={2} ta="center" tt="uppercase">
        <Text inherit component="span" variant="gradient" gradient={{ from: 'pink', to: 'grape' }}>
          Sponsors
        </Text>
      </Title>
      <Text fz={15} c="dimmed" ta="center" maw={560}>
        If my open-source work saves you or your team time, consider sponsoring its development.
        Sponsors get their name or logo featured here and across all my projects' documentation
        sites.
      </Text>
      <Group justify="center" gap="xl">
        {sponsors.map((sponsor) => (
          <Anchor
            key={sponsor.key}
            href={sponsor.href ?? `https://github.com/${sponsor.github}`}
            target="_blank"
            rel="noopener noreferrer"
            underline="never"
          >
            <Stack gap={4} align="center">
              <Avatar
                src={`https://github.com/${sponsor.github}.png`}
                alt={sponsor.name}
                size="lg"
                radius="xl"
              />
              <Text fz={12} c="dimmed">
                {sponsor.name}
              </Text>
            </Stack>
          </Anchor>
        ))}
        <Anchor
          href="https://github.com/sponsors/gfazioli"
          target="_blank"
          rel="noopener noreferrer"
          underline="never"
        >
          <Stack gap={4} align="center">
            <Avatar size="lg" radius="xl" className={classes.sponsorSlot}>
              <IconPlus size={20} />
            </Avatar>
            <Text fz={12} c="dimmed">
              Your logo here
            </Text>
          </Stack>
        </Anchor>
      </Group>
      <Group gap="sm" justify="center">
        <Button
          component="a"
          href="https://github.com/sponsors/gfazioli"
          target="_blank"
          rel="noopener noreferrer"
          variant="gradient"
          gradient={{ from: 'pink', to: 'grape' }}
          leftSection={<IconHeartFilled size={16} />}
          radius="xl"
        >
          Become a sponsor
        </Button>
        <Button
          component="a"
          href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
          target="_blank"
          rel="noopener noreferrer"
          variant="filled"
          color="yellow"
          leftSection={<IconCoffee size={16} />}
          radius="xl"
          styles={{
            label: { color: 'var(--mantine-color-white)' },
            section: { color: 'var(--mantine-color-white)' },
          }}
        >
          Buy me a coffee
        </Button>
      </Group>
    </Stack>
  );
};
