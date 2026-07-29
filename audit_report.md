# Afronovation.com Website Audit Report

| | |
|---|---|
| **Site audited** | https://afronovation.com/ |
| **Audit date** | Tuesday, July 28, 2026 |
| **Audit type** | Content audit + platform audit (security, scalability, duplication) |
| **Performed by** | Kimi K2.7 audit agent (read-only reconnaissance) |
| **Scope** | Live public website only. No server access, no authenticated testing, no destructive probes. Only GET/HEAD requests were issued. |
| **Purpose** | Single source of truth for the full rebuild of afronovation.com as a Next.js application (see `knowledgebase.md` and `backlog.md`). |
| **Constraints honored** | This report is descriptive only. It contains no code diffs, no patch suggestions, and no build commands. |

---

## Executive Summary

Afronovation.com is a small WordPress marketing site (Astra theme + Spectra/Ultimate Addons for Gutenberg + SureForms) hosted on Hostinger's LiteSpeed platform. It consists of **6 navigable pages**, **3 team profiles**, **3 testimonials**, an **8-field lead-generation form**, and a media library of **81 image assets**.

Key findings:

1. **The Projects page is broken.** `/projects/` returns HTTP 200 but renders the Hostinger default landing page instead of the intended portfolio content (the intended content still exists in the WordPress database and was recovered via the REST API).
2. **No real project case studies exist anywhere on the site.** Portfolio imagery is stock/demo material with no titles, categories, or links.
3. **Security posture is weak:** user and author enumeration are possible via the REST API, `readme.html` is publicly exposed, XML-RPC is enabled, and four standard security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) are missing from all public pages.
4. **Scalability is limited by the platform:** no CDN, oversized images served into small containers, misconfigured `srcset` attributes, and a heavy plugin stack (the contact page alone loads ~42 CSS/JS assets).
5. **Content duplication is pervasive:** the header/footer, the "Don't Be Shy, Say Hello." call-to-action, capability descriptions, team bios, and partner logos are repeated across pages - a maintainability risk that the rebuild eliminates through a single typed content module.
6. **Several content defects need stakeholder decisions:** a misspelled team member name ("justing fawson"), a typo in a form option ("Government Digitaization"), a hyphenation artifact ("rei-magining"), a duplicate testimonial attribution ("CEO Of Globex" used for two different people), an empty footer LinkedIn link, and one team member (Adrienne Boykin) whose "more." link is a `#` placeholder.

---

## 1. Sitemap

### 1.1 Publicly reachable pages (primary navigation)

| URL | Source | Status / Notes |
|---|---|---|
| `https://afronovation.com/` | Primary nav, footer, logo | 200 OK - homepage |
| `https://afronovation.com/about/` | Primary nav, footer | 200 OK |
| `https://afronovation.com/services/` | Primary nav, footer | 200 OK |
| `https://afronovation.com/projects/` | Primary nav, footer, CTA links | 200 OK - **renders Hostinger default page**; intended WordPress content exists in the database but is not displayed |
| `https://afronovation.com/testimonials/` | Primary nav, footer | 200 OK |
| `https://afronovation.com/contact/` | Primary nav, footer, CTAs | 200 OK |

### 1.2 Additional endpoints discovered (not linked in navigation)

| URL | Status | Notes |
|---|---|---|
| `https://afronovation.com/hello-world/` | 200 OK | Default WordPress sample post still published |
| `https://afronovation.com/author/ikouroumagmail-com/` | 200 OK | Revealed by `/?author=1` enumeration |
| `https://afronovation.com/feed/` | 200 OK | RSS feed |
| `https://afronovation.com/comments/feed/` | 200 OK | Comment RSS feed |
| `https://afronovation.com/readme.html` | 200 OK | WordPress readme file publicly exposed |

### 1.3 Sitemap observations

- Only 6 pages exist in the primary navigation.
- There is **no privacy policy, cookie policy, or terms of service** page.
- There are **no dedicated team profile pages**; "more." links point to LinkedIn (or to a `#` placeholder for one member).
- There are **no standalone project case-study pages**.
- The `/projects/` slug returns 200 but serves a Hostinger placeholder - a silent failure that a visitor would interpret as an unfinished site.

---

## 2. Page-by-Page Content Inventory

### 2.1 Home - `https://afronovation.com/`

- **Title tag:** `Home - afronovation, Inc.`
- **Meta description:** `Inspiring possibilities through strategy, technology, and digital transformation. find out more. 127 Long Shadow Ln., Cary, NC 27518 hello@afronovation.com 1-844-664-4247 Capabilities. program & change management...` (auto-generated dump of page text; not a crafted description)

**Heading hierarchy (in document order):**

| Level | Text |
|---|---|
| H1 | Inspiring possibilities through strategy, technology, and digital transformation. |
| H2 | Capabilities. |
| H4 | program & change management. |
| H4 | Technology & platform development. |
| H4 | digital transformation. |
| H6 | All Services. |
| H2 | This Is How We Can Help You. |
| H2 | Latest Work. |
| H6 | Clients. |
| H2 | Forward Thinking partners. |
| H2 | About Us. |
| H4 | Curious About Our Culture? |
| H5 | managing Partner - Strategy & transformation |
| H2 | Ibrahima kourouma |
| H5 | marketing & communications |
| H2 | adrienne boykin |
| H5 | operations & government relations |
| H2 | justing fawson |
| H2 | Don't Be Shy, Say Hello. |

