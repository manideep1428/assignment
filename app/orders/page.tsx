"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PlusCircle, Search, Pizza, Clock, TruckIcon, CheckCircle, XCircle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { dummyData } from "@/lib/dummy"
import Topbar from "@/components/TopBar"

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 dark:hover:bg-amber-900/50"
    case "Preparing":
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50"
    case "Out for Delivery":
      return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-900/50"
    case "Delivered":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-900/50"
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 dark:hover:bg-red-900/50"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800/80"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pending":
      return <Clock className="mr-1.5 h-3.5 w-3.5" />
    case "Preparing":
      return <Pizza className="mr-1.5 h-3.5 w-3.5" />
    case "Out for Delivery":
      return <TruckIcon className="mr-1.5 h-3.5 w-3.5" />
    case "Delivered":
      return <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
    case "Cancelled":
      return <XCircle className="mr-1.5 h-3.5 w-3.5" />
    default:
      return null
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export default function Orders() {
  const [orders, setOrders] = useState(dummyData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statuses = ["all", ...new Set(orders.map((order) => order.status))]

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <Topbar />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Pizza className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
                </div>
                Order Management
              </h1>
              <p className="text-base sm:text-lg dark:text-gray-400 mt-1 sm:mt-2">Track and manage your pizza orders in real-time</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {[
            { label: "Total Orders", value: orders.length, color: "blue" },
            { label: "Pending", value: orders.filter((o) => o.status === "Pending").length, color: "amber" },
            { label: "Preparing", value: orders.filter((o) => o.status === "Preparing").length, color: "purple" },
            { label: "Delivered", value: orders.filter((o) => o.status === "Delivered").length, color: "emerald" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-${stat.color}-600 dark:bg-${stat.color}-400 rounded`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm sm:shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border dark:border-gray-700 mx-[-0.75rem] sm:mx-0 rounded-none sm:rounded-lg">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="hidden sm:block">
                  <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white">Orders Overview</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage and track all your pizza orders</CardDescription>
                </div>

                {/* Search and Filter Controls */}
                <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      className="pl-10 border-gray-200 dark:border-gray-700 focus:border-orange-300 dark:focus:border-orange-500 focus:ring-orange-200 dark:focus:ring-orange-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[140px] border-gray-200 dark:border-gray-700 focus:border-orange-300 dark:focus:border-orange-500 focus:ring-orange-200 dark:focus:ring-orange-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <Filter className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                      <SelectValue placeholder="Status" className="text-sm sm:text-base" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          {status === "all" ? "All Statuses" : status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50/80 dark:bg-gray-800/80">
                    <TableRow className="border-gray-100 dark:border-gray-700">
                      <TableHead className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">Order ID</TableHead>
                      <TableHead className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">Customer</TableHead>
                      <TableHead className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">Pizza Type</TableHead>
                      <TableHead className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">Qty</TableHead>
                      <TableHead className="hidden xs:table-cell text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">Order Date</TableHead>
                      <TableHead className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <Pizza className="h-12 w-12 mb-4 text-gray-300 dark:text-gray-600" />
                            <p className="text-lg font-medium">No orders found</p>
                            <p className="text-sm">Try adjusting your search or filters</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order, index) => (
                        <motion.tr
                          key={order.orderId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <TableCell className="font-mono text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap">{order.orderId}</TableCell>
                          <TableCell className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap">{order.customerName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <Pizza className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-900 dark:text-gray-200 truncate max-w-[100px] sm:max-w-none">
                                {order.pizzaType}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-200">
                            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-gray-100 dark:bg-gray-700 rounded-full text-xs sm:text-sm font-medium">
                              {order.quantity}
                            </span>
                          </TableCell>
                          <TableCell className="hidden xs:table-cell text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                            {new Date(order.orderDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell>
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                              <Badge
                                className={`flex items-center w-fit font-medium text-xs sm:text-sm ${getStatusBadgeColor(order.status)}`}
                                variant="outline"
                              >
                                {getStatusIcon(order.status)}
                                <span className="truncate">{order.status}</span>
                              </Badge>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
