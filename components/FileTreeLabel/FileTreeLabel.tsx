'use client';

import React from 'react';
import { IconCornerRightDown } from '@tabler/icons-react';
import { Anchor, Code, Group } from '@mantine/core';

import '@mantine/core/styles.css';

type FileTreeLabelProps = {
  name: string;
  type: 'folder' | 'file';
  children: React.ReactNode;
  color: string;
  href: string;
  target: string;
};

export function FileTreeLabel({
  name,
  type = 'folder',
  children,
  color = 'green',
  href,
  target = '_self',
}: FileTreeLabelProps) {
  return (
    <Group>
      {href ? (
        <Anchor href={href} target={target} c="blue">
          {name}
        </Anchor>
      ) : (
        name
      )}
      {type === 'folder' && <IconCornerRightDown size={20} color="grey" />}
      {children && (
        <Code fz={12} color={color} px={6} py={0}>
          {children}
        </Code>
      )}
    </Group>
  );
}
