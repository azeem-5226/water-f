// Authentic client data from Water Filter Care (roservice.waterfiltercare.in)

export const clientInfo = {
  brandName: 'Water Filter Care',
  tagline: 'Trusted Water Purifier Service',
  phone: '+91 75378 72629',
  phoneClean: '+917537872629',
  whatsappUrl: 'https://wa.me/917537872629',
  startingPrice: '₹199/-',
  locations: 'Bhubaneswar, Cuttack & Jatni',
};

export const serviceList = [
  {
    id: 'ro-repair',
    title: 'RO Repair Service',
    price: '₹799',
    badge: 'Popular',
    icon: 'Wrench',
    image: '/images/services/ro-repair.jpg',
    tagline: 'Service charges just ₹199/-',
    description: 'Fix low water flow, leakage, unusual noise, bad taste, vibration, motor pump failure and auto-cutoff issues on the same day.',
    features: ['Leakage & Pipe Sealing', 'Motor Pump & SMPS Testing', 'Auto Cut-Off Calibration', 'Free TDS Water Check']
  },
  {
    id: 'ro-regular',
    title: 'RO Regular Service & Sanitization',
    price: '₹499',
    badge: 'Routine Care',
    icon: 'ShieldCheck',
    image: '/images/services/ro-maintenance.jpg',
    tagline: 'Deep tank & pipe cleaning',
    description: 'Complete cleaning, sanitization, checking, and preventive maintenance for better everyday drinking water quality.',
    features: ['Water Storage Tank Sanitizing', 'Pipe & Connectors Cleaning', 'UV Lamp Testing', 'Pressure Boost Calibration']
  },
  {
    id: 'ro-installation',
    title: 'RO Installation Service',
    price: '₹1,499',
    badge: 'Expert Setup',
    icon: 'Hammer',
    image: '/images/services/ro-installation.jpg',
    tagline: 'Clean doorstep installation',
    description: 'Professional water purifier installation for homes, apartments, villas, and commercial offices with leak-proof fittings.',
    features: ['Wall Mount Fixing', 'Inlet Valve & Diverter Setup', 'Drain Tube Regulation', 'Initial Flush & Water Audit']
  },
  {
    id: 'ro-uninstallation',
    title: 'RO Uninstallation & Shifting',
    price: '₹999',
    badge: 'Safe Relocation',
    icon: 'Layers',
    image: '/images/services/ro-shifting.jpg',
    tagline: 'Safe removal & refitting',
    description: 'Safe uninstallation and reinstallation when shifting to a new flat or house across Bhubaneswar, Cuttack & Jatni.',
    features: ['Safe Dismantling', 'Valve Sealing Without Leakage', 'Re-installation at New Place', 'TDS & Flow Verification']
  },
  {
    id: 'filter-replacement',
    title: 'Filter & Membrane Replacement',
    price: '₹999',
    badge: 'Genuine Spares',
    icon: 'Award',
    image: '/images/services/filter-replacement.jpg',
    tagline: '100% Original OEM parts',
    description: 'Replacement of sediment filters, carbon candles, RO membranes, and essential cartridges with authentic certified parts.',
    features: ['Genuine Spun Pre-Filter', 'Activated Carbon Cartridge', 'Original RO Membrane', 'Mineral Booster Cartridge']
  }
];

export const trustPoints = [
  { icon: 'Zap', title: 'Same Day Service', desc: 'Doorstep visit arranged in a few hours.' },
  { icon: 'Wrench', title: 'Expert Technicians', desc: 'Skilled, polite and background-verified.' },
  { icon: 'ShieldCheck', title: 'Genuine Spare Parts', desc: '100% original filters, candles & membranes.' },
  { icon: 'MapPin', title: 'Bhubaneswar, Cuttack & Jatni', desc: 'Fast doorstep coverage in all major localities.' }
];

export const whyChoosePoints = [
  'Skilled and experienced technicians',
  'Fast doorstep service on the same day',
  'Transparent service process with no hidden charges',
  'Support for major RO and water purifier brands',
  'Genuine filters and spare parts',
  'Active coverage in Bhubaneswar, Cuttack & Jatni',
  'Easy booking through Direct Call or WhatsApp'
];

export const purifierBrands = [
  { name: 'Kent RO' },
  { name: 'Aquaguard / Eureka Forbes' },
  { name: 'Pureit (HUL)' },
  { name: 'Livpure' },
  { name: 'Havells' },
  { name: 'AO Smith' },
  { name: 'LG Puricare' },
  { name: 'Blue Star' }
];

export const processSteps = [
  {
    step: '1',
    title: 'Call or WhatsApp Us',
    desc: 'Share your RO issue, name and location at +91 75378 72629. We confirm your booking instantly.'
  },
  {
    step: '2',
    title: 'Technician Visit',
    desc: 'Our skilled technician reaches your doorstep for on-site inspection and quick diagnosis.'
  },
  {
    step: '3',
    title: 'Clean & Safe Drinking Water',
    desc: 'Your purifier is repaired, serviced, or installed properly with a complimentary TDS check.'
  }
];

export const serviceAreas = [
  {
    city: 'Bhubaneswar',
    areas: 'Patia, Jaydev Vihar, Nayapalli, Saheed Nagar, Khandagiri, Chandrasekharpur, Old Town, Rasulgarh, Kalinga Nagar, Baramunda'
  },
  {
    city: 'Cuttack',
    areas: 'CDA Sectors 1-11, Badambadi, Link Road, Ranihat, Madhupatna, Buxi Bazaar, Jobra, Chauliaganj, Mangalabag'
  },
  {
    city: 'Jatni',
    areas: 'Jatni Main Market, Railway Colony, Retanga, Bachhara, Madanpur, Kudiary, Godiput Matiapada'
  }
];

