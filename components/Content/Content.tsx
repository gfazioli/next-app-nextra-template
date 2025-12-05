import { Marquee } from '@gfazioli/mantine-marquee';
import { Anchor, Image } from 'nextra/components';
import { Box, Button, Stack, Text } from '@mantine/core';

export const Content = () => {
  return (
    <>
      <Stack align="center" my={32}>
        <Box lightHidden>
          <Text
            my={32}
            fz={32}
            ta="center"
            variant="gradient"
            gradient={{ from: 'yellow', to: 'violet' }}
            style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            You may use third-party components in your project
          </Text>
        </Box>
        <Box darkHidden>
          <Text
            my={32}
            fz={32}
            ta="center"
            variant="gradient"
            gradient={{ from: 'red', to: 'yellow' }}
            style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            You may use third-party components in your project
          </Text>
        </Box>

        <Anchor href="https://mantine-extensions.vercel.app/">
          <Image
            width={640}
            height={500}
            src="https://raw.githubusercontent.com/gfazioli/mantine-extensions-assets/main/meh/meh.png"
            alt="Mantine Extensions Hub"
          />
        </Anchor>

        <Anchor href="https://mantine-extensions.vercel.app/">
          Visit the Mantine Extension Hub for more components
        </Anchor>

        <Marquee fadeEdges pauseOnHover>
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

        {/* <TextAnimate.Typewriter
          multiline
          value={[
            'Hello, World! Mantine Typewriter component',
            'That was a long time ago',
            'But it was fun',
          ]}
        /> */}
      </Stack>
    </>
  );
};
