import { MethodBadge } from "@/components/ui/method-badge";
import { DocuForgeCodeBlock } from "@/components/ui/code-block";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ApiCoursePage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-heading text-[40px] font-extrabold leading-[1.15] tracking-[0.02em] mb-4">
          Courses API
        </h1>
        <p className="text-lg text-tertiary leading-[1.7]">
          Manage and retrieve course information from your platform using these endpoints.
        </p>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-3 p-4 bg-surface border rounded-md shadow-subtle">
          <MethodBadge method="GET" />
          <code className="font-mono text-sm font-medium">/api/courses</code>
          <span className="text-sm text-muted-foreground ml-auto">List all courses</span>
        </div}

        <div className="space-y-6">
          <h2 className="font-heading text-[22px] font-semibold leading-[1.3]">Parameters</h2>
          <div className="overflow-hidden rounded-md border shadow-subtle">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-tertiary">
                <tr>
                  <th className="px-4 py-3 font-medium">Parameter</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-mono text-primary">page</td>
                  <td className="px-4 py-3">Integer</td>
                  <td className="px-4 py-3">The page number for pagination</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-primary">limit</td>
                  <td className="px-4 py-3">Integer</td>
                  <td className="px-4 py-3">Number of courses per page</td>
                </tr>
              </tbody>
            </table>
          </div}
        </div}

        <div className="space-y-4">
          <h2 className="font-heading text-[22px] font-semibold leading-[1.3]">Example Request</h2>
          <DocuForgeCodeBlock 
            code={`curl -X GET "https://api.example.com/api/courses?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"`}
          />
        </div}

        <div className="space-y-4">
          <h2 className="font-heading text-[22px] font-semibold leading-[1.3]">Example Response</h2>
          <DocuForgeCodeBlock 
            code={`{
  "data": [
    {
      "id": "crs_123",
      "title": "Advanced Next.js Mastery",
      "instructor": "John Doe",
      "price": 99.00,
      "status": "published"
    }
  ],
  "pagination": {
    "total": 120,
    "page": 1,
    "limit": 10
  }
}`}
          />
        </div}
      </section>

      <section className="pt-12 border-t space-y-6">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Developer Tip</CardTitle>
            <CardDescription>Use caching for the list endpoint to improve performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-tertiary leading-relaxed">
              We recommend implementing a 5-minute cache for the a general list of courses. 
              For real-time updates, use the webhooks provided in the Webhooks section.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
