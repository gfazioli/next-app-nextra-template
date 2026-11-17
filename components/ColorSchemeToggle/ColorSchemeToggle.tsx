'use client';

import { useTheme } from 'next-themes';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { Button, useMantineColorScheme } from '@mantine/core';

/**
 * Light, dark or the system's: the three ways the colour scheme can be set. Each button sets
 * both systems, Mantine's and Nextra's (next-themes), which calls the third one "system".
 */
export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const { setTheme } = useTheme();

  return (
    <Button.Group mt="md">
      <Button
        variant="default"
        size="xs"
        leftSection={<IconSun size={14} aria-hidden="true" />}
        onClick={() => {
          setColorScheme('light');
          setTheme('light');
        }}
      >
        Light
      </Button>
      <Button
        variant="default"
        size="xs"
        leftSection={<IconMoon size={14} aria-hidden="true" />}
        onClick={() => {
          setColorScheme('dark');
          setTheme('dark');
        }}
      >
        Dark
      </Button>
      <Button
        variant="default"
        size="xs"
        leftSection={<IconDeviceDesktop size={14} aria-hidden="true" />}
        onClick={() => {
          setColorScheme('auto');
          setTheme('system');
        }}
      >
        Auto
      </Button>
    </Button.Group>
  );
}
