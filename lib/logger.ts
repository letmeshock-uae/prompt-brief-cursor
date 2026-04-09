type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  data?: unknown
  timestamp: string
}

function log(level: LogLevel, message: string, data?: unknown) {
  if (process.env.NODE_ENV === 'production' && level === 'info') return

  const entry: LogEntry = {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
  }

  if (process.env.NODE_ENV !== 'production') {
    const prefix = { info: '📋', warn: '⚠️', error: '❌' }[level]
    // eslint-disable-next-line no-console
    console[level](`${prefix} [${entry.timestamp}] ${message}`, data ?? '')
  }
}

export const logger = {
  info: (msg: string, data?: unknown) => log('info', msg, data),
  warn: (msg: string, data?: unknown) => log('warn', msg, data),
  error: (msg: string, data?: unknown) => log('error', msg, data),
}
