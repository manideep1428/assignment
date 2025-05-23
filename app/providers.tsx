
"use client"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeProvider } from "@/components/theme"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SessionProvider } from "next-auth/react"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (

    <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
    </SessionProvider>
  )
}
