import { Mail, Phone, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ContactForm } from "./contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            ติดต่อเรา
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางด้านล่างนี้
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">อีเมล</p>
                  <p className="text-muted-foreground">contact@example.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">เบอร์โทรศัพท์</p>
                  <p className="text-muted-foreground">02-xxx-xxxx</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">เวลาทำการ</p>
                  <p className="text-muted-foreground">จันทร์ - ศุกร์: 09:00 - 18:00 น.</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-muted-foreground leading-relaxed">
              <p>
                ทีมงานของเราพร้อมให้บริการและตอบข้อสงสัยของคุณในทุกวันเวลาทำการ 
                กรุณาเลือกช่องทางที่สะดวกที่สุดในการติดต่อเรา
              </p>
            </div>
          </div>

          <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
