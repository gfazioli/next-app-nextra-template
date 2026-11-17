import { Badge, MantineColor } from '@mantine/core';
import classes from './AnimateBadge.module.css';

type AnimateBadgeProps = {
  label?: string;
  color?: MantineColor;
  size?: string;
  fontSize?: number;
};

export function AnimateBadge({
  label = 'New',
  // red.8: white on Mantine's default red.6 is 3.3:1
  color = 'red.8',
  size = 'xs',
  fontSize = 10,
}: AnimateBadgeProps) {
  return (
    <Badge className={classes.badgeNew} size={size} fz={fontSize} color={color}>
      {label}
    </Badge>
  );
}