Note the inconsistent capitalization and heading-level jumps (H2 to H4, H6 used for eyebrows). Names are lowercased in the source ("Ibrahima kourouma", "adrienne boykin") and one name is misspelled ("justing fawson").

**Body copy (verbatim):**

- Hero contact block: `127 Long Shadow Ln., Cary, NC 27518` / `hello@afronovation.com` / `1-844-664-4247`
- Program & change management: `Guiding Change, Driving Success. Our Program & Change Management practice ensures that complex initiatives are delivered on time, within scope, and with sustainable adoption. We combine proven methodologies—such as Agile, Lean, PROSCI, and PMI best practices—with deep stakeholder engagement to manage risk, align teams, and maximize ROI.`
- Technology & platform development: `Building Platforms for Growth. From concept to execution, Afronovation develops modern, scalable, and secure technology solutions tailored to your business needs. Whether it's custom applications, SaaS platforms, websites, or mobile apps, we integrate cutting-edge design with seamless user experience.`
- Digital transformation: `Reimagining the Future, Today. Digital transformation is more than technology—it's about reimagining processes, culture, and customer engagement. Afronovation partners with organizations to design and implement transformation strategies that deliver measurable value.`
- "This Is How We Can Help You" service list (15 items): enterprise program management; change management (OCM); stakeholder engagement; agile coaching & PMO; performance tracking; web & mobile apps; SaaS & CRM development; cloud & API integration; UI/UX design & prototyping; enterprise system modernization; digital strategy & roadmap; business process reengineering; data & analytics enablement; cloud migration & modernization; e-government.
- About Us section: `At Afronovation, we believe technology and innovation are the catalysts for sustainable growth and transformation. Our mission is to empower organizations—across the private sector, public institutions, and communities—to harness digital solutions that solve today's challenges and unlock tomorrow's opportunities. We bring together expertise in program & change management, technology & platform development, and digital transformation to deliver measurable results. By blending strategy with execution, we ensure that every initiative not only launches successfully but also creates lasting value for people, businesses, and governments. More than a consulting firm, Afronovation is a strategic partner for innovation. With a focus on impact, adaptability, and excellence, we help organizations reimagine the future, accelerate growth, and lead confidently in the digital age.`

**CTAs and links:**

| Link text | Target | Notes |
|---|---|---|
| find out more. | `/services/` | Hero button |
| view ALL projects. | `/projects/` | Below Latest Work (target page is broken) |
| view projects. | `/projects/` | Intro CTA (target page is broken) |
| more. | `https://www.linkedin.com/in/ikourouma/` | Ibrahima profile, opens in new tab |
| more. | `#` | Adrienne - placeholder, goes nowhere |
| more. | `https://www.linkedin.com/in/justinfawson/` | Justin profile |
| contact us. | `/contact/` | Closing CTA |
| Home / About / Services / Projects / Testimonials / Contact | nav + footer | Standard |

**Images on homepage:**

| Image URL | Alt text | Usage |
|---|---|---|
| `/wp-content/uploads/2025/09/afronovation-high-resolution-logo-transparent-300x59.png` | (empty) | Header logo |
| `/wp-content/uploads/2023/03/portfolio-image-08-free-img.jpg` | (empty) | Latest Work grid |
| `/wp-content/uploads/2023/03/portfolio-image-05-free-img.jpg` | (empty) | Latest Work grid |
| `/wp-content/uploads/2023/03/portfolio-image-06-free-img.jpg` | (empty) | Latest Work grid |
| `/wp-content/uploads/2023/03/portfolio-image-07-free-img.jpg` | (empty) | Latest Work grid |
| `/wp-content/uploads/2025/09/Oracle-01-150x150.png` | (empty) | Partner logo |
| `/wp-content/uploads/2025/09/Cisco-01-150x150.png` | (empty) | Partner logo |
| `/wp-content/uploads/2025/09/Microsoft-01-150x150.png` | (empty) | Partner logo |
| `/wp-content/uploads/2025/09/Amazon-Web-Services-AWS-1-1024x385.png` | (empty) | Partner logo |
| `/wp-content/uploads/2025/09/Ibrahima-Kourouma-Afronovation.jpeg` | (empty) | Team headshot |
| `/wp-content/uploads/2025/09/Screenshot-2025-09-10-192533.png` | (empty) | Adrienne headshot |
| `/wp-content/uploads/2025/09/Screenshot-2025-09-10-194855.png` | (empty) | Justin headshot |
| `/wp-content/uploads/2025/09/afronovation.-750x150-1-e1757554780133.png` | (empty) | Footer logo |

All homepage images have **empty alt attributes** - an accessibility and SEO gap. No video or map embeds.

### 2.2 About - `https://afronovation.com/about/`

- **Title tag:** `About - afronovation, Inc.`
- **Meta description:** `Who We Are? We provide digital solutions that transform strategy into measurable impact. About Us...` (auto-generated)

**Heading hierarchy (in document order):**

| Level | Text |
|---|---|
| H4 | Who We Are? |
| H1 | We provide digital solutions that transform strategy into measurable impact. |
| H2 | About Us. |
| H4 | program & change management. |
| H4 | Technology & platform development. |
| H4 | digital transformation. |
| H5 | Partner / from Strategy to adoption |
| H2 | Ibrahima kourouma |
| H5 | Partner / marketing officer |
| H2 | adrienne boykin |
| H5 | Partner / operations officer |
| H2 | Justin fawson |
| H6 | This Is Our |
| H2 | Visionary Team. |
| H2 | Don't Be Shy, Say Hello. |

