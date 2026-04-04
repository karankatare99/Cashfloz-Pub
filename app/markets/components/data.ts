export interface Market {
  id: number;
  name: string;
  symbol: string;
  type: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
  sparkline: "up" | "down";
}

export const MOCK_MARKETS: Market[] = [
  { id: 1, name: "Bitcoin", symbol: "BTC", type: "Crypto", price: 64231.50, change: 2.45, volume: "32.4B", marketCap: "1.2T", sparkline: "up" },
  { id: 2, name: "Ethereum", symbol: "ETH", type: "Crypto", price: 3450.20, change: 1.82, volume: "15.1B", marketCap: "415B", sparkline: "up" },
  { id: 3, name: "Solana", symbol: "SOL", type: "Crypto", price: 145.60, change: -0.54, volume: "4.2B", marketCap: "65B", sparkline: "down" },
  { id: 4, name: "EUR/USD", symbol: "EURUSD", type: "Forex", price: 1.0845, change: 0.12, volume: "850B", marketCap: "-", sparkline: "up" },
  { id: 5, name: "Gold", symbol: "XAU", type: "Commodities", price: 2340.10, change: 0.85, volume: "120B", marketCap: "-", sparkline: "up" },
  { id: 6, name: "Apple", symbol: "AAPL", type: "Stocks", price: 173.50, change: -1.25, volume: "10.5B", marketCap: "2.8T", sparkline: "down" },
  { id: 7, name: "Tesla", symbol: "TSLA", type: "Stocks", price: 175.22, change: 3.45, volume: "25.2B", marketCap: "560B", sparkline: "up" },
  { id: 8, name: "S&P 500", symbol: "SPY", type: "Indices", price: 523.44, change: 0.50, volume: "85B", marketCap: "-", sparkline: "up" },
]