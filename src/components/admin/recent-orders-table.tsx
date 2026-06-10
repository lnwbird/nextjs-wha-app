"use client"

import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminOrderItem } from "@/types/admin"
import { cn } from "@/lib/utils"

type RecentOrdersTableProps = {
  orders: AdminOrderItem[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export const RecentOrdersTable = ({ orders, loading, error, onRetry }: RecentOrdersTableProps) => {
  const formatCurrency = new Intl.NumberFormat('th-TH', { 
    style: 'currency', 
    currency: 'THB' 
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
      case 'pending': return 'bg-amber-100 text-amber-700 hover:bg-amber-100'
      case 'cancelled': return 'bg-rose-100 text-rose-700 hover:bg-rose-100'
      default: return 'bg-slate-100 text-slate-700 hover:bg-slate-100'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 w-full animate-pulse bg-muted rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-6">
        <CardTitle className="text-lg mb-2">ไม่สามารถโหลดข้อมูลได้</CardTitle>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          ลองใหม่อีกครั้ง
        </button>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>แสดงคำสั่งซื้อ 5 รายการล่าสุด</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ลูกค้า</TableHead>
              <TableHead>วันที่</TableHead>
              <TableHead>ยอดรวม</TableHead>
              <TableHead className="text-right">สถานะ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  ไม่พบข้อมูลคำสั่งซื้อ
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.customerName}
                  </TableCell>
                  <TableCell>
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    {formatCurrency.format(order.totalAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={cn("font-normal", getStatusColor(order.status))}>
                      {order.status === 'completed' ? 'สำเร็จ' : order.status === 'pending' ? 'รอดำเนินการ' : 'ยกเลิก'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
