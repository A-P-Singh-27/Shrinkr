import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export default function Faqs() {
    return (
        <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it free to use?</AccordionTrigger>
          <AccordionContent>
            Yes, our URL shortener is completely free to use for generating short links.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Do the shortened links expire?</AccordionTrigger>
          <AccordionContent>
            By default, shortened links do not expire. However, you can set an expiration date if needed.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can I track the analytics of my shortened links?</AccordionTrigger>
          <AccordionContent>
            Yes, we provide link analytics, including the number of clicks, geographic locations, and referral sources.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Do I need to create an account?</AccordionTrigger>
          <AccordionContent>
            No, you can shorten URLs without an account. However, creating an account allows you to manage and track your links.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Are my shortened links permanent?</AccordionTrigger>
          <AccordionContent>
            Yes, links remain active unless they are manually deleted or set to expire.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Can I customize my short link?</AccordionTrigger>
          <AccordionContent>
            Yes, you can customize the shortened URL to make it more recognizable and user-friendly.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>Is there an API available for developers?</AccordionTrigger>
          <AccordionContent>
            Yes, we offer an API that developers can use to integrate URL shortening into their applications.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    )
  }
  