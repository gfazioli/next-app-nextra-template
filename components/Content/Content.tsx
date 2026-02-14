import { Marquee } from '@gfazioli/mantine-marquee';
import { Button, Stack, Text } from '@mantine/core';

export const Content = () => {
  return (
    <>
      <Stack align="center" my="2vh">
        <Stack mb="5vh">
          <Text
            my={32}
            fz={32}
            ta="center"
            variant="gradient"
            gradient={{ from: 'yellow', to: 'violet' }}
          >
            You may use third-party components in your project
          </Text>

          <Button
            variant="gradient"
            gradient={{ from: 'cyan', to: 'indigo' }}
            size="xl"
            component="a"
            href="https://mantine-extensions.vercel.app/"
            target="_blank"
          >
            Visit the Mantine Extension Hub for more components
          </Button>
        </Stack>

        <Marquee fadeEdges pauseOnHover gap="xl">
          <Button
            size="xl"
            component="a"
            href="https://gfazioli.github.io/mantine-marquee/"
            target="_blank"
          >
            Mantine Marquee
          </Button>
          <Button
            size="xl"
            component="a"
            href="https://gfazioli.github.io/mantine-reflection/"
            target="_blank"
          >
            Mantine Reflection
          </Button>
          <Button
            size="xl"
            component="a"
            href="https://gfazioli.github.io/mantine-split-pane/"
            target="_blank"
          >
            Mantine Split Pane
          </Button>
          <Button
            size="xl"
            component="a"
            href="https://gfazioli.github.io/mantine-spinner/"
            target="_blank"
          >
            Mantine Spinner
          </Button>
          <Button
            size="xl"
            component="a"
            href="https://gfazioli.github.io/mantine-parallax/"
            target="_blank"
          >
            Mantine Parallax
          </Button>
        </Marquee>
      </Stack>
    </>
  );
};