**Body copy (verbatim):**

- Intro: `We provide digital solutions that transform strategy into measurable impact and help businesses and governments drive growth through program management, digital transformation, and innovative technology solutions.`
- Program & change management: `Afronovation helps organizations deliver complex initiatives with confidence through program management and organizational change consulting. Our experts apply Agile, PROSCI, and PMI best practices to ensure projects stay on track, risks are managed, and people embrace change. We turn strategy into action by aligning stakeholders, streamlining processes, and achieving sustainable results.` Key services listed: program management consulting; organizational change management; Agile project delivery; business transformation leadership.
- Technology & platform development: `We design and build scalable, secure, and user-centric platforms that enable organizations to grow and innovate. From custom web and mobile apps to SaaS and enterprise solutions, Afronovation blends modern technology with intuitive design to deliver seamless digital experiences. Our team ensures that every solution is future-ready, integrated, and built for long-term success.` Key services listed: technology consulting; SaaS platform development; custom app development; enterprise software solutions; UI/UX design services.
- Digital transformation: `Afronovation partners with businesses and governments to lead their digital transformation journey. We help modernize operations, optimize processes, and unlock value through cloud migration, data analytics, and IT modernization. By reimagining workflows and customer engagement, we empower organizations to thrive in the digital economy and achieve measurable growth.` Key services listed: digital transformation consulting; cloud migration services; IT modernization; government digitalization; business process reengineering.
- Visionary Team: `Our visionary team combines strategy, technology, and change expertise to deliver innovative solutions that drive growth, empower organizations, and create lasting impact.`

**CTAs and links:**

| Link text | Target |
|---|---|
| more. | `https://www.linkedin.com/in/ikourouma/` |
| more. | `#` (Adrienne placeholder) |
| more. | `https://www.linkedin.com/in/justinfawson/` |
| get in touch | `#` (placeholder) |
| contact us. | `/contact/` |
| Footer LinkedIn icon | `href=""` (empty, not configured) |

**Images on About page:** header logo, the three team headshots (same files as homepage), six unnamed stock photos under "Visionary Team" (`team-member-03.jpg` through `team-member-08.jpg`, each 320x352), footer logo. All alt attributes empty.

### 2.3 Services - `https://afronovation.com/services/`

- **Title tag:** `Services - afronovation, Inc.`
- **Meta description:** `What We Do? we provide digital solutions That transform strategy into impact. Capabilities...` (auto-generated)

**Heading hierarchy (in document order):**

| Level | Text |
|---|---|
| H4 | What We Do? |
| H1 | we provide digital solutions That transform strategy into impact. |
| H2 | Capabilities. |
| H4 | program & change management. |
| H4 | technology & platform development. |
| H4 | digital transformation. |
| H6 | Our Services. |
| H2 | This Is How We Can Help You. |
| H2 | our services. |
| H2 | Don't Be Shy, Say Hello. |

**Body copy:**

- The three capability blocks repeat the About page copy (see Section 2.2).
- "This Is How We Can Help You" list (15 items, wording differs slightly from homepage): program Management; change management; agile project delivery; business transformation; strategic planning; technology consulting; SaaS platform development; custom app development; enterprise software; UI/UX design services; digital transformation; cloud migration services; IT modernization; government digitalization; business process reengineering.
- "our services" summary: `We provide digital solutions that transform strategy into measurable impact.`
  - program & change management: program management consulting; organizational change management; Agile project delivery; business transformation leadership.
  - technology & platform development: technology consulting; SaaS platform development; custom app development; enterprise software solutions; UI/UX design services.
  - Digital Transformation: digital transformation consulting; cloud migration services; IT modernization; government digitalization; business process reengineering.

**CTAs:** `view projects.` -> `/projects/` (broken target), `contact us.` -> `/contact/`.

**Images:** header and footer logos only.

### 2.4 Projects - `https://afronovation.com/projects/` (BROKEN)

**Critical finding:** the rendered page is the **Hostinger default landing page**, not the intended Afronovation projects page.

Rendered content:

| Element | Value |
|---|---|
| Title tag | `Default page` |
| H1 | You Are All Set to Go! |
| Body | All you have to do now is upload your website files and start your journey. Check out how to do that below: |
| Links | Hostinger help articles: "How can I migrate a website to Hostinger?" / "How to install WordPress using Auto Installer?" |

**Intended content (recovered via WP REST API, `/wp-json/wp/v2/pages/33`):**

- H4: `What We Did?`
- H1: `We Take Great Pride In Our Work.`
- H2: `Innovative Work`
- H4: `Driving Change. Delivering Impact.`
- Body: `Our work reflects Afronovation's commitment to turning bold strategies into measurable outcomes. From guiding global organizations through complex transformations to building scalable digital platforms, we help our partners achieve sustainable growth and long-term success. Every project we deliver demonstrates our expertise in change management, digital innovation, and technology solutions tailored to real-world challenges.`
- CTA: `Don't Be Shy, Say Hello.?` with button `contact us.` -> `/Contact/` (note capital C - inconsistent slug casing).
- Portfolio images referenced: `portfolio-image-05`, `portfolio-image-07`, `portfolio-image-09`, `portfolio-image-10`, `portfolio-image-06`, `portfolio-image-11`, `portfolio-image-08` (some repeated).

**Conclusion:** the projects page is effectively down. The portfolio grid contains no project titles, categories, descriptions, or case-study links - only stock imagery.

### 2.5 Testimonials - `https://afronovation.com/testimonials/`

- **Title tag:** `Testimonials - afronovation, Inc.`
- **Meta description:** `What They Say? We Build Valuable & Meaningful Experiences. Testimonials. Why Our Clients Love Us...` (auto-generated)

**Heading hierarchy (in document order):**

| Level | Text |
|---|---|
| H4 | What They Say? |
| H1 | We Build Valuable & Meaningful Experiences. |
| H6 | Testimonials. |
| H2 | Why Our Clients Love Us. |
| H5 | CEO Of Globex |
| H2 | John Oliver |
| H5 | CFO Of Initech |
| H2 | Mark Fowler |
| H5 | CEO Of Globex |
| H2 | Wayne Richardson |
| H6 | partners & Clients. |
| H2 | Forward Thinking partners & Clients. |
| H2 | Don't Be Shy, Say Hello. |

**Body copy (verbatim):**

`At Afronovation, our mission is to empower organizations to thrive in the digital age. But don't just take our word for it—our clients' success stories speak for themselves. We're proud to partner with leaders who are not only rei-magining the future but also achieving measurable results through our expertise in digital transformation, strategic program management, and innovative technology solutions.`

Note the hyphenation artifact "rei-magining" (should be "reimagining").

**CTAs:** `contact us.` -> `/contact/`.

**Images:** partner/client logos - Oracle, Cisco, Microsoft, AWS, Zensar, African Development Bank, African Union, Smart Africa - plus header/footer logos. No testimonial author photos.

### 2.6 Contact - `https://afronovation.com/contact/`

- **Title tag:** `Contact - afronovation, Inc.`
- **Meta description:** `Where We Are? Don't Be Shy, Say Hello. Contact Us. Want to get in touch?...` (auto-generated)

**Heading hierarchy (in document order):**

| Level | Text |
|---|---|
| H4 | Where We Are? |
| H1 | Don't Be Shy, Say Hello. |
| H2 | Contact Us. |
| H2 | Follow us. |
| H2 | Don't Be Shy, Say Hello. |

**Body copy (verbatim):**

`Want to get in touch? We'd love to hear from you. Here's how you can reach us.` followed by the address `127 Long Shadow Ln., Cary, NC 27518`, email `hello@afronovation.com`, and phone `1-844-664-4247`.

**Links:** the "Follow us." section contains **page-sharing** buttons (Facebook, Twitter/X, Pinterest, LinkedIn, YouTube) - these share the page URL; they are not links to company social profiles. The footer LinkedIn icon remains `href=""`. Two Facebook entries appear in the share row (duplication defect).

**Images:** header and footer logos only. **No map embed** - the "Where We Are?" section is a text/icon list only.

**Form:** full specification in Section 6.

---

## 3. Team Profiles

| | Ibrahima Kourouma | Adrienne Boykin | Justin Fawson |
|---|---|---|---|
| **Homepage title** | managing Partner - Strategy & transformation | marketing & communications | operations & government relations |
| **About page title** | Partner / from Strategy to adoption | Partner / marketing officer | Partner / operations officer |
| **Bio (verbatim)** | "Ibrahima kourouma is a proven leader in digital transformation and change management, with experience at the African Development Bank (AfDB), Cisco Systems, and government agencies. known for leading change from strategy to adoption, he specializes in driving innovation, leading large-scale programs, and turning strategy into impact." | "Adrienne Boykin is a seasoned Marketing and Communications Officer with 20+ years of expertise in digital media, brand storytelling, and strategic content creation. She specializes in social media campaigns, video production, and live event management, helping organizations engage audiences, strengthen brand visibility, and drive measurable impact." (double period in source) | "Justin Fawson is a versatile executive and entrepreneur who builds and grows businesses by focusing on people, innovative solutions, and strong relationships. A servant leader, military veteran, and former House Representative, he has a proven record of success in operations, strategy, and business development across diverse sectors." |
| **Credentials line** | PMP, PROSCI, CSM, Agile Coach, SAFe, CISM (About page only) | - | - |
| **Headshot URL** | `/wp-content/uploads/2025/09/Ibrahima-Kourouma-Afronovation.jpeg` (597x668) | `/wp-content/uploads/2025/09/Screenshot-2025-09-10-192533.png` (269x355) | `/wp-content/uploads/2025/09/Screenshot-2025-09-10-194855.png` (389x375) |
| **Alternate headshot** | `/wp-content/uploads/2025/09/Favorite-Aragon-Headshot-Ibrahima-Kourouma-2025-09-10-14-e1757545215420.jpeg` (627x702) | `/wp-content/uploads/2025/09/Screenshot-2025-09-10-192436.png` (273x367, unconfirmed) | `/wp-content/uploads/2025/09/Screenshot-2025-09-10-192931.png` (529x651) |
| **"more." link** | linkedin.com/in/ikourouma/ | `#` placeholder (no link) | linkedin.com/in/justinfawson/ |

Additional team findings:

- Name is rendered as "justing fawson" on the homepage (typo) and "Justin fawson" (lowercase surname) on the About page.
- There are **no individual team profile pages**; "more." links go to LinkedIn or nowhere.
- The "Visionary Team" section on About uses six unnamed stock photos (`team-member-03` through `team-member-08`) with no names or captions - these should not be confused with real staff.
- One screenshot asset (`Screenshot-2025-09-10-192300.png`, 271x387) is unattributed; likely another portrait candidate. Stakeholder confirmation needed before use.

---

## 4. Projects

### 4.1 Live state

`/projects/` returns HTTP 200 while displaying Hostinger's default page ("You Are All Set to Go!"). To a visitor, the page is indistinguishable from an unfinished hosting setup.

### 4.2 Intended content (from the WordPress database via REST API)

Recovered copy is documented in Section 2.4. It consists of an intro paragraph under the heading "We Take Great Pride In Our Work." and the sub-section "Innovative Work / Driving Change. Delivering Impact." with a grid of 7-9 stock portfolio images (`portfolio-image-05` through `portfolio-image-11`, each 550px wide, varying heights).

### 4.3 Homepage "Latest Work"

Four stock images (`portfolio-image-05/06/07/08-free-img.jpg`) are displayed in a grid with no captions, titles, categories, or links.

### 4.4 Conclusion

There is **no real project content** anywhere: no named engagements, no case studies, no outcomes, no client attribution. All portfolio imagery is stock material from the WordPress theme demo. The rebuild treats projects as structured placeholder entries ("Selected engagements") until stakeholders supply real case studies.

---

## 5. Testimonials

| Quote (verbatim) | Author | Role / Company | Photo |
|---|---|---|---|
| "Afronovation's expertise in digital transformation was instrumental in modernizing our operations. They provided a clear roadmap and seamless execution, turning a complex challenge into a successful and measurable outcome." | John Oliver | CEO Of Globex | None |
| "We chose Afronovation for their deep understanding of change management. Their team guided us through a major transition with professionalism and a focus on our people, ensuring widespread adoption and lasting success." | Mark Fowler | CFO Of Initech | None |
| "Afronovation delivered a cutting-edge technology platform that was perfectly tailored to our needs. Their blend of strategic insight and technical excellence is a powerful combination that truly inspires possibilities." | Wayne Richardson | CEO Of Globex | None |

**Defect:** "CEO Of Globex" is attributed to two different names (John Oliver and Wayne Richardson). "Globex" and "Initech" are fictional company names from the WordPress theme demo - stakeholders must confirm whether these testimonials are real, anonymized, or placeholders before they are carried into the rebuild.

---

## 6. Contact Details & Lead Form

### 6.1 Contact details (consistent across site)

- **Address:** 127 Long Shadow Ln., Cary, NC 27518
- **Email:** hello@afronovation.com
- **Phone:** 1-844-664-4247

### 6.2 Form implementation (current)

- **Plugin:** SureForms 2.8.0 (WordPress)
- **Form title:** "Lead Generation Form for Afronovation" (ID 2617)
- **Method:** POST to the current page; hidden fields `form-id`, `srfm-sender-email-field`, `srfm-page-break`.

### 6.3 Field specification

| Field | Type | Label | Help text | Required |
|---|---|---|---|---|
| Full Name | text | Full Name | "Please enter your full name as it appears on official documents." | Yes |
| Email Address | email | Email Address | "Enter a valid email address where we can reach you." | Yes |
| Phone Number | tel | Phone Number | "Provide a contact number so we can reach you." | Yes |
| Company Name | text | Company Name | "Enter the name of your company or organization." | No |
| Interests | radio group | Interests | "Select your areas of interest." | Yes |
| Preferred Contact Method | dropdown | Preferred Contact Method | "How would you like us to contact you?" | Yes |
| Message | textarea | Message | "Let us know how we can assist you." | No |
| Consent for Contact | checkbox | Consent for Contact | "Please confirm that you consent to receive communications from us." | Yes |

**Interests options:** Program & Change Management; SaaS & Platform Development; Digital Transformation; Government Digitaization *(typo in source: missing the second "l" - should be "Digitalization")*.

**Preferred Contact Method options:** Email; Phone; Text Message.

**No map embed, no CAPTCHA observed.** Spam protection status of the current form is unknown.

---

## 7. Media / Asset Inventory

All 81 media items in the WordPress library (enumerated via `/wp-json/wp/v2/media`). All URLs are relative to `https://afronovation.com`. Items marked **[migrate]** are referenced by live pages or needed for the rebuild; items marked **[skip]** are unused stock/demo material or redundant resized variants.

### 7.1 Brand, team, and partner assets (primary migration candidates)

| File (under `/wp-content/uploads/`) | Dimensions | Format | Disposition |
|---|---|---|---|
| `2025/09/afronovation-high-resolution-logo-transparent.png` | 2000x391 | PNG | [migrate] master logo |
| `2025/09/afronovation-high-resolution-logo-transparent-300x59.png` | 300x59 | PNG | [skip] resized variant of master |
| `2025/09/afronovation.-750x150-1-e1757554780133.png` | 500x100 | PNG | [migrate] footer logo |
| `2025/09/afronovation-high-resolution-logo-grayscale-e1757445188365.png` | 800x800 | PNG | [migrate] grayscale logo |
| `2025/09/layout-circle-icon-color-transparent.png` | 800x800 | PNG | [migrate] icon mark |
| `2025/09/cropped-layout-circle-icon-color-transparent.png` | 512x512 | PNG | [skip] duplicate of icon mark |
| `2023/03/cropped-Favicon-free-img.png` | 512x512 | PNG | [skip] theme demo favicon |
| `2023/03/cropped-cropped-Favicon-free-img.png` | 512x512 | PNG | [skip] theme demo favicon |
| `2025/09/Ibrahima-Kourouma-Afronovation.jpeg` | 597x668 | JPEG | [migrate] headshot - Ibrahima |
| `2025/09/Favorite-Aragon-Headshot-Ibrahima-Kourouma-2025-09-10-14-e1757545215420.jpeg` | 627x702 | JPEG | [migrate] alternate headshot - Ibrahima |
| `2025/09/Screenshot-2025-09-10-192533.png` | 269x355 | PNG | [migrate] headshot - Adrienne |
| `2025/09/Screenshot-2025-09-10-194855.png` | 389x375 | PNG | [migrate] headshot - Justin |
| `2025/09/Screenshot-2025-09-10-192931.png` | 529x651 | PNG | [migrate] alternate headshot - Justin |
| `2025/09/Screenshot-2025-09-10-192436.png` | 273x367 | PNG | [migrate] portrait - attribution unconfirmed |
| `2025/09/Screenshot-2025-09-10-192300.png` | 271x387 | PNG | [migrate] portrait - attribution unconfirmed |
| `2025/09/Oracle-01.png` | 512x512 | PNG | [migrate] partner logo |
| `2025/09/Cisco-01.png` | 512x512 | PNG | [migrate] partner logo |
| `2025/09/Microsoft-01.png` | 512x512 | PNG | [migrate] partner logo |
| `2025/09/Amazon-Web-Services-AWS-1.png` | 2000x752 | PNG | [migrate] partner logo (oversized for display) |
| `2025/09/Amazon-Webservices-01.png` | 512x512 | PNG | [migrate] partner logo variant |
| `2025/09/Amazon-Web-Services-AWS.png` | 2400x1600 | PNG | [skip] unused oversized variant |
| `2025/09/African-Development-Bank-Group.png` | 1200x620 | PNG | [migrate] partner logo |
| `2025/09/African-Development-Bank-Group-1.png` | 1200x620 | PNG | [skip] duplicate |
| `2025/09/african-development-bank-logo-06.png` | 1001x1000 | PNG | [migrate] AfDB logo variant |
| `2025/09/african-union.png` | 1218x414 | PNG | [migrate] partner logo |
| `2025/09/Smart-Africa.png` | 670x328 | PNG | [migrate] partner logo |
| `2025/09/Zensar-New-Logo-scaled.png` | 2560x1440 | PNG | [migrate] partner logo (oversized) |
| `2025/09/67dbe7e79392d-Zensar.png` | 960x960 | PNG | [skip] duplicate Zensar variant |
| `2025/09/Presidence-Guinea-1.png` | 225x225 | PNG | [migrate] partner/client logo |

### 7.2 Portfolio and hero imagery

| File | Dimensions | Format | Disposition |
|---|---|---|---|
| `2023/03/portfolio-image-05-free-img.jpg` | 550x400 | JPEG | [migrate] placeholder project imagery |
| `2023/03/portfolio-image-06-free-img.jpg` | 550x630 | JPEG | [migrate] placeholder project imagery |
| `2023/03/portfolio-image-07-free-img.jpg` | 550x400 | JPEG | [migrate] placeholder project imagery |
| `2023/03/portfolio-image-08-free-img.jpg` | 550x470 | JPEG | [migrate] placeholder project imagery |
| `2023/03/portfolio-image-09-free-img.jpg` | 550x530 | JPEG | [migrate] placeholder project imagery |
| `2023/03/portfolio-image-10-free-img.jpg` | 550x720 | JPEG | [migrate] placeholder project imagery |
| `2023/03/portfolio-image-11-free-img.jpg` | 550x421 | JPEG | [migrate] placeholder project imagery |
| `2023/03/hero-bg.jpg` | 1920x1080 | JPEG | [migrate] hero background candidate |
| `2023/03/interior-header-image.jpg` | 1920x500 | JPEG | [migrate] interior page header candidate |
| `2023/03/testimonial-image-free-img.jpg` | 1920x1178 | JPEG | [migrate] testimonial section background candidate |

### 7.3 Resized duplicates (skip - regenerable from originals)

`2025/09/testimonial-image-free-img-1024x628-1.jpg` (1024x628), `2025/09/testimonial-image-free-img-300x184-1.jpg` (300x184), `2025/09/testimonial-image-free-img-150x150-1.jpg` (150x150), `2025/09/hero-bg-1024x576-1.jpg` (1024x576), `2025/09/hero-bg-300x169-1.jpg` (300x169), `2025/09/hero-bg-150x150-1.jpg` (150x150), `2025/09/interior-header-image-1024x267-1.jpg` (1024x267), `2025/09/interior-header-image-300x78-1.jpg` (300x78), `2025/09/interior-header-image-150x150-1.jpg` (150x150), `2025/09/Oracle-01-150x150.png`, `2025/09/Cisco-01-150x150.png`, `2025/09/Microsoft-01-150x150.png` (implied variants), `2025/09/Amazon-Web-Services-AWS-1-1024x385.png` (1024x385), `2023/03/logo-white-free-img.png` (142x26), `2023/03/logo-white-@2x-free-img.png` (316x58), `2023/03/logo-black-free-img.png` (158x29), `2025/09/default.png` (48x64), `2025/09/afronovation-high-resolution-logo-transparent-300x59.png` (300x59).

### 7.4 Unused stock/demo imagery (skip)

- Nature/still-life demos: `2025/09/mountains-02.jpg`, `2025/09/snow-mountains-02.jpg`, `2025/09/desserts-02.jpg`, `2025/09/natures-01.jpg`, `2025/09/natures-02.jpg`
- Stock team photos: `2023/03/team-member-01.jpg` and `team-member-02.jpg` (530x530); `team-member-03.jpg` through `team-member-08.jpg` (320x352 each)
- Generic stock customer logos: `2023/03/customer-logo-1.png` through `customer-logo-8.png` (254x253 each) and their `2025/09/customer-logo-*-150x150-1.png` resized copies
- Misc demo: `2024/01/demo-screenshot.jpg` (1200x740)

**Totals:** 81 media items, all images. Approximately 30 assets are migration candidates; the remainder are resized duplicates or unused demo material.

---

## 8. Technical Platform Findings

### 8.1 Detected stack

| Component | Evidence | Version / Notes |
|---|---|---|
| CMS | `<meta name="generator" content="WordPress 7.0.2" />` | "7.0.2" is not a standard public WordPress release label; likely a Hostinger-managed/customized build label |
| Theme | `astra-theme-css-css`, `astra-theme-js-js` asset handles | Astra 4.13.4 |
| Block/page builder | `uagb-*` and `uag-style-*` assets | Ultimate Addons for Gutenberg (Spectra) 2.20.0 |
| Forms | `srfm-*` assets, `sureforms_form` post type | SureForms 2.8.0 |
| SEO | HTML comments/meta | All in One SEO (AIOSEO) 4.9.7.2 |
| Analytics | script fingerprints | Site Kit by Google 1.181.0 |
| Hosting plugin | `hostinger-reach-subscription-block` | Hostinger Reach |
| Custom post types | REST API | `spectra-popup` (popups), `sureforms_form` (forms) |
| PHP | `X-Powered-By: PHP/8.2.30` | PHP 8.2.30 |
| Web server | `Server: LiteSpeed` | LiteSpeed (with page cache - `X-LiteSpeed-Cache: hit`) |
| Hosting panel | `platform: hostinger`, `panel: hpanel` response headers | Hostinger hPanel |

### 8.2 Response headers (homepage, verbatim)

```text
HTTP/1.1 200 OK
Connection: Keep-Alive
Keep-Alive: timeout=5, max=100
X-Powered-By: PHP/8.2.30
Content-Type: text/html; charset=UTF-8
Permissions-Policy: private-state-token-redemption=(self "https://www.google.com" ...), private-state-token-issuance=(self "https://www.google.com" ...)
Link: <https://afronovation.com/wp-json/>; rel="https://api.w.org/"
Link: <https://afronovation.com/wp-json/wp/v2/pages/28>; rel="alternate"; title="JSON"; type="application/json"
Link: <https://afronovation.com/>; rel=shortlink
Cache-Control: public, max-age=604800
Expires: Sun, 02 Aug 2026 17:12:49 GMT
Etag: "221-1785085969;;;"
X-LiteSpeed-Cache: hit
Server: LiteSpeed
platform: hostinger
panel: hpanel
Content-Security-Policy: upgrade-insecure-requests
alt-svc: h3=":443"; ma=2592000
```

### 8.3 Security headers - presence matrix

| Header | Homepage / content pages | Notes |
|---|---|---|
| Strict-Transport-Security | **Missing** | HSTS not enabled anywhere |
| Content-Security-Policy | Present (minimal) | `upgrade-insecure-requests` only - no source restrictions |
| X-Frame-Options | **Missing** | Present only on `wp-login.php` (SAMEORIGIN) |
| X-Content-Type-Options | **Missing** | Present only on `/wp-json/` (nosniff) |
| Referrer-Policy | **Missing** | Present only on `wp-login.php` (strict-origin-when-cross-origin) |
| Permissions-Policy | Present | Scoped to Google private-state-token features only |

### 8.4 Endpoint probe results (GET/HEAD only)

| Endpoint | Status | Finding |
|---|---|---|
| `/wp-json/` | 200 | REST API fully public |
| `/wp-json/wp/v2/users` | 200, `X-WP-Total: 1` | **User enumeration** - exposes admin identity |
| `/?author=1` | 301 -> `/author/ikouroumagmail-com/` | **Author enumeration** - login slug derived from an email address |
| `/xmlrpc.php` | 405 on HEAD (POST allowed) | XML-RPC enabled - brute-force/pingback surface |
| `/wp-login.php` | 200 | Login page publicly accessible |
| `/wp-admin/` | 302 -> `wp-login.php` | Standard |
| `/readme.html` | 200 | **WordPress readme publicly exposed** |

### 8.5 Hosting and DNS

- IPv4: `193.42.137.207`; IPv6: `2a02:4780:1:1055:0:281d:fb4a:2`
- Platform headers confirm Hostinger (hPanel, LiteSpeed).
- `http://afronovation.com/` correctly 301-redirects to HTTPS.
- No CDN in front of the origin; all assets are served from `afronovation.com` directly.

---

## 9. Security Observations

| # | Severity | Observation |
|---|---|---|
| S1 | High | User enumeration via `/wp-json/wp/v2/users` (200 OK, total of 1 user) exposes the administrator identity tied to an email-derived slug (`ikouroumagmail-com`) |
| S2 | High | Author enumeration via `/?author=1` redirects to the same admin slug - trivially confirms a valid login username |
| S3 | Medium | XML-RPC (`xmlrpc.php`) accepts POST - enables amplified brute-force (system.multicall) and pingback abuse |
| S4 | Medium | `/readme.html` publicly accessible - discloses platform details; combined with the generator meta tag, aids version fingerprinting |
| S5 | Medium | Missing HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy on all public pages - clickjacking, MIME-sniffing, and downgrade exposure |
| S6 | Medium | `wp-login.php` exposed with no evidence of rate limiting, 2FA, or WAF protection; combined with S1/S2, brute-force risk is elevated |
| S7 | Low | Default "Hello World" post and RSS/comment feeds still published - information clutter, minor attack-surface noise |
| S8 | Low | Footer LinkedIn icon has an empty `href` - misconfiguration; empty links can be abused in some phishing/defacement scenarios and hurt credibility |
| S9 | Low | No privacy policy, cookie policy, or terms pages - compliance gap for a lead-capture business site that collects name, email, and phone with a consent checkbox |
| S10 | Informational | The odd "WordPress 7.0.2" generator string suggests a managed/patched Hostinger build; patch provenance could not be verified from the outside |

