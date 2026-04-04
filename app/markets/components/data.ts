export interface Market {
  id: number
  name: string
  symbol: string
  type: string
  price: number
  change: number
  volume: string
  marketCap: string
  sparkline: "up" | "down"
}