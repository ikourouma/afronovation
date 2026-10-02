import type { Testimonial } from "./types";

export const testimonialsIntro =
  "At Afronovation, our mission is to empower organizations to thrive in the digital age. But don't just take our word for it—our clients' success stories speak for themselves. We're proud to partner with leaders who are not only rei-magining the future but also achieving measurable results through our expertise in digital transformation, strategic program management, and innovative technology solutions.";

export const testimonials: Testimonial[] = [
  {
    quote:
      "Afronovation's expertise in digital transformation was instrumental in modernizing our operations. They provided a clear roadmap and seamless execution, turning a complex challenge into a successful and measurable outcome.",
    author: "John Oliver",
    role: "CEO Of Globex",
    company: "Globex",
    // TODO(stakeholder-Q3): authenticity/anonymization pending
    confirmed: false,
    // Placeholder copy carried over from the WordPress site - hidden until
    // replaced with a real, approved testimonial in the admin.
    published: false,
  },
  {
    quote:
      "We chose Afronovation for their deep understanding of change management. Their team guided us through a major transition with professionalism and a focus on our people, ensuring widespread adoption and lasting success.",
    author: "Mark Fowler",
    role: "CFO Of Initech",
    company: "Initech",
    // TODO(stakeholder-Q3): authenticity/anonymization pending
    confirmed: false,
    // Placeholder copy carried over from the WordPress site - hidden until
    // replaced with a real, approved testimonial in the admin.
    published: false,
  },
  {
    quote:
      "Afronovation delivered a cutting-edge technology platform that was perfectly tailored to our needs. Their blend of strategic insight and technical excellence is a powerful combination that truly inspires possibilities.",
    author: "Wayne Richardson",
    role: "CEO Of Globex",
    company: "Globex",
    // TODO(stakeholder-Q3): authenticity/anonymization pending
    confirmed: false,
    // Placeholder copy carried over from the WordPress site - hidden until
    // replaced with a real, approved testimonial in the admin.
    published: false,
  },
];

export function filterPublishedTestimonials(items: Testimonial[]): Testimonial[] {
  return items.filter((testimonial) => testimonial.published);
}
