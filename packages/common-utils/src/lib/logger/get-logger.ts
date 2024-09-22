import log from 'loglevel'
import type { Logger } from 'loglevel'
import prefix from 'loglevel-plugin-prefix'

if (process.env.NODE_ENV === 'development') {
  log.setDefaultLevel('debug')
}

prefix.reg(log)
prefix.apply(log, {
  levelFormatter: (level) => level.toUpperCase(),
  nameFormatter: (name) => name ?? 'global',
  template: '[%t] %l (%n):',
  timestampFormatter: (date) =>
    `${date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')}.${date.getMilliseconds()}`,
})

export function getLogger(name?: string): Logger {
  return name == null ? log.noConflict() as Logger : log.getLogger(name)
}
