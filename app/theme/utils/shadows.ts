type Shadow = 'default' | 'md' | 'border'

export const SHADOWS: Record<Shadow, string> = {
  default: '0px 0px 12px 0px rgba(0,0,0,0.17)',
  md: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  border: '-3px 0 #000, 0 3px #000, 3px 0 #000, 0 -3px #000;',
}
