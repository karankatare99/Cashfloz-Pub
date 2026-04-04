import React from "react"

export function Footer() {
  return (
    <footer className="bg-navy-light py-12 border-t border-gray-border px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-syne font-bold text-xl text-white tracking-widest skew-x-[-5deg]">CASHFLOZ</div>
        <div className="text-gray-medium text-sm font-dm-sans">© 2026 Cashfloz Trading Ltd. All rights reserved.</div>
        <div className="flex gap-4 text-gray-light">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">API</a>
        </div>
      </div>
    </footer>
  )
}