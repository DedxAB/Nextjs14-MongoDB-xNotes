import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      value: "item-1",
      question: "Is it free to use?",
      answer:
        "Yes. DedxNotes is free to use. We dont charge anything. You can use it for personal or commercial use.",
    },
    {
      value: "item-2",
      question: "Can I access my notes from anywhere?",
      answer:
        "Yes. You can access your notes from anywhere from any device. You just need to login with your account. Your notes will be synced across all devices.",
    },
    {
      value: "item-3",
      question: "Can I access from mobile devices?",
      answer:
        "Yes. You can access DedxNotes from any device. Although we dont have a mobile app yet, you can use the web version on your mobile browser. DedxNotes is responsive and works well on mobile devices.",
    },
    {
      value: "item-4",
      question: "Is my data safe and secure?",
      answer:
        "Yes. Your data is safe and secure with us. We use google authentication to authenticate users. We dont store your password.",
    },
    {
      value: "item-5",
      question: "Can i download my notes as pdf or text?",
      answer:
        "No. We dont have this feature yet. But we are working on it. You can copy your notes and paste it in a text editor and save it as pdf or text.",
    },
    {
      value: "item-6",
      question: "Can i share my notes with others?",
      answer:
        "Yes, you can share your notes with others. Also you can share on social media.",
    },
    {
      value: "item-7",
      question: "is there any search feature?",
      answer:
        "Yes, you can search your notes. We have a search feature. You can search your notes by title or content or keyword. For more information refer the Features page.",
    },
  ];
  return (
    <>
      <div className={`mt-5`}>
        {faqs.map((faq, index) => {
          return (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value={faq.value}>
                  <AccordionTrigger className={`md:text-xl font-bold`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className={`md:text-lg`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
      </div>
    </>
  );
}
