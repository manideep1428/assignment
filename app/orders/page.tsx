"use client"

import { useState } from "react"
import { PlusCircle, Search, Pizza, Clock, TruckIcon, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { dummyData } from "@/lib/dummy"

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Preparing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Out for Delivery":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    case "Delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pending":
      return <Clock className="mr-1 h-3 w-3" />
    case "Preparing":
      return <Pizza className="mr-1 h-3 w-3" />
    case "Out for Delivery":
      return <TruckIcon className="mr-1 h-3 w-3" />
    case "Delivered":
      return <CheckCircle className="mr-1 h-3 w-3" />
    case "Cancelled":
      return <XCircle className="mr-1 h-3 w-3" />
    default:
      return null
  }
}

export default function OrderManagement() {
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
        <Card className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50 to-white">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-t-lg">
            <div>
              <CardTitle className="text-red-700 text-2xl flex items-center">
                <Pizza className="mr-2 h-6 w-6 text-red-500" />
                Fresh Orders
              </CardTitle>
              <CardDescription className="text-red-600">
                Manage your pizza orders and track their delicious journey
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, customer, or pizza type..."
                  className="pl-8 border-red-200 focus-visible:ring-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] border-red-200 focus:ring-red-500 hover:cursor-pointer">
                  <SelectValue placeholder="Filter by status" className="hover:cursor-pointer" />
                </SelectTrigger>
                <SelectContent className="bg-red-50">
                  {statuses.map((status) => (
                    <SelectItem className="hover:cursor-pointer" key={status} value={status}>
                      {status === "all" ? "All Statuses" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border border-red-200 overflow-hidden">
              <Table className="text-base">
                <TableHeader className="bg-red-50">
                  <TableRow className="h-14">
                    <TableHead className="text-red-700 text-base">Order ID</TableHead>
                    <TableHead className="text-red-700 text-base">Customer</TableHead>
                    <TableHead className="text-red-700 text-base">Pizza Type</TableHead>
                    <TableHead className="text-red-700 text-base">Quantity</TableHead>
                    <TableHead className="text-red-700 text-base">Order Date</TableHead>
                    <TableHead className="text-red-700 text-base">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&_tr:not(:last-child)]:border-b [&_tr]:border-red-100">
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-red-500 text-lg">
                        No pizza orders found. Time to make some dough!
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.orderId} className="h-16 hover:bg-amber-50">
                        <TableCell className="font-medium text-base">{order.orderId}</TableCell>
                        <TableCell className="text-base">{order.customerName}</TableCell>
                        <TableCell className="flex items-center text-base">
                          <Pizza className="mr-2 h-5 w-5 text-red-500" />
                          {order.pizzaType}
                        </TableCell>
                        <TableCell className="text-base">{order.quantity}</TableCell>
                        <TableCell className="text-base">{new Date(order.orderDate).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={`flex items-center text-base py-1.5 px-3 ${getStatusBadgeColor(order.status)}`} variant="outline">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
  )
}
