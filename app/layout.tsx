import type { Metadata, Viewport } from "next";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AgentEngine from "@/components/AgentEngine";
import { profile } from "@/data/resume";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const caveat = Caveat_Brush({ weight: "400", subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.roleShort}`,
  description: profile.bio,
};

export const viewport: Viewport = { themeColor: "#09090b", width: "device-width", initialScale: 1 };

// Runs before first paint so unbuilt elements never flash.
const headScript = `(function(){try{
var d=document.documentElement,q=new URLSearchParams(location.search).get('agents'),on;
var tour=sessionStorage.getItem('tour')==='1';
var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
var saved=localStorage.getItem('agents');
if(q==='off')on=false;else if(q==='on'||tour)on=true;else if(saved==='off')on=false;else on=!reduced;
if(on){d.classList.add('build-mode');
setTimeout(function(){if(!window.__agentsReady)d.classList.remove('build-mode')},6000);}
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${geist.variable} ${geistMono.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <AgentEngine />
      </body>
    </html>
  );
}
