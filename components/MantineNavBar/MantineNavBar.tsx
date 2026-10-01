'use client';

import { Navbar } from 'nextra-theme-docs';
import { DiscordIcon } from 'nextra/icons';
import { Group, Text } from '@mantine/core';
import { IconCoffee, IconHeartFilled } from '@tabler/icons-react';
import { ColorSchemeControl } from '../ColorSchemeControl/ColorSchemeControl';
import { HeaderControl } from '../ColorSchemeControl/HeaderControl';
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
            <Text size="xl" fw={600} ff="heading" visibleFrom="xl">
              Mantine{' '}
              <Text span inherit c="blue">
                NextJS + Nextra
              </Text>
            </Text>
          </Group>
        }
        // Mantine discord server
        chatLink="https://discord.com/invite/wbH82zuWMN"
        chatIcon={<DiscordIcon width="24" aria-label="Mantine Discord server" />}
        projectLink="https://github.com/gfazioli/next-app-nextra-template"
      >
        <Group gap="sm" wrap="nowrap">
          <ColorSchemeControl />
          {/* Same square controls as the colour-scheme toggle (mantine.dev's header style), with
              the icon carrying the colour: Mantine red and orange. The sponsors wall is on the
              home page, hence `/#sponsors`. */}
          <HeaderControl component="a" href="/#sponsors" tooltip="Sponsor">
            <IconHeartFilled size={18} color="var(--mantine-color-red-6)" />
          </HeaderControl>
          <HeaderControl
            component="a"
            href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
            target="_blank"
            rel="noopener noreferrer"
            tooltip="Buy me a coffee"
          >
            <IconCoffee size={18} stroke={1.8} color="var(--mantine-color-orange-6)" />
          </HeaderControl>
        </Group>
      </Navbar>
    </>
  );
};
