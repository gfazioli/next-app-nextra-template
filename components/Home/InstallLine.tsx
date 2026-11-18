'use client';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import { CopyButton } from '@mantine/core';
import { site } from '@/config/site';
import classes from './InstallLine.module.css';

/** The first command: this template cloned into a folder of your own. */
export const INSTALL_COMMAND = `git clone https://github.com/${site.repo}.git my-docs`;

/** The install command as one terminal line, with a copy button beside it. */
export function InstallLine() {
  return (
    <div className={classes.line}>
      <span className={classes.prompt} aria-hidden="true">
        $
      </span>
      {/* Focusable: on a phone the command is wider than its line and scrolls sideways. */}
      <code className={classes.command} tabIndex={0}>
        {INSTALL_COMMAND}
      </code>
      <CopyButton value={INSTALL_COMMAND} timeout={1600}>
        {({ copied, copy }) => (
          <button
            type="button"
            className={classes.copy}
            onClick={copy}
            aria-label={copied ? 'Copied' : 'Copy the command'}
            data-copied={copied || undefined}
          >
            {copied ? (
              <IconCheck size={16} aria-hidden="true" />
            ) : (
              <IconCopy size={16} aria-hidden="true" />
            )}
          </button>
        )}
      </CopyButton>
    </div>
  );
}
