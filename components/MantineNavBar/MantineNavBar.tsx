'use client';

import { Navbar } from 'nextra-theme-docs';
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { IconCoffee, IconHeartFilled } from '@tabler/icons-react';
import { ColorSchemeControl } from '../ColorSchemeControl/ColorSchemeControl';
import { Logo } from '../Logo/Logo';
import { MantineNextraThemeObserver } from '../MantineNextraThemeObserver/MantineNextraThemeObserver';

/**
 * You can customize the Nextra NavBar component.
 * Don't forget to use the MantineProvider and MantineNextraThemeObserver components.
 *
 * @since 1.0.0
 *
 */
export const MantineNavBar = () => {
  return (
    <>
      <MantineNextraThemeObserver />
      <Navbar
        logo={
          <Group align="center" gap={4}>
            <Logo />
            <Text size="lg" fw={300} c="blue" visibleFrom="xl">
              Mantine NextJS + Nextra
            </Text>
          </Group>
        }
        // Mantine discord server
        chatLink="https://discord.com/invite/wbH82zuWMN"
        projectLink="https://github.com/gfazioli/next-app-nextra-template"
      >
        <Group gap="sm" wrap="nowrap">
          <ColorSchemeControl />
          <Tooltip label="Sponsor" withArrow>
            <ActionIcon
              component="a"
              href="/#sponsors"
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{ from: 'pink', to: 'grape' }}
              aria-label="Sponsor"
            >
              <IconHeartFilled size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Buy me a coffee" withArrow>
            <ActionIcon
              component="a"
              href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              radius="xl"
              variant="filled"
              color="yellow"
              aria-label="Buy me a coffee"
              styles={{ root: { color: 'var(--mantine-color-white)' } }}
            >
              <IconCoffee size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Navbar>
    </>
  );
};