Positive notes: HTTPS is enforced with a proper 301 redirect; HTTP/3 is advertised via `alt-svc`; the permissions-policy header shows at least partial header management; PHP 8.2 is a currently supported runtime.

---

## 10. Scalability & Performance Observations

| # | Category | Observation |
|---|---|---|
| P1 | Asset weight | Homepage loads ~20 stylesheet/script resources; the contact page loads ~42 (SureForms pulls in intl-tel-input, tom-select, and per-block styles). Every additional plugin multiplies render-blocking requests. |
| P2 | Oversized images | A 2000x752 AWS logo renders as a small partner badge; a 2560x1440 Zensar logo displays at ~118px; a 1001x1000 AfDB logo displays at 150px; the 2000x391 master logo serves where a 300px version exists. Visitors download far more bytes than the layout needs. |
| P3 | Misconfigured srcset | Several builder images repeat the same full-size URL for every `srcset` candidate instead of true responsive sizes, defeating responsive loading. |
| P4 | Large raster heroes | `hero-bg.jpg` (1920x1080) and `testimonial-image-free-img.jpg` (1920x1178) are heavy JPEGs with no modern-format (WebP/AVIF) variants. |
| P5 | No CDN | All media and assets are served from the single Hostinger origin. Geographic latency and origin load grow directly with traffic; there is no edge caching layer. |
| P6 | Caching | Page cache is active (`X-LiteSpeed-Cache: hit`, `Cache-Control: public, max-age=604800`). Static assets lack long-lived immutable caching with content hashing, so cache-busting relies on query strings. |
| P7 | Vertical scaling only | Shared/managed LiteSpeed hosting scales by upgrading the plan, not horizontally. Traffic spikes (e.g., a campaign launch) have no autoscaling path. |
| P8 | Plugin coupling | Core site features (forms, popups, blocks, SEO) depend on 5+ third-party plugins; each is an independent update/break/security cycle that scales poorly with maintenance time. |
| P9 | Accessibility/SEO drag | Empty alt attributes site-wide, auto-generated meta descriptions, and inconsistent heading hierarchies reduce organic reach and add remediation work later. |

## 11. Duplication Observations

| # | Duplicated element | Where it repeats |
|---|---|---|
| D1 | Global header, navigation, footer | Every page (expected, but hand-maintained per page in the builder) |
| D2 | "Don't Be Shy, Say Hello." CTA section | All 6 pages |
| D3 | Capability descriptions (3 practice areas) | Home, About, and Services - near-verbatim |
| D4 | Team bios (Ibrahima, Adrienne, Justin) | Home and About |
| D5 | Partner/client logo wall | Home and Testimonials |
| D6 | Portfolio stock images | Homepage "Latest Work" overlaps the (broken) Projects page grid |
| D7 | Contact details block | Homepage hero, Contact page, and CTA sections |
| D8 | Inline SVG icons (arrows, social, checkbox) | Repeated inline in the HTML rather than referenced as symbols |
| D9 | "Follow us." share row | Two Facebook entries on the Contact page |
| D10 | Service lists | Homepage and Services page each carry a 15-item list with divergent wording - the two lists have already drifted out of sync |

Duplication has already caused consistency defects (D9, D10, and the divergent team-member titles between Home and About). This is the strongest structural argument for the rebuild's single-source content model.

---

## 12. Implications for the Rebuild (descriptive)

These observations inform the rebuild plan documented in `knowledgebase.md` and `backlog.md`; this report prescribes no code.

1. **Content reuse:** Sections 2-6 contain every string of verified copy needed for the rebuild's typed content module - no re-writing from scratch is required.
2. **Media migration:** Section 7.1-7.2 identifies ~30 assets to move to Cloudflare R2; the rest of the library is safe to leave behind.
3. **Projects as placeholders:** Since no real case studies exist (Section 4), the rebuild ships a placeholder-driven Projects system (mega-menu panel, index, and detail template) that stakeholders fill in later.
4. **Security baseline:** The rebuild must deliver what the current platform lacks - full security headers, no user-enumeration surface, no XML-RPC equivalent, form spam protection, and privacy/terms pages (Section 9).
5. **Performance budget:** Oversized-image and no-CDN findings (Section 10) set the rebuild's rules: responsive `next/image`, modern formats, R2-backed media delivery, and a strict per-page asset budget.
6. **Single source of truth:** The duplication register (Section 11) maps directly to shared components/content definitions so each repeated element is defined exactly once.
7. **Open stakeholder questions** are consolidated in `knowledgebase.md` (typos, testimonial authenticity, Adrienne's missing LinkedIn URL, unattributed portraits, legal pages).

---

*End of audit report. Companion documents: `knowledgebase.md` (project brain), `backlog.md` (execution plan), `docs/rebuild-guide.md` (operator runbook).*
