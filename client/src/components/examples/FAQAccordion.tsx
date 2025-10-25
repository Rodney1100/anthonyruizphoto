import FAQAccordion from '../FAQAccordion'

const mockFAQs = [
  {
    question: 'How long does a typical shoot take?',
    answer: 'Most residential shoots take 45-90 minutes depending on property size. Commercial properties may require 2-3 hours. We work efficiently while ensuring we capture every important detail.'
  },
  {
    question: 'What if the weather isn\'t ideal for the shoot?',
    answer: 'We monitor weather conditions closely and will reschedule if necessary at no additional charge. For drone shoots, we require clear skies and wind speeds under 20mph for safety and optimal image quality.'
  },
  {
    question: 'When will the photos be ready?',
    answer: 'Standard turnaround is 24 hours. Rush delivery (same-day) is available for an additional fee. All images are professionally edited and delivered via secure online gallery.'
  },
]

export default function FAQAccordionExample() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <FAQAccordion faqs={mockFAQs} />
    </div>
  )
}
