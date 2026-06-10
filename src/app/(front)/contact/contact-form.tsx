"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { 
  Field, 
  FieldContent, 
  FieldLabel, 
  FieldError 
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact"

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })

        const result = await response.json()

        if (!result.success) {
          toast.error(result.error || "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง")
          return
        }

        toast.success("ส่งข้อความเรียบร้อยแล้ว")
        setIsSuccess(true)
        form.reset()
      } catch {
        toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง")
      }
    })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="h-12 w-12 text-primary" />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">ส่งข้อความสำเร็จ!</h3>
          <p className="text-muted-foreground">ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Field>
        <FieldLabel htmlFor="name">ชื่อ</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register("name")} 
            id="name" 
            placeholder="กรอกชื่อของคุณ" 
          />
          <FieldError errors={form.formState.errors.name?.types ? [] : [form.formState.errors.name]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="email">อีเมล</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register("email")} 
            id="email" 
            type="email" 
            placeholder="example@email.com" 
          />
          <FieldError errors={form.formState.errors.email?.types ? [] : [form.formState.errors.email]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="message">ข้อความ</FieldLabel>
        <FieldContent>
          <Textarea 
            {...form.register("message")} 
            id="message" 
            rows={5} 
            placeholder="พิมพ์ข้อความที่ต้องการ..." 
          />
          <FieldError errors={form.formState.errors.message?.types ? [] : [form.formState.errors.message]} />
        </FieldContent>
      </Field>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        ส่งข้อความ
      </Button>
    </form>
  )
}
