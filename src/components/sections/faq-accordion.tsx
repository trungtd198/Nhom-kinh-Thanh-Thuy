'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

type FAQAccordionProps = {
  items: { question: string; answer: string }[];
};

export const FAQAccordion = ({ items }: FAQAccordionProps) => (
  <AccordionPrimitive.Root type="single" collapsible className="space-y-3">
    {items.map((item, index) => (
      <AccordionPrimitive.Item
        value={`item-${index}`}
        key={item.question}
        className="rounded-lg border border-silver-200 bg-white px-5"
      >
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger
            className={cn(
              'group flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-navy-950',
            )}
          >
            {item.question}
            <ChevronDown className="size-5 shrink-0 text-champagne-500 transition group-data-[state=open]:rotate-180" />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden pb-5 text-sm leading-6 text-silver-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {item.answer}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    ))}
  </AccordionPrimitive.Root>
);
