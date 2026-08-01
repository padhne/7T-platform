/**
 * ─────────────────────────────────────────────────────────────
 *  UNIFORM COLLECTIONS DATA
 *  Edit this file to update any section without touching UI code.
 *
 *  Each category has:
 *    id       — unique key used internally
 *    label    — short tab label shown in the tab bar
 *    heading  — large bold heading displayed in the section
 *    items[]  — list of uniform product cards
 *              · title  : card heading (all-caps recommended)
 *              · desc   : short description shown on the card
 *              · img    : path relative to /public  (e.g. /images/xxx.png)
 * ─────────────────────────────────────────────────────────────
 */

export type UniformItem = {
  title: string;
  desc: string;
  img: string;
};

export type UniformCategory = {
  id: string;
  label: string;
  heading: string;
  items: UniformItem[];
};

export const uniformCategories: UniformCategory[] = [
  // ── CORPORATE ───────────────────────────────────────────────
  {
    id: 'corporate',
    label: 'Corporate',
    heading: 'CORPORATE UNIFORMS COLLECTION',
    items: [
      { title: 'T-SHIRTS', desc: 'One of the most basic and versatile corporate uniform staples.', img: '/images/school_shirt.png' },
      { title: 'FORMAL SHIRTS', desc: 'Business attire essentials for both men and women.', img: '/images/school_shirt.png' },
      { title: 'FORMAL PANTS', desc: 'An essential complement to any professional uniform.', img: '/images/school_pants.png' },
      { title: 'POLOS', desc: 'Collared t-shirts that convey simplistic style and elegance.', img: '/images/school_pants.png' },
      { title: 'JEANS', desc: 'Durable, characteristically strong denim options.', img: '/images/school_pants.png' },
      { title: 'CARGO PANTS', desc: 'Multiple pockets for all storage needs.', img: '/images/school_pants.png' },
      { title: 'SKIRTS', desc: 'A formal secondary option for women\'s business attire.', img: '/images/school_shirt.png' },
      { title: 'CAPS', desc: 'Matching or contrasting caps that complete a polo or t-shirt look.', img: '/images/hotel_front_desk.png' },
      { title: 'COATS/BLAZERS', desc: 'Custom company blazers and coats for a sharp, dapper finish.', img: '/images/school_blazer.png' },
      { title: 'WINTER JACKETS & HOODIES', desc: 'Stylish and comfortable for casual corporate needs in colder weather.', img: '/images/school_blazer.png' },
      { title: 'SUITS', desc: 'Best suited for supervisors, managers, or anyone in a position of authority.', img: '/images/school_blazer.png' },
      { title: 'TIES, SCARVES & BELTS', desc: 'Professional accessories with company branding available.', img: '/images/school_shirt.png' },
    ],
  },

  // ── INDUSTRIAL ──────────────────────────────────────────────
  {
    id: 'industrial',
    label: 'Industrial',
    heading: 'INDUSTRIAL UNIFORMS',
    items: [
      { title: 'COVERALLS', desc: 'The most common industrial work uniform worldwide.', img: '/images/hotel_front_desk.png' },
      { title: '2-PIECE COVERALLS', desc: 'A split shirt-and-pant variation of traditional coveralls.', img: '/images/hotel_front_desk.png' },
      { title: 'BIB OVERALLS', desc: 'Comfortable work gear built for long, tough working days.', img: '/images/chef_uniform.png' },
      { title: 'MULTIPOCKET VESTS', desc: 'Vests designed with multiple pockets for practicality.', img: '/images/chef_uniform.png' },
      { title: 'SECURITY UNIFORM – SHIRTS', desc: 'Long or short-sleeve shirts, customized for security personnel.', img: '/images/hotel_front_desk.png' },
      { title: 'SECURITY UNIFORM – PANTS', desc: 'Comfortable, durable, and functional pants for security staff.', img: '/images/school_pants.png' },
      { title: 'SECURITY UNIFORM – ACCESSORIES', desc: 'Caps, whistles, sleeve patches, security shoes/boots, and utility belts.', img: '/images/waiter_uniform.png' },
      { title: 'SAFETY COVERALLS', desc: 'Designed to protect personnel in harsher, more hazardous environments.', img: '/images/hotel_front_desk.png' },
      { title: 'SAFETY VESTS', desc: 'High-visibility vests with reflective tape for maximum visibility, especially in the dark.', img: '/images/waiter_uniform.png' },
      { title: 'SAFETY JACKETS', desc: 'High-visibility jackets with reflective tape.', img: '/images/waiter_uniform.png' },
      { title: 'SAFETY ACCESSORIES', desc: 'Safety caps, welder\'s gloves, safety shoes, and safety helmets.', img: '/images/waiter_uniform.png' },
      { title: 'WORKWEAR UNIFORM – JACKETS & PANTS', desc: 'Utility-focused sets used for mechanic, plumber, or car wash uniforms.', img: '/images/chef_uniform.png' },
      { title: 'WORKWEAR UNIFORM – SHIRT & PANTS', desc: 'Function-focused sets for drivers, cleaners, or office staff.', img: '/images/hotel_front_desk.png' },
    ],
  },

  // ── HOSPITALITY ─────────────────────────────────────────────
  {
    id: 'hospitality',
    label: 'Hospitality',
    heading: 'HOTEL, RESTAURANT & HOSPITALITY UNIFORMS',
    items: [
      { title: 'FRONT DESK UNIFORMS', desc: 'A receptionist uniform that carries a hotel\'s image, front and centre.', img: '/images/hotel_front_desk.png' },
      { title: 'HOUSEKEEPING UNIFORMS', desc: 'Durable uniforms built to face daily dust and wear.', img: '/images/hotel_front_desk.png' },
      { title: 'WAITER/WAITRESS UNIFORMS', desc: 'Casual or formal styles, with or without aprons.', img: '/images/waiter_uniform.png' },
      { title: 'CHEF UNIFORMS', desc: 'Chef jackets, hats, and trousers with customized aprons.', img: '/images/chef_uniform.png' },
      { title: 'LAUNDRY STAFF UNIFORMS', desc: 'Sturdy and highly resistant garments for demanding work.', img: '/images/hotel_front_desk.png' },
      { title: 'GUEST RELATIONS UNIFORMS', desc: 'Presentable, polished uniforms for front-facing PR roles.', img: '/images/waiter_uniform.png' },
      { title: 'POOL SIDE – BAR & WAITING STAFF', desc: 'Formal or casual uniforms, just like any waiting staff attire.', img: '/images/waiter_uniform.png' },
      { title: 'POOL SIDE – LIFEGUARD UNIFORMS', desc: 'A must-have for hotels with pools — durable and comfortable.', img: '/images/school_shirt.png' },
      { title: 'SPA UNIFORMS', desc: 'Spa tunics, trousers, and dresses.', img: '/images/chef_uniform.png' },
      { title: 'SALON UNIFORMS', desc: 'Salon tunics, trousers, and dresses.', img: '/images/chef_uniform.png' },
    ],
  },

  // ── SCHOOL ──────────────────────────────────────────────────
  {
    id: 'school',
    label: 'School',
    heading: 'SCHOOL UNIFORMS',
    items: [
      { title: 'SHIRTS', desc: 'Short or long-sleeve uniform shirts in solids, checks, and stripes.', img: '/images/school_shirt.png' },
      { title: 'PANTS', desc: 'High-quality, durable pants built to withstand heat and daily wear.', img: '/images/school_pants.png' },
      { title: 'SHORTS', desc: 'Durable shorts designed for active younger students.', img: '/images/school_pants.png' },
      { title: 'SKIRTS', desc: 'Made with attention to fabric, durability, and comfort.', img: '/images/school_shirt.png' },
      { title: 'POLOS', desc: 'Customizable collar and cuff design, tailored to school requirements.', img: '/images/school_pants.png' },
      { title: 'T-SHIRTS', desc: 'Short or long-sleeve, fully customized to school parameters.', img: '/images/school_shirt.png' },
      { title: 'TOPS', desc: 'Sleeveless dresses for younger girls, with box pleats and front pockets.', img: '/images/school_shirt.png' },
      { title: 'BLAZERS', desc: 'Solid or striped blazers with optional school emblem and custom piping in school colors.', img: '/images/school_blazer.png' },
      { title: 'SWEATERS', desc: 'Sleeveless or full-sleeve, with contrast details, V-neck or crew neck.', img: '/images/school_blazer.png' },
    ],
  },
];
