import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// UI only for now. On Day 9 this form will save messages to the database.
export function ContactForm() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
        <CardDescription id="contact-form-note">
          This form goes live soon. Until then, please reach me on LinkedIn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* method="post" keeps typed text out of the URL if the form is ever submitted */}
        <form method="post" aria-describedby="contact-form-note" className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" autoComplete="name" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={5} required />
          </div>
          <Button type="submit" disabled className="self-start px-4">
            <Send aria-hidden="true" />
            Send message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
