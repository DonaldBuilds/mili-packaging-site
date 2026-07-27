# PACKLY — B2B Custom Packaging Website Design Contract

> Canvas Designer: accio-site-builder:canvas-designer
> Date: 2026-07-25
> Site ID: packly

---

## Design Direction

**"Manufacturing Excellence meets Quiet Luxury"**

Grounded in `Gestura-Quiet-Atelier` system. Pivot from generic "factory website" to premium "packaging partner" aesthetic. Extreme negative space, ultra-lightweight serif typography, "Slow-Living" visual rhythm. Layout balances high-fidelity lifestyle unboxing photography with clinical, sharp-edged UI elements (0px radius) to signal precision manufacturing.

Avoid "AI-slop" (purple gradients, generic icons): disciplined monochrome palette with single metallic Gold/Copper accent, real factory/product imagery, dual-path IA (Ready-Made vs. Bespoke) inspired by ekubox.com.

---

## Reference Sources

- `vendor/open-design/adapter/STATIC_POLICY.md` — Static use boundaries
- `vendor/open-design/upstream/design-systems/Gestura-Quiet-Atelier/DESIGN.md` — Primary visual DNA
- `vendor/open-design/upstream/design-systems/Gestura-Quiet-Atelier/tokens.css` — Token baseline
- `vendor/open-design/upstream/craft/anti-ai-slop.md` — Quality gates
- **greetabl.com**: 3-step process and "Build a Box" flow logic
- **ekubox.com**: 3-tier product model and dual-row logo wall strategy
- **shopgiftgood.com**: Benefit pillars and sustainability badge placement
- **jxork.en.alibaba.com**: Product categories (Magnetic, Jewelry, Mailer) and factory-direct pricing cues

---

## Design Tokens

### Surface
- `--color-bg`: `#F9F7F2` (Cream base)
- `--color-surface-warm`: `rgb(222, 195, 157)` (Soft Sand for secondary sections)

### Foreground
- `--color-text-primary`: `#222222` (Dark Charcoal)
- `--color-text-muted`: `#8F8D8B` (Muted Slate for metadata)
- `--color-accent-gold`: `#B8860B` (Metallic Gold for CTAs and brand markers)

### Typography
- `--font-display`: `"Cormorant Garamond", "Source Han Serif SC", "Songti SC", serif` (Thin weight for H1/H2)
- `--font-body`: `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif`
- `--text-h1`: `100px` (Desktop) / `50px` (Mobile)
- `--weight-light`: `100` to `300` — Strictly no bolding below H3

### Layout
- `--radius-base`: `0px` — Perfectly sharp corners
- `--border-thin`: `1px solid #E8E8E8`
- `--section-gap`: `120px` (Desktop) / `60px` (Mobile)

---

## Page Structure

### 1. Home
- **Hero**: Split layout — High-res unboxing image left, headline "Packaging That Brands Deserve" right
- **Dual-Path Selector**: Two large tiles — "Browse Collections" vs "Request Custom Quote"
- **Logo Wall**: Dual-row "Trusted By" logos (0.5 opacity grayscale)
- **Collection Grid**: Large image tiles for Magnetic Boxes, Jewelry Boxes, Mailer Boxes, Gift Bags
- **Process Stepper**: 3-Step vertical (Consult → Design & Sample → Produce & Deliver)
- **Trust Pillars**: Eco-Friendly, Low MOQ 500pcs, Factory Direct, Free Design
- **Industry Solutions**: Cards for Cosmetics, Jewelry, Apparel, Food, Electronics
- **Testimonials**: Client quotes with company names
- **Bottom CTA**: "Start Your Project" inquiry trigger

### 2. Products (Catalog)
- Faceted sidebar: Material (Kraft, Rigid, Corrugated) and Closure (Magnetic, Flip-top, Drawer)
- Product cards: Sharp-edge image + product name in thin serif + "Inquire" CTA

### 3. Custom Solutions
- Full process: 6-step timeline
- Materials & Finishes showcase: Foil stamping, Embossing, UV coating, Matte lamination
- Free Sample Policy explainer
- Inline inquiry form

### 4. Industries
- Dedicated landing pages: Cosmetics, Jewelry, Apparel, Food & Beverage, Electronics
- Each: Industry pain point → PACKLY solution → Recommended box types → Case image

### 5. Portfolio
- Full-bleed case study gallery
- Filter by industry and box type

### 6. About
- Brand story + Factory strength (images, capacity data)
- Sustainability commitment
- Certifications

### 7. Contact / Get Quote
- Inquiry form: Name, Company, Email, Industry, Box Type, Estimated Qty, Brief, File Upload
- WhatsApp floating button (gold accent)

---

## Component Plan

| Component | Role |
|-----------|------|
| `hero-editorial` | Split high-contrast hero with serif H1 |
| `dual-path-selector` | Two tiles: "Browse Collections" vs "Custom Quote" |
| `process-stepper` | Thin-line vertical timeline, 3 steps |
| `logo-wall-dual` | Grayscale client logos, dual row |
| `product-card-flat` | Sharp-edge image + metadata sans-serif |
| `inquiry-sticky-cta` | Minimalist floating "Quick Quote" button in gold |
| `industry-solution-card` | Image + industry name + "Learn More" → internal link |

---

## Copy Tone

- **Voice**: Sophisticated, Precise, Partner-oriented — not "supplier", "collaborator"
- **Example phrases**: "Precision-engineered for the modern brand", "Your vision, manufactured with care", "Sustainable luxury, delivered globally"
- **Forbidden**: "Factory price", "Cheap packaging", "No. 1 supplier", "Best quality", "Click here"

---

## Responsive Rules

- **Mobile**: Single column, typography scales 50%, horizontal scroll for product categories
- **Tablet**: 2-column grids, maintained editorial spacing
- **Desktop**: Max-width 1440px, 120px section margins, full-bleed hero/portfolio

---

## Implementation Notes

- CSS Variables for all tokens
- "Invisible UI": avoid colored section backgrounds, use 1px dividers and whitespace
- Quick Quote multi-step form instead of complex 3D tool for Phase 1
- WhatsApp floating icon in `--color-accent-gold`

---

## Image Manifest

| Filename | Source | Usage |
|----------|--------|-------|
| `hero-unboxing.jpg` | `imageGenerate:Luxury magnetic gift box unboxing, soft natural lighting, hands opening a charcoal box with gold logo, bokeh background` | Hero section |
| `magnetic-boxes.jpg` | stock: Unsplash | Magnetic Boxes category |
| `jewelry-boxes.jpg` | stock: Unsplash | Jewelry Boxes category |
| `mailer-boxes.jpg` | `imageGenerate:Eco-friendly kraft paper mailer boxes stacked, minimalist aesthetic, sharp focus` | Mailer Boxes category |
| `factory-precision.jpg` | `imageGenerate:Close-up of high-end packaging machine in a clean modern factory, motion blur on gold stamping process` | About/Factory section |
| `placeholder.svg` | Local fallback | Any unrecoverable image |

---

## Risks / Open Questions

- Sample shipping cost: assumed buyer pays shipping
- Factory photos: if real photos unavailable, use AI-generated idealized factory shots (must disclose)
- Font licensing: `Cormorant Garamond` as free alternative to `Gestura Text`
