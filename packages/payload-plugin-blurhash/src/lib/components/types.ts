import type { TextField } from 'payload'

export interface BlurhashFieldProps extends Omit<TextField, 'type'> {
  label: string
  path: string
}
