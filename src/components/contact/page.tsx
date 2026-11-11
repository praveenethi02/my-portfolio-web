import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactLinks } from "@/components/contact/contact-links";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Contact | Praveen Ethipola",
  description: "Get in touch with Praveen Ethipola.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 sm:py-24">
      <FadeIn>
        <PageHeader
          eyebrow="Contact"
          title="Let's talk"
          description="Have a question, an opportunity or just want to say hi? Reach out below."
        />
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
        <FadeIn delay={0.1} className="h-full">
          <ContactLinks />
        </FadeIn>
        <FadeIn delay={0.2} className="h-full">
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
