'use client';

import { IconBrandGithub, IconPackage } from '@tabler/icons-react';
import { MDXRemote } from 'nextra/mdx-remote';
import {
  Alert,
  Badge,
  Button,
  Group,
  Loader,
  Skeleton,
  Stack,
  Text,
  Timeline,
} from '@mantine/core';
import config from '@/config';
import { useMDXComponents } from '@/mdx-components';
import { useReleaseNotes, type Release } from './use-release-notes';

export function ReleaseNotes() {
  const { data, error, isLoading } = useReleaseNotes();

  const components = useMDXComponents();

  if (error) {
    return (
      <Alert my={32} icon="⚠️" title="Failed to load releases" color="red">
        {error}
      </Alert>
    );
  }

  if (isLoading || data.length === 0) {
    return (
      <Stack mt={24} w="100%" align="center">
        <Group>
          <Text>Loading releases...</Text>
          <Loader type="dots" />
        </Group>
        <Skeleton height={200} width="100%" radius={12} />
        <Skeleton height={50} width="100%" radius={12} />
        <Skeleton height={20} width="100%" radius={12} />
      </Stack>
    );
  }

  return (
    <Stack mt={24}>
      <Timeline active={1} bulletSize={32} lineWidth={4}>
        {data.map((release: Release) => (
          <Timeline.Item
            id={release.tag_name}
            className="x:tracking-tight x:target:animate-[fade-in_1.5s]"
            key={release.id}
            bullet={<IconPackage size={20} />}
            title={<Badge size="xl">{release.tag_name}</Badge>}
          >
            <Text size="sm" fw={800} mb={16}>
              {release.created_at}
            </Text>
            <MDXRemote compiledSource={release.body} components={components} />
          </Timeline.Item>
        ))}
      </Timeline>
      <Button
        color="orange"
        component="a"
        href={config.releaseNotes.url}
        variant="gradient"
        size="sm"
        gradient={{ from: 'dark.9', to: 'dark.8', deg: 45 }}
        leftSection={<IconBrandGithub size={18} />}
        radius="xl"
      >
        View full changelog on GitHub
      </Button>
    </Stack>
  );
}
