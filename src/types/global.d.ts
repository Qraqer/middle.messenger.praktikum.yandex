export type Props<P extends Record<string, unknown> = any> = { events?: Record<string, (e?: Event) => void> } & P;

interface IProfileEdit {
  label: string,
  value: string,
  type: string,
  name: string,
  id: string,
  rule?: string
}

interface IChatCard {
  id: number,
  title: string,
  text: string,
  date: string,
  notRead: number,
  selected?: boolean
}