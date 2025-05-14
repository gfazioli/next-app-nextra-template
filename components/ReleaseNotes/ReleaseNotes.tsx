'use client';

import { IconBrandGithub } from '@tabler/icons-react';
import { MDXRemote } from 'nextra/mdx-remote';
import { Alert, Badge, Button, Group, Loader, Paper, Skeleton, Stack, Text } from '@mantine/core';
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

  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <Stack mt={24}>
      {data.map((release: Release) => (
        <Paper
          id={release.tag_name}
          key={release.id}
          withBorder
          p={24}
          radius={12}
          shadow="sm"
          className="x:tracking-tight x:target:animate-[fade-in_1.5s]"
        >
          <Group justify="space-between">
            <Badge size="xl">{release.tag_name}</Badge>
            <Text>{release.created_at}</Text>
          </Group>

          <MDXRemote compiledSource={release.body} components={components} />
        </Paper>
      ))}
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