export const testimonials = [
  {
    name: 'Amit Kumar',
    loc: '📍 Bhubaneswar',
    rating: 5,
    text: 'Quick response and professional technician. My RO was repaired on the same day. Highly recommended for everyone in Bhubaneswar.',
    initial: 'A'
  },
  {
    name: 'Priya Das',
    loc: '📍 Cuttack',
    rating: 5,
    text: 'Very polite service and clear explanation about the filter replacement. Affordable service charges and genuine parts.',
    initial: 'P'
  },
  {
    name: 'Sandeep Mishra',
    loc: '📍 Jatni',
    rating: 5,
    text: 'Booked through WhatsApp and the technician arrived quickly. Diagnosed the motor noise and fixed the leak without any delay.',
    initial: 'S'
  }
];

export const faqs = [
  {
    q: 'Do you provide same-day RO repair service?',
    a: 'Yes, we offer same-day RO repair service across Bhubaneswar, Cuttack and Jatni. Contact us early and we will arrange a technician visit at the earliest.'
  },
  {
    q: 'Which locations do you serve?',
    a: 'We provide doorstep RO water purifier service in Bhubaneswar, Cuttack and Jatni, covering major residential, apartment and commercial areas.'
  },
  {
    q: 'Do you repair all RO water purifier brands?',
    a: 'Yes, our technicians are experienced with all major RO and water purifier brands including Kent, Aquaguard, Pureit, HUL, Havells, LG, AO Smith and others.'
  },
  {
    q: 'Can I book RO service through WhatsApp?',
    a: 'Absolutely! You can book your RO service quickly through WhatsApp at +91 75378 72629. Share your name, location, and the issue and our team will confirm your booking.'
  },
  {
    q: 'Do you provide filter and membrane replacement?',
    a: 'Yes, we provide replacement of all RO filters, membranes, candles, carbon filters and other essential components using genuine spare parts.'
  },
  {
    q: 'Do you offer RO installation and uninstallation?',
    a: 'Yes, we provide professional RO installation, uninstallation and shifting service for homes, apartments and offices across our service areas.'
  },
  {
    q: 'How quickly can a technician visit?',
    a: 'We schedule technician visits on the same day for most service requests. In most cases you can expect a visit within a few hours of booking depending on your location.'
  }
];

export const statCards = [
  { label: 'Happy Families Served', value: '12,000+' },
  { label: 'Service Coverage', value: '3 Major Cities' },
  { label: 'Starting Charge', value: '₹199/-' },
  { label: 'Customer Rating', value: '4.9 ★' }
];

export const tdsGuide = [
  {
    min: 0,
    max: 50,
    status: 'Low Mineral Water',
    badge: 'info',
    color: '#087E8B',
    desc: 'Lacks essential calcium & magnesium. Mineral booster cartridge recommended to restore ideal pH.'
  },
  {
    min: 50,
    max: 150,
    status: 'Ideal Sweet Drinking Water',
    badge: 'ideal',
    color: '#10B981',
    desc: 'Optimal sweetness, highest purity, and balanced natural minerals. Perfect health standards.'
  },
  {
    min: 151,
    max: 300,
    status: 'Acceptable / Good Hardness',
    badge: 'good',
    color: '#3B82F6',
    desc: 'Safe for daily consumption. Routine servicing recommended every 6-8 months.'
  },
  {
    min: 301,
    max: 500,
    status: 'High Hardness (RO Recommended)',
    badge: 'warning',
    color: '#F4B942',
    desc: 'High mineral residue and scaling. RO purifier with high-rejection membrane is strongly recommended.'
  },
  {
    min: 501,
    max: 1200,
    status: 'Critical / Unsafe Drinking Water',
    badge: 'danger',
    color: '#EF4444',
    desc: 'Dangerously high dissolved solids. Immediate RO repair, filter replacement, or new installation needed!'
  }
];

export const amcPlans = [
  {
    name: 'Basic Care AMC',
    popular: false,
    duration: '1 Year Plan',
    price: '₹1,499/yr',
    ideal: '1-2 Years old purifiers',
    features: [
      { text: '3 Scheduled Routine Services & Sanitization', included: true },
      { text: 'Free Unlimited Breakdown Visits (No ₹199 fee)', included: true },
      { text: 'Electrical Components Cover (Pump & SMPS)', included: false },
      { text: 'RO Membrane & Filter Replacement Included', included: false },
      { text: 'Same-day technician visit in BBSR & Cuttack', included: true },
    ]
  },
  {
    name: 'Comprehensive AMC',
    popular: true,
    duration: '1 Year Full Protection',
    price: '₹2,999/yr',
    ideal: 'Families seeking 100% peace of mind',
    features: [
      { text: '3 Scheduled Routine Services & Sanitization', included: true },
      { text: 'Unlimited Free Breakdown Visits', included: true },
      { text: 'Free Sediment + Carbon + Pre-filter replacement', included: true },
      { text: 'Electrical Spares Covered (Pump, SMPS, SV)', included: true },
      { text: 'Priority technician dispatch within 2 hours', included: true },
    ]
  },
  {
    name: 'Premium RO + Alkaline AMC',
    popular: false,
    duration: '1 Year VIP Plan',
    price: '₹4,499/yr',
    ideal: 'High TDS (>500 ppm) borewell water setups',
    features: [
      { text: '4 Scheduled Deep Sanitization Services', included: true },
      { text: 'Unlimited Free Emergency Visits', included: true },
      { text: 'Complete Filter Kit + High-TDS RO Membrane Included', included: true },
      { text: 'Free Alkaline / Copper Mineral Cartridge Upgrade', included: true },
      { text: '100% All Electrical & Mechanical Spares Covered', included: true },
    ]
  }
];

