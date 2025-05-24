"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { Github, Settings, User, LogOut, Bell, Box, BoxIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ModeToggle } from "./DarkToggle"
import { useRouter } from "next/navigation"

const containerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}


export default function Topbar() {
  const { data: session } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router =  useRouter();

  const handleClick = () => {
    alert("Under Construction")
  }

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-6">
        <motion.div variants={logoVariants} className="flex items-center space-x-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"
          >
            <span className="text-sm font-bold text-white">M</span>
          </motion.div>
          <motion.h1
            className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            MyApp
          </motion.h1>
        </motion.div>

        <motion.nav variants={itemVariants} className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Button onClick={()=>router.push("/orders")} variant="ghost" size="sm" className="relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <BoxIcon className="mr-2 h-4 w-4" />
              <span className="relative z-10">Orders</span>
            </Button>
          </motion.div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <motion.span
                className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
            <ModeToggle/>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
            <Link href="https://github.com/manideep1428">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <DropdownMenu onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all duration-200 hover:ring-blue-500/50">
                    <AvatarImage src={session?.user?.image || ""} alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
              </DropdownMenuTrigger>

              <AnimatePresence>
                {isDropdownOpen && (
                  <DropdownMenuContent asChild align="end" className="w-56">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{session?.user?.name || "User"}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {session?.user?.email || "user@example.com"}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <motion.div
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <DropdownMenuItem className="cursor-pointer" onClick={()=>handleClick()}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                      </motion.div>

                      <motion.div
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <DropdownMenuItem className="cursor-pointer" onClick={()=>handleClick}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </motion.div>

                      <DropdownMenuSeparator />

                      <motion.div
                        whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 focus:text-red-600"
                          onClick={() => signOut()}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </motion.div>
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  )
}
