"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/svgs/icons"
import { motion } from "framer-motion"
import { AlertCircle, Shield, Users, Zap } from "lucide-react"

export default function SignIn() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (session?.user) {
    redirect("/")
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await signIn("google")

      if (result?.error) {
        setError("Authentication failed. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless collaboration tools for your team",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for productivity",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Welcome to My Assignment
                <span className="block text-emerald-400">Productivity</span>
              </h1>
              <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                Please Login to See it 
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-md"
          >
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-slate-600">Sign in to continue to your dashboard</p>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
                  <p className="text-slate-600">Access your professional dashboard</p>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full h-12 bg-white hover:bg-gray-50 text-slate-900 border border-slate-300 shadow-sm font-medium text-base transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    variant="outline"
                  >
                    {loading ? (
                      <>
                        <Icons.spinner className="mr-3 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <Icons.google className="mr-3 h-5 w-5" />
                        Continue with Google
                      </>
                    )}
                  </Button>
                </motion.div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Secure authentication</span>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    By signing in, you agree to our{" "}
                    <button onClick={()=>alert("Oops , Not developed yet")} className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                      Terms of Service
                      </button>{" "}
                      and{" "}
                    <button onClick={()=>alert("Oops , Not developed yet")} className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                      Privacy Policy
                      </button>
                  </p>

                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                    <Shield className="w-3 h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-center mt-8"
            >
              <p className="text-sm text-slate-500">
                Need help?{" "}
                <button onClick={()=>alert("Sorry, Still in contruction")} className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Contact Support
                </button>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
