import { Wallet, Layers, Percent, Activity } from "lucide-react"

export const STATS = [
  { label: "Starting Balance", value: "100K", icon: Wallet, color: "text-[#E8602C]", bg: "bg-[#E8602C]/10" },
  { label: "Assets", value: "200+", icon: Layers, color: "text-[#00FF88]", bg: "bg-[#00FF88]/10" },
  { label: "Commission", value: "0%", icon: Percent, color: "text-[#E8602C]", bg: "bg-[#E8602C]/10" },
  { label: "Market Data", value: "Real-Time", icon: Activity, color: "text-[#00FF88]", bg: "bg-[#00FF88]/10" },
]

export const CONCEPTS = [
  { id: "01", title: "Order Book", desc: "A real-time electronic list of buy and sell orders for a specific asset, organized by price level." },
  { id: "02", title: "Market vs Limit", desc: "Market orders execute immediately at current prices. Limit orders execute only at your specified target price." },
  { id: "03", title: "Bid/Ask Spread", desc: "The difference between the highest price a buyer is willing to pay (bid) and lowest a seller will accept (ask)." },
  { id: "04", title: "Candlestick Charts", desc: "Visual representations of price movements showing the open, high, low, and close prices for a specific time period." },
  { id: "05", title: "Position Sizing", desc: "Determining the exact dollar amount or number of units to trade to manage risk effectively in your portfolio." },
  { id: "06", title: "Stop Loss & Take Profit", desc: "Automated exit orders designed to limit your potential losses or lock in your profits when you are away from the screen." },
]

export const STEPS = [
  { title: "Create your free account", desc: "Sign up in seconds to claim your $100,000 paper trading portfolio.", link: "/register", linkText: "Sign Up" },
  { title: "Explore the markets", desc: "Browse hundreds of real-world assets with live price feeds and charts.", link: "/markets", linkText: "View Markets" },
  { title: "Place your first paper trade", desc: "Use the trade terminal to buy or sell assets risk-free using market or limit orders.", link: "/trade", linkText: "Trade Now" },
  { title: "Track your portfolio", desc: "Monitor your PnL, manage open positions, and review your order history.", link: "/dashboard", linkText: "Go to Dashboard" },
]

export const GLOSSARY = [
  { term: "Bull Market", def: "A market condition where asset prices are generally rising or expected to rise." },
  { term: "Bear Market", def: "A market condition where asset prices are generally falling or expected to fall." },
  { term: "Leverage", def: "Using borrowed capital to increase the potential return (and risk) of an investment." },
  { term: "Margin", def: "The collateral that an investor has to deposit with their broker to cover credit risk." },
  { term: "Liquidation", def: "The forceful closing of a trader's position by the exchange due to insufficient margin." },
  { term: "Volatility", def: "A statistical measure of the dispersion of returns for a given security or market index." },
  { term: "Portfolio", def: "A collection of financial investments like stocks, bonds, commodities, cash, and their equivalents." },
  { term: "Hedge", def: "An investment made with the intention of reducing the risk of adverse price movements in an asset." },
  { term: "Long", def: "Buying an asset with the expectation that it will rise in value over time." },
  { term: "Short", def: "Selling a borrowed asset with the expectation that its price will fall, allowing it to be bought back cheaper." },
  { term: "ATH", def: "All-Time High. The highest price an asset has ever reached in its history." },
  { term: "Drawdown", def: "The peak-to-trough decline during a specific record period of an investment or fund." },
]

export const FAQS = [
  { q: "Is Cashfloz free to use?", a: "Yes, entirely free. Cashfloz is a portfolio project and educational tool designed to simulate trading mechanics." },
  { q: "Is this real money?", a: "No. All funds, balances, and trades on Cashfloz are simulated 'paper' money. No real financial transactions occur." },
  { q: "How is the price data generated?", a: "We pull delayed/simulated data from public APIs or generate realistic algorithmic movements for demonstration purposes." },
  { q: "Can I lose real money here?", a: "Absolutely not. Since no real money is ever deposited, there is zero financial risk involved in using this platform." },
  { q: "What assets can I trade?", a: "We offer a simulated selection of top cryptocurrencies, major forex pairs, and select global equities." },
  { q: "How do I place a trade?", a: "Navigate to the Trade terminal, select your asset, choose your order type (Market/Limit), enter an amount, and execute." },
  { q: "What is paper trading?", a: "Paper trading is simulated trading that allows investors to practice buying and selling without risking real money." },
  { q: "How does the order book work?", a: "Our order book simulates a live market depth, showing the accumulation of buy (bid) and sell (ask) orders at various price levels." },
]