import React from "react"
import { Twitter, Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const socials = [
    { name: "X (Twitter)", icon: Twitter, href: "https://x.com/ssh_krn" },
    { name: "GitHub", icon: Github, href: "https://github.com/ssh-krn" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/karan-katare-0432b32aa/" },
    { name: "Email", icon: Mail, href: "mailto:karankatare969@gmail.com" },
  ]

  return (
    <footer className="bg-navy-light py-12 border-t border-gray-border px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-syne font-bold text-xl text-white tracking-widest skew-x-[-5deg]">
            CASHFLOZ
          </div>
          <div className="text-gray-medium text-sm font-dm-sans">
            © 2026 Cashfloz Trading Ltd. All rights reserved.
          </div>
        </div>

        {/* Social Contact Methods */}
        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-full border border-gray-border/50 bg-navy flex items-center justify-center text-gray-light hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Icon className="w-4 h-4" />
              </a>
            )
          })}
        </div>

        {/* Platform Links */}
        <div className="flex gap-6 text-gray-light text-sm">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">API</a>
        </div>

      </div>
    </footer>
  )
}