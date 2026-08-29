export const CHANNEL = {
  name: "TNPSC GS",
  handle: "@tnpscgs",
  taglineTa: "வெற்றிப் பயணம்",
  taglineEn: "Victory Journey",
  blurb:
    "Samacheer Kalvi textbooks taught lesson by lesson — the foundation of every TNPSC General Studies paper.",
  subscribers: "19.6K",
  videoCount: "308",
  youtube: "https://www.youtube.com/@tnpscgs",
  subscribe: "https://www.youtube.com/@tnpscgs?sub_confirmation=1",
  playlist8th:
    "https://www.youtube.com/playlist?list=PLkT92TBlja5lfra9O7XqIzLfo2130tjCV",
  channelId: "UCLTu838CP9xtCGO2UKUsy6g",
} as const;

export type Subject =
  | "science"
  | "history"
  | "geography"
  | "english"
  | "maths"
  | "current-affairs"
  | "pyq";

export type ClassLevel = "6" | "7" | "8" | "tnpsc";

export type Note = { heading: string; body: string };

export type Lesson = {
  id: string;
  title: string;
  tamilTitle?: string;
  classLevel: ClassLevel;
  subject: Subject;
  unit: number;
  unitName: string;
  part?: number;
  duration: string;
  views: string;
  published: string;
  thumbnail: string;
  youtubeQuery: string;
  featured?: boolean;
  popular?: boolean;
  latest?: boolean;
  summary: string;
  notes: Note[];
  keyPoints: string[];
  quizId?: string;
};

export type Course = {
  slug: string;
  title: string;
  tamilTitle: string;
  classLevel: ClassLevel;
  subject: Subject;
  description: string;
  lessonIds: string[];
  cover: string;
};

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type Quiz = {
  id: string;
  title: string;
  lessonId?: string;
  subject: Subject;
  minutes: number;
  questions: QuizQuestion[];
};

export type AlertItem = {
  id: string;
  title: string;
  tamilTitle?: string;
  date: string;
  tag: string;
  body: string;
};

export const SUBJECTS: Record<
  Subject,
  { label: string; tamil: string; blurb: string }
> = {
  science: {
    label: "Science",
    tamil: "அறிவியல்",
    blurb: "Measurement, force, light, heat — the physics TNPSC actually asks.",
  },
  history: {
    label: "History",
    tamil: "வரலாறு",
    blurb: "From the Europeans to the Company Raj, mapped to the Samacheer units.",
  },
  geography: {
    label: "Geography",
    tamil: "புவியியல்",
    blurb: "Continents, resources, and the maps that show up in Group exams.",
  },
  english: {
    label: "English",
    tamil: "ஆங்கிலம்",
    blurb: "Term-wise prose, poems, and the comprehension TNPSC recycles.",
  },
  maths: {
    label: "Maths tricks",
    tamil: "கணித குறிப்புகள்",
    blurb: "CI vs SI, percentages, and the one-line methods that save minutes.",
  },
  "current-affairs": {
    label: "Current affairs",
    tamil: "நடப்பு நிகழ்வுகள்",
    blurb: "Tamil Nadu and India, filed the way a GS paper expects it.",
  },
  pyq: {
    label: "Previous year",
    tamil: "முந்தைய வினா",
    blurb: "Solved TNPSC GS papers — pattern, options, and why the key is the key.",
  },
};

export const CLASS_LABEL: Record<ClassLevel, string> = {
  "6": "Class 6",
  "7": "Class 7",
  "8": "Class 8",
  tnpsc: "TNPSC",
};

export const lessons: Lesson[] = [
  {
    id: "force-pressure-1",
    title: "Force and Pressure · Part 1",
    tamilTitle: "விசை மற்றும் அழுத்தம்",
    classLevel: "8",
    subject: "science",
    unit: 2,
    unitName: "Force and Pressure",
    part: 1,
    duration: "18:42",
    views: "13K",
    published: "5 years ago",
    thumbnail: "/images/thumb-force.jpg",
    youtubeQuery: "8th samacheer science unit 2 force and pressure part 1",
    featured: true,
    summary:
      "A push or a pull is a force. This opening lesson builds the Samacheer Class 8 unit that TNPSC still lifts questions from — contact vs non-contact force, effects of force, and the idea of pressure as force on an area.",
    notes: [
      {
        heading: "What is a force?",
        body: "Force is a push or a pull. It is a vector: it has both magnitude and direction. The SI unit is the newton (N). One newton is the force that gives a 1 kg mass an acceleration of 1 m/s².",
      },
      {
        heading: "What a force can do",
        body: "A force can start motion, stop motion, change speed, change direction, or change the shape of a body. If two forces on a body are equal and opposite, they balance and the net force is zero — the body stays as it was (Newton’s first law, in school language).",
      },
      {
        heading: "Contact and non-contact",
        body: "Muscular force, friction, and the normal force need contact. Gravity, electrostatic force, and magnetic force act at a distance. TNPSC loves the classification question: ‘Which of the following is a non-contact force?’ — answer is usually gravity or magnetism.",
      },
      {
        heading: "Pressure",
        body: "Pressure = Force / Area. Same force on a smaller area means larger pressure. That is why a sharp knife cuts, a porter’s head-pad spreads load, and a camel’s foot is broad. SI unit: pascal (Pa) = N/m².",
      },
    ],
    keyPoints: [
      "Force is a push or a pull — vector, SI unit newton.",
      "Effects: change motion, direction, or shape.",
      "Contact: friction, muscular. Non-contact: gravity, magnetic, electrostatic.",
      "Pressure = F / A. Smaller area, larger pressure.",
      "Liquid pressure increases with depth; atmospheric pressure is ~10⁵ Pa.",
    ],
    quizId: "quiz-force",
  },
  {
    id: "force-pressure-2",
    title: "Force and Pressure · Part 2",
    tamilTitle: "விசை மற்றும் அழுத்தம் · பகுதி 2",
    classLevel: "8",
    subject: "science",
    unit: 2,
    unitName: "Force and Pressure",
    part: 2,
    duration: "16:08",
    views: "9.4K",
    published: "5 years ago",
    thumbnail: "/images/thumb-force.jpg",
    youtubeQuery: "8th samacheer science unit 2 force and pressure part 2",
    summary:
      "Part 2 takes pressure into fluids: atmospheric pressure, liquid pressure, and why dams are thicker at the bottom. Pascal’s principle and the hydraulic press close the unit.",
    notes: [
      {
        heading: "Atmospheric pressure",
        body: "The air column above us has weight. At sea level this is about 1.01 × 10⁵ Pa, or 1 atmosphere. Magdeburg hemispheres and the collapsing tin-can demo are the textbook pictures. Atmospheric pressure falls with altitude — boiling point of water drops on a hill station.",
      },
      {
        heading: "Liquid pressure",
        body: "P = hρg. Pressure in a liquid depends on depth, density, and g — not on the shape of the vessel. That is why a dam wall is thicker at the base, and why a diver feels more pressure as she goes down.",
      },
      {
        heading: "Pascal’s principle",
        body: "Pressure applied to an enclosed liquid is transmitted equally in all directions. Hydraulic brakes and the hydraulic press use a small force on a small piston to produce a large force on a large piston: F₂ = F₁ × (A₂ / A₁).",
      },
    ],
    keyPoints: [
      "1 atm ≈ 1.01 × 10⁵ Pa.",
      "Liquid pressure P = hρg — depends on depth, not shape.",
      "Dams are thicker at the bottom because pressure is higher.",
      "Pascal: enclosed liquid transmits pressure equally.",
      "Hydraulic machines trade small force + small area for large force.",
    ],
    quizId: "quiz-force",
  },
  {
    id: "measurement",
    title: "Measurement",
    tamilTitle: "அளவீடு",
    classLevel: "8",
    subject: "science",
    unit: 1,
    unitName: "Measurement",
    duration: "22:15",
    views: "57K",
    published: "5 years ago",
    thumbnail: "/images/thumb-measurement.jpg",
    youtubeQuery: "8th samacheer science unit 1 measurement",
    popular: true,
    summary:
      "The opening science unit of Class 8: physical quantities, SI units, and the instruments TNPSC still names in one-mark questions.",
    notes: [
      {
        heading: "Physical quantities",
        body: "A physical quantity is anything that can be measured. It has a magnitude and a unit. Fundamental quantities in SI: length (m), mass (kg), time (s), temperature (K), electric current (A), amount of substance (mol), luminous intensity (cd).",
      },
      {
        heading: "Derived units",
        body: "Area = m², volume = m³, speed = m/s, density = kg/m³, force = kg·m/s² = N. Know the difference between a unit and a standard (the physical embodiment of the unit).",
      },
      {
        heading: "Instruments",
        body: "Metre scale (least count 1 mm), vernier caliper (0.1 mm), screw gauge (0.01 mm), measuring cylinder (volume of liquid), spring balance (weight), digital balance (mass), stopwatch (time). Least count = smallest value the instrument can measure.",
      },
    ],
    keyPoints: [
      "Seven SI base quantities — metre, kilogram, second, kelvin, ampere, mole, candela.",
      "Least count is the smallest measurable value of an instrument.",
      "Vernier caliper LC is typically 0.1 mm; screw gauge 0.01 mm.",
      "Mass is amount of matter; weight is the gravitational force on it.",
      "1 litre = 1000 cm³ = 0.001 m³.",
    ],
    quizId: "quiz-measurement",
  },
  {
    id: "light",
    title: "Light",
    tamilTitle: "ஒளி",
    classLevel: "8",
    subject: "science",
    unit: 3,
    unitName: "Light",
    duration: "20:04",
    views: "31K",
    published: "5 years ago",
    thumbnail: "/images/thumb-light.jpg",
    youtubeQuery: "8th samacheer science unit 3 light",
    popular: true,
    summary:
      "Reflection, plane mirrors, and the laws that turn up as diagram questions. A clean Class 8 unit with a high recall rate in Group 4.",
    notes: [
      {
        heading: "Laws of reflection",
        body: "The incident ray, reflected ray, and normal all lie in the same plane. Angle of incidence equals angle of reflection (i = r).",
      },
      {
        heading: "Plane mirror",
        body: "Image is virtual, erect, same size, as far behind the mirror as the object is in front, and laterally inverted. Number of images between two mirrors: n = (360°/θ) − 1.",
      },
      {
        heading: "Dispersion",
        body: "White light splits into VIBGYOR because violet bends the most and red the least in a prism. A rainbow is dispersion plus internal reflection in raindrops.",
      },
    ],
    keyPoints: [
      "i = r, and all three lie in one plane.",
      "Plane-mirror image: virtual, erect, same size, laterally inverted.",
      "Two mirrors at θ: images = 360/θ − 1.",
      "Violet has the highest refractive deviation; red the least.",
    ],
    quizId: "quiz-science-mix",
  },
  {
    id: "heat",
    title: "Heat",
    tamilTitle: "வெப்பம்",
    classLevel: "8",
    subject: "science",
    unit: 4,
    unitName: "Heat",
    duration: "17:50",
    views: "24K",
    published: "5 years ago",
    thumbnail: "/images/thumb-heat.jpg",
    youtubeQuery: "8th samacheer science unit 4 heat",
    summary:
      "Temperature vs heat, the three ways heat travels, and the land-and-sea breeze that geography papers also steal.",
    notes: [
      {
        heading: "Heat and temperature",
        body: "Heat is energy in transit (joule). Temperature is how hot or cold a body is (celsius or kelvin). K = °C + 273. Heat flows from higher temperature to lower temperature until thermal equilibrium.",
      },
      {
        heading: "Transfer of heat",
        body: "Conduction: through solids, particle to particle (metals). Convection: through fluids, by bulk movement (sea breeze, room heaters). Radiation: needs no medium (sunlight, a black surface absorbs more).",
      },
      {
        heading: "Land and sea breeze",
        body: "Day: land heats faster, air rises, sea breeze blows in. Night: land cools faster, sea is warmer, land breeze blows out. Same physics as a convection current.",
      },
    ],
    keyPoints: [
      "Heat = energy (J). Temperature = hotness (K or °C).",
      "K = °C + 273.",
      "Conduction in solids, convection in fluids, radiation with no medium.",
      "Black, dull surfaces absorb and emit radiation better than white, shiny ones.",
    ],
  },
  {
    id: "electricity",
    title: "Electricity",
    tamilTitle: "மின்சாரம்",
    classLevel: "8",
    subject: "science",
    unit: 5,
    unitName: "Electricity",
    duration: "19:11",
    views: "21K",
    published: "4 years ago",
    thumbnail: "/images/thumb-electricity.jpg",
    youtubeQuery: "8th samacheer science electricity",
    summary:
      "A closed path, a cell, a bulb, and Ohm’s law in school clothes. The circuit symbols are one-mark gold.",
    notes: [
      {
        heading: "Electric current",
        body: "Current is the flow of charge. SI unit ampere (A). Conventional current is taken from positive to negative, even though electrons drift the other way.",
      },
      {
        heading: "Circuit",
        body: "A closed path is needed for current. Series: same current, voltages add, one break kills the chain (old fairy lights). Parallel: same voltage, currents add, each branch independent (house wiring).",
      },
      {
        heading: "Ohm’s law",
        body: "V = IR. Resistance depends on material, length (directly), and area (inversely). SI unit ohm (Ω). Fuse wire has a low melting point — it is a safety device, not a conductor you upsize.",
      },
    ],
    keyPoints: [
      "Current needs a closed path. Unit: ampere.",
      "Series: one current. Parallel: one voltage.",
      "V = IR. R increases with length, decreases with thickness.",
      "Fuse protects the circuit by melting on excess current.",
    ],
    quizId: "quiz-science-mix",
  },
  {
    id: "advent-europeans",
    title: "Advent of the Europeans",
    tamilTitle: "ஐரோப்பியரின் வருகை",
    classLevel: "8",
    subject: "history",
    unit: 1,
    unitName: "Advent of the Europeans",
    duration: "24:36",
    views: "87K",
    published: "5 years ago",
    thumbnail: "/images/thumb-europeans.jpg",
    youtubeQuery: "8th samacheer history unit 1 advent of the europeans",
    popular: true,
    summary:
      "The Class 8 history unit TNPSC quotes almost verbatim: Vasco da Gama, the trading companies, Carnatic wars, and the road to Plassey.",
    notes: [
      {
        heading: "The Portuguese",
        body: "Vasco da Gama reached Calicut in 1498, received by the Zamorin. Francisco de Almeida (Blue Water Policy) and Afonso de Albuquerque (Goa, 1510) built the Estado da India. Portuguese were the first Europeans in India, last to leave (Goa, 1961).",
      },
      {
        heading: "The others",
        body: "Dutch (VOC) — Pulicat, Nagapattinam. English East India Company, 1600 — factory at Surat (1613), then Madras (1639, Francis Day), Bombay, Calcutta. French — Pondicherry (François Martin). Danes — Tranquebar (Tharangambadi).",
      },
      {
        heading: "From trade to territory",
        body: "Carnatic Wars (1746–1763) between English and French. Battle of Plassey, 1757 — Clive, Mir Jafar, Siraj-ud-Daulah. Battle of Buxar, 1764, then the Diwani of Bengal. That is the hinge of the unit, and of every Group 2 paper.",
      },
    ],
    keyPoints: [
      "Vasco da Gama, Calicut, 1498.",
      "Albuquerque captured Goa in 1510.",
      "EIC chartered 1600; Madras 1639; Plassey 1757; Buxar 1764.",
      "French HQ: Pondicherry. Dutch: Pulicat. Danes: Tranquebar.",
      "Portuguese — first in, last out (1961).",
    ],
    quizId: "quiz-europeans",
  },
  {
    id: "trade-territory",
    title: "From Trade to Territory",
    tamilTitle: "வணிகத்திலிருந்து ஆட்சிக்கு",
    classLevel: "8",
    subject: "history",
    unit: 2,
    unitName: "From Trade to Territory",
    duration: "21:02",
    views: "44K",
    published: "5 years ago",
    thumbnail: "/images/thumb-europeans.jpg",
    youtubeQuery: "8th samacheer history from trade to territory",
    popular: true,
    summary:
      "How a trading company became a state: Dual Government, Subsidiary Alliance, Doctrine of Lapse — the three policies every prelims paper still names.",
    notes: [
      {
        heading: "Dual Government",
        body: "After Buxar, Robert Clive set up Dual Government in Bengal (1765–1772): Company took Diwani (revenue), Nawab kept Nizamat (law and order) without the money to do it. Warren Hastings ended it.",
      },
      {
        heading: "Subsidiary Alliance",
        body: "Wellesley’s system: the Indian ruler disbanded his army, accepted a British force, and a Resident. Awadh, Hyderabad, Mysore after 1799 — classic list questions.",
      },
      {
        heading: "Doctrine of Lapse",
        body: "Dalhousie: if a ruler died without a natural heir, the state lapsed to the Company. Satara, Nagpur, Jhansi. Adopted heirs were not recognised. This is one of the sparks of 1857.",
      },
    ],
    keyPoints: [
      "Dual Government in Bengal: 1765, Clive.",
      "Subsidiary Alliance: Wellesley.",
      "Doctrine of Lapse: Dalhousie — Satara, Jhansi, Nagpur.",
      "Battle of Buxar (1764) gave the Diwani.",
    ],
    quizId: "quiz-europeans",
  },
  {
    id: "rocks-soils",
    title: "Rocks and Soils",
    tamilTitle: "பாறைகளும் மண்ணும்",
    classLevel: "8",
    subject: "geography",
    unit: 1,
    unitName: "Rocks and Soils",
    duration: "18:20",
    views: "28K",
    published: "5 years ago",
    thumbnail: "/images/thumb-asia.jpg",
    youtubeQuery: "8th samacheer geography rocks and soils",
    summary:
      "Igneous, sedimentary, metamorphic — and the soils of Tamil Nadu that GS papers ask by district.",
    notes: [
      {
        heading: "Three families of rock",
        body: "Igneous: from magma (granite, basalt). Sedimentary: layered, fossils (sandstone, limestone). Metamorphic: changed by heat and pressure (marble from limestone, gneiss from granite, slate from shale).",
      },
      {
        heading: "Rock cycle",
        body: "Any rock can become any other, given time, heat, pressure, weathering, and deposition. That sentence is the whole cycle.",
      },
      {
        heading: "Soils of Tamil Nadu",
        body: "Alluvial — Cauvery delta. Black (regur) — cotton, west TN. Red — lateritic in places, widespread. Saline — coastal. Know crop + soil pairs for Group 4.",
      },
    ],
    keyPoints: [
      "Igneous: granite, basalt. Sedimentary: sandstone, limestone. Metamorphic: marble, slate, gneiss.",
      "Marble ← limestone. Slate ← shale.",
      "Cauvery delta: alluvial. Cotton: black soil.",
    ],
  },
  {
    id: "asia-europe",
    title: "Asia and Europe",
    tamilTitle: "ஆசியாவும் ஐரோப்பாவும்",
    classLevel: "6",
    subject: "geography",
    unit: 1,
    unitName: "Asia and Europe",
    duration: "19:44",
    views: "76K",
    published: "5 years ago",
    thumbnail: "/images/thumb-asia.jpg",
    youtubeQuery: "6th term 3 geography unit 1 asia and europe",
    popular: true,
    summary:
      "Class 6 Term 3 geography — continents, extents, and the Ural line. Still the cleanest way to lock world-map one-markers.",
    notes: [
      {
        heading: "Asia",
        body: "Largest continent. It holds about 30% of Earth’s land and ~60% of its people. It is bounded by the Arctic, Pacific, and Indian Oceans. The Ural Mountains, Ural River, and Caspian Sea are the conventional west boundary with Europe.",
      },
      {
        heading: "Physical Asia",
        body: "Pamir Knot is the ‘roof of the world’ from which great ranges radiate — Himalaya, Karakoram, Kunlun, Tien Shan, Hindu Kush. Highest peak: Mt Everest, 8,848 m. Lowest: Dead Sea shore.",
      },
      {
        heading: "Europe",
        body: "Second-smallest continent, a peninsula of peninsulas. Alps, Pyrenees, Carpathians. Highest: Mt Elbrus in the Caucasus. Important rivers: Volga (longest), Danube, Rhine, Thames.",
      },
    ],
    keyPoints: [
      "Asia: largest continent, ~60% of world population.",
      "Europe–Asia divide: Urals + Caspian.",
      "Pamir Knot — radiating ranges.",
      "Volga is Europe’s longest river. Elbrus is the highest peak.",
    ],
    quizId: "quiz-geo",
  },
  {
    id: "the-sea",
    title: "The Sea",
    tamilTitle: "கடல்",
    classLevel: "6",
    subject: "english",
    unit: 1,
    unitName: "The Sea",
    duration: "14:12",
    views: "83",
    published: "2 weeks ago",
    thumbnail: "/images/thumb-sea.jpg",
    youtubeQuery: "6th term english term 1 lesson 1 the sea",
    latest: true,
    summary:
      "Class 6 English Term 1, Lesson 1. Prose about the sea — useful for comprehension practice and the science-adjacent sea-turtle lesson that follows.",
    notes: [
      {
        heading: "The lesson",
        body: "The sea is presented as both livelihood and landscape: fishing communities, tides, and the living things that depend on a healthy coast. Read it once for language, once for GS — coastal ecology is a TNPSC theme.",
      },
      {
        heading: "Words worth keeping",
        body: "Tide, current, coast, harbour, catamaran, marine. These nouns return in geography and in unseen passages.",
      },
    ],
    keyPoints: [
      "Term 1, Lesson 1 of Class 6 English.",
      "Coast, tide, and marine life — overlap with geography.",
      "Pairs with the sea-turtle quiz lesson.",
    ],
    quizId: "quiz-turtle",
  },
  {
    id: "sea-turtle",
    title: "Quiz · The Sea Turtle",
    tamilTitle: "கடல் ஆமை · வினாடி வினா",
    classLevel: "6",
    subject: "english",
    unit: 1,
    unitName: "The Sea Turtle",
    duration: "11:05",
    views: "82",
    published: "13 days ago",
    thumbnail: "/images/thumb-sea.jpg",
    youtubeQuery: "quiz from the lesson sea turtle tnpscgs",
    latest: true,
    summary:
      "A classroom quiz built off the sea-turtle lesson — olive ridleys, nesting beaches of Tamil Nadu, and why they are protected.",
    notes: [
      {
        heading: "Olive ridley",
        body: "Lepidochelys olivacea. The smallest sea turtle in Indian waters, famous for arribada — mass nesting. Odisha’s Gahirmatha is the largest rookery. Tamil Nadu has nesting on the Chennai–Nagapattinam coast.",
      },
      {
        heading: "Protection",
        body: "All five Indian sea turtles are in Schedule I of the Wildlife (Protection) Act, 1972. Threats: trawling, artificial light on beaches, plastic, and loss of nesting sand.",
      },
    ],
    keyPoints: [
      "Olive ridley — mass nesting (arribada).",
      "Gahirmatha, Odisha — largest rookery.",
      "Schedule I, Wildlife Protection Act 1972.",
      "Lights on beaches disorient hatchlings.",
    ],
    quizId: "quiz-turtle",
  },
  {
    id: "seventh-history",
    title: "New Religious Ideas and Movements",
    tamilTitle: "புதிய சமய எண்ணங்களும் இயக்கங்களும்",
    classLevel: "7",
    subject: "history",
    unit: 1,
    unitName: "New Religious Ideas and Movements",
    duration: "23:18",
    views: "57K",
    published: "5 years ago",
    thumbnail: "/images/thumb-europeans.jpg",
    youtubeQuery: "7th term 3 history unit 1 tnpscgs",
    popular: true,
    summary:
      "Class 7 Term 3 History Unit 1 — Bhakti and Sufi currents, the saints TNPSC lists, and the social soil they grew in.",
    notes: [
      {
        heading: "Bhakti",
        body: "Personal devotion over ritual. In the Tamil country the Alvars (Vaishnava, 12) and Nayanmars (Saiva, 63) sang the Tevaram and Divya Prabandham. Later, Kabir, Guru Nanak, Meera, Chaitanya.",
      },
      {
        heading: "Sufi",
        body: "Islamic mysticism. Chishti (Khwaja Moinuddin, Ajmer; Nizamuddin Auliya, Delhi) and Suhrawardi orders matter for the paper. Khanqah, silsila, and the langar idea overlap with Bhakti social practice.",
      },
      {
        heading: "Why it is asked",
        body: "TNPSC uses this unit to test Tamil Bhakti first, then the all-India names. Keep the 12 Alvars and 63 Nayanmars as a pair. Appar, Sundarar, Sambandar, Manikkavasagar — the four Saiva samayacharyas.",
      },
    ],
    keyPoints: [
      "12 Alvars, 63 Nayanmars.",
      "Tevaram and Divya Prabandham.",
      "Chishti order: Ajmer, Delhi.",
      "Kabir, Nanak, Meera — later Bhakti.",
    ],
  },
  {
    id: "jallikattu-2026",
    title: "Jallikattu 2026",
    tamilTitle: "ஜல்லிக்கட்டு 2026",
    classLevel: "tnpsc",
    subject: "current-affairs",
    unit: 0,
    unitName: "Tamil Nadu",
    duration: "8:40",
    views: "1.5K",
    published: "recent",
    thumbnail: "/images/thumb-jallikattu.jpg",
    youtubeQuery: "jallikattu 2026 tnpscgs",
    latest: true,
    summary:
      "A current-affairs briefing on Jallikattu — the sport, the Pongal calendar, the legal path from the 2014 ban to the 2017 ordinance, and the GS angles.",
    notes: [
      {
        heading: "What it is",
        body: "Jallikattu is a traditional bull-embracing sport of Tamil Nadu, tied to Pongal, especially in Madurai, Pudukkottai, Tiruchirappalli, and Sivaganga districts. The famous arena is Alanganallur.",
      },
      {
        heading: "The legal line",
        body: "The Supreme Court banned it in 2014 (AWBI vs A Nagaraja). Tamil Nadu brought an ordinance and then the Prevention of Cruelty to Animals (Tamil Nadu Amendment) Act, 2017, placing Jallikattu in a regulated traditional-sport frame. A 2023 Supreme Court constitution bench upheld the state amendments.",
      },
      {
        heading: "GS take",
        body: "This is culture + federalism + animal-welfare law. Note the breed (Kangayam, Pulikulam, Umblachery, Barugur, Malai Madu) conservation argument that the state used.",
      },
    ],
    keyPoints: [
      "Tied to Pongal; Alanganallur is the signature arena.",
      "2014 SC ban; 2017 TN amendment; 2023 SC upholds.",
      "Native breeds: Kangayam, Pulikulam, Umblachery.",
    ],
  },
  {
    id: "orion",
    title: "Orion Constellation",
    tamilTitle: "ஓரியன் விண்மீன் கூட்டம்",
    classLevel: "tnpsc",
    subject: "current-affairs",
    unit: 0,
    unitName: "Science & sky",
    duration: "7:22",
    views: "23",
    published: "8 days ago",
    thumbnail: "/images/thumb-orion.jpg",
    youtubeQuery: "orion constellation tnpscgs",
    latest: true,
    summary:
      "A short sky brief: Orion the hunter, the belt, Betelgeuse and Rigel, and why a constellation question still appears in GS and SSC.",
    notes: [
      {
        heading: "The figure",
        body: "Orion is a prominent equatorial constellation, visible from both hemispheres in winter (Northern). The three belt stars: Alnitak, Alnilam, Alnitak’s companions — Alnitak, Alnilam, Mintaka. Betelgeuse (red supergiant, shoulder) and Rigel (blue-white, foot).",
      },
      {
        heading: "Nearby science",
        body: "Follow the belt down to Sirius (Canis Major), the brightest night star. The Orion Nebula (M42) sits in the sword — a stellar nursery. Polaris is not in Orion; it is in Ursa Minor.",
      },
    ],
    keyPoints: [
      "Belt: Alnitak, Alnilam, Mintaka.",
      "Betelgeuse — red supergiant. Rigel — blue-white.",
      "Orion Nebula (M42) in the sword.",
      "Sirius lies along the belt line.",
    ],
  },
  {
    id: "ci-si",
    title: "CI vs SI — Difference Trick",
    tamilTitle: "வட்டி · வேறுபாடு",
    classLevel: "tnpsc",
    subject: "maths",
    unit: 0,
    unitName: "Aptitude",
    duration: "0:32",
    views: "2.1K",
    published: "4 weeks ago",
    thumbnail: "/images/thumb-cisi.jpg",
    youtubeQuery: "CI vs SI difference trick tnpscgs",
    latest: true,
    summary:
      "The most-expected aptitude trick: the one-line gap between compound interest and simple interest for 2 and 3 years.",
    notes: [
      {
        heading: "The formulae",
        body: "SI = PNR / 100. CI = P(1 + R/100)ⁿ − P. For 2 years, CI − SI = P(R/100)². For 3 years, CI − SI = P(R/100)² × (R/100 + 3).",
      },
      {
        heading: "How the paper asks it",
        body: "They give the difference and the rate, and ask for P — or give P and R and ask the difference. Memorise the 2-year identity first; it is the most common.",
      },
    ],
    keyPoints: [
      "SI = PNR/100. Linear in time.",
      "CI compounds on interest already earned.",
      "2 years: CI − SI = P(R/100)².",
      "CI is always ≥ SI for the same P, R, n > 0.",
    ],
    quizId: "quiz-cisi",
  },
  {
    id: "pyq-gs",
    title: "TNPSC GS Previous Year Paper",
    tamilTitle: "முந்தைய ஆண்டு வினா",
    classLevel: "tnpsc",
    subject: "pyq",
    unit: 0,
    unitName: "Previous year",
    duration: "32:10",
    views: "12",
    published: "4 days ago",
    thumbnail: "/images/thumb-pyq.jpg",
    youtubeQuery: "tnpsc gs previous year question paper with answer",
    latest: true,
    summary:
      "A walk through a GS paper: how Samacheer units are rewritten as options, and where candidates leak marks.",
    notes: [
      {
        heading: "What repeats",
        body: "Class 6–10 Samacheer science and social science. Polity from Laxmikanth-level one-liners. Tamil Nadu current affairs of the last 12 months. Arithmetic of class 8–10.",
      },
      {
        heading: "How to read a PYQ",
        body: "Do not memorise the answer key. Underline the Samacheer sentence it was lifted from. If you can name the unit, you will recognise the next paraphrase.",
      },
    ],
    keyPoints: [
      "GS is a Samacheer paper in a different font.",
      "Map every PYQ back to a unit.",
      "TN current affairs: last 12 months, government schemes, appointments.",
    ],
    quizId: "quiz-science-mix",
  },
];

export const courses: Course[] = [
  {
    slug: "eighth-science",
    title: "Class 8 Science",
    tamilTitle: "8ஆம் வகுப்பு அறிவியல்",
    classLevel: "8",
    subject: "science",
    description:
      "Measurement through electricity — the physics and chemistry backbone of TNPSC GS.",
    lessonIds: [
      "measurement",
      "force-pressure-1",
      "force-pressure-2",
      "light",
      "heat",
      "electricity",
    ],
    cover: "/images/thumb-force.jpg",
  },
  {
    slug: "eighth-history",
    title: "Class 8 History",
    tamilTitle: "8ஆம் வகுப்பு வரலாறு",
    classLevel: "8",
    subject: "history",
    description:
      "Advent of the Europeans and the Company Raj. The most quoted history units on the paper.",
    lessonIds: ["advent-europeans", "trade-territory"],
    cover: "/images/thumb-europeans.jpg",
  },
  {
    slug: "sixth-geography",
    title: "Class 6 Geography",
    tamilTitle: "6ஆம் வகுப்பு புவியியல்",
    classLevel: "6",
    subject: "geography",
    description: "Asia and Europe — extents, ranges, rivers, and the Ural line.",
    lessonIds: ["asia-europe"],
    cover: "/images/thumb-asia.jpg",
  },
  {
    slug: "sixth-english",
    title: "Class 6 English",
    tamilTitle: "6ஆம் வகுப்பு ஆங்கிலம்",
    classLevel: "6",
    subject: "english",
    description: "Term 1 prose: The Sea, and the sea-turtle quiz that sits beside it.",
    lessonIds: ["the-sea", "sea-turtle"],
    cover: "/images/thumb-sea.jpg",
  },
  {
    slug: "current-affairs",
    title: "Current affairs desk",
    tamilTitle: "நடப்பு நிகழ்வுகள்",
    classLevel: "tnpsc",
    subject: "current-affairs",
    description:
      "Tamil Nadu and the sky above it — filed for Group exams, not for scrolling.",
    lessonIds: ["jallikattu-2026", "orion"],
    cover: "/images/current-affairs.jpg",
  },
  {
    slug: "tnpsc-toolkit",
    title: "TNPSC toolkit",
    tamilTitle: "தேர்வு கருவிகள்",
    classLevel: "tnpsc",
    subject: "pyq",
    description: "Previous-year papers and the aptitude tricks that recover marks.",
    lessonIds: ["pyq-gs", "ci-si"],
    cover: "/images/thumb-pyq.jpg",
  },
];

export const quizzes: Quiz[] = [
  {
    id: "quiz-force",
    title: "Force and Pressure",
    lessonId: "force-pressure-1",
    subject: "science",
    minutes: 6,
    questions: [
      {
        q: "Pressure is defined as",
        options: [
          "Force × Area",
          "Force / Area",
          "Area / Force",
          "Mass × Acceleration",
        ],
        answer: 1,
        explain: "Pressure = Force / Area. SI unit pascal (N/m²).",
      },
      {
        q: "Which of the following is a non-contact force?",
        options: ["Friction", "Muscular force", "Gravity", "Normal force"],
        answer: 2,
        explain: "Gravity, magnetic and electrostatic forces act at a distance.",
      },
      {
        q: "Liquid pressure at a point depends on",
        options: [
          "Shape of the vessel",
          "Depth, density and g",
          "Colour of the liquid",
          "Volume of liquid only",
        ],
        answer: 1,
        explain: "P = hρg. Shape of the container does not enter the formula.",
      },
      {
        q: "A dam is built thicker at the bottom because",
        options: [
          "It looks stronger",
          "Pressure of water is greater at greater depth",
          "Cement is cheaper at the base",
          "Fish live at the bottom",
        ],
        answer: 1,
        explain: "Pressure increases with depth, so the wall must resist a larger force at the base.",
      },
      {
        q: "The SI unit of force is the",
        options: ["Pascal", "Joule", "Newton", "Watt"],
        answer: 2,
        explain: "Force is measured in newtons. Pascal is pressure; joule is energy.",
      },
      {
        q: "Pascal’s principle is used in a",
        options: ["Telescope", "Hydraulic brake", "Electric fuse", "Thermometer"],
        answer: 1,
        explain: "An enclosed liquid transmits pressure equally — the idea behind hydraulic machines.",
      },
    ],
  },
  {
    id: "quiz-measurement",
    title: "Measurement",
    lessonId: "measurement",
    subject: "science",
    minutes: 5,
    questions: [
      {
        q: "The SI unit of mass is the",
        options: ["Gram", "Kilogram", "Newton", "Quintal"],
        answer: 1,
        explain: "Kilogram is the SI base unit of mass. Newton is force.",
      },
      {
        q: "Least count of a typical school vernier caliper is",
        options: ["1 mm", "0.1 mm", "0.01 mm", "1 cm"],
        answer: 1,
        explain: "Vernier caliper: 0.1 mm. Screw gauge: 0.01 mm. Metre scale: 1 mm.",
      },
      {
        q: "Which of these is an SI base quantity?",
        options: ["Force", "Energy", "Time", "Pressure"],
        answer: 2,
        explain: "Time (second) is a base quantity. Force, energy, pressure are derived.",
      },
      {
        q: "1 litre is equal to",
        options: ["1 m³", "100 cm³", "1000 cm³", "10 cm³"],
        answer: 2,
        explain: "1 L = 1000 cm³ = 0.001 m³.",
      },
    ],
  },
  {
    id: "quiz-europeans",
    title: "Advent of the Europeans",
    lessonId: "advent-europeans",
    subject: "history",
    minutes: 6,
    questions: [
      {
        q: "Vasco da Gama reached Calicut in",
        options: ["1453", "1498", "1510", "1600"],
        answer: 1,
        explain: "1498. He was received by the Zamorin of Calicut.",
      },
      {
        q: "Goa was captured by Albuquerque in",
        options: ["1498", "1510", "1600", "1639"],
        answer: 1,
        explain: "Afonso de Albuquerque took Goa from the Bijapur Sultan in 1510.",
      },
      {
        q: "The English East India Company was chartered in",
        options: ["1498", "1510", "1600", "1757"],
        answer: 2,
        explain: "31 December 1600, by Queen Elizabeth I.",
      },
      {
        q: "The Battle of Plassey was fought in",
        options: ["1757", "1764", "1765", "1857"],
        answer: 0,
        explain: "1757 — Clive, Siraj-ud-Daulah, Mir Jafar. Buxar is 1764.",
      },
      {
        q: "Doctrine of Lapse is associated with",
        options: ["Wellesley", "Dalhousie", "Cornwallis", "Warren Hastings"],
        answer: 1,
        explain: "Dalhousie. Wellesley is Subsidiary Alliance.",
      },
    ],
  },
  {
    id: "quiz-cisi",
    title: "CI vs SI",
    lessonId: "ci-si",
    subject: "maths",
    minutes: 5,
    questions: [
      {
        q: "For 2 years, CI − SI equals",
        options: ["PR/100", "P(R/100)²", "2PR/100", "P(R/100)³"],
        answer: 1,
        explain: "The 2-year identity: CI − SI = P(R/100)².",
      },
      {
        q: "Simple interest on ₹2,000 at 10% for 2 years is",
        options: ["₹200", "₹400", "₹420", "₹440"],
        answer: 1,
        explain: "SI = 2000 × 10 × 2 / 100 = ₹400.",
      },
      {
        q: "Compound interest is greater than simple interest because",
        options: [
          "The rate is higher",
          "Interest is charged on interest already earned",
          "The principal is larger",
          "Banks prefer CI",
        ],
        answer: 1,
        explain: "CI compounds. SI is always on the original principal.",
      },
      {
        q: "SI on a sum at 5% for 4 years is ₹400. The sum is",
        options: ["₹1,000", "₹1,600", "₹2,000", "₹2,500"],
        answer: 2,
        explain: "400 = P × 5 × 4 / 100 → P = 2,000.",
      },
    ],
  },
  {
    id: "quiz-turtle",
    title: "The Sea Turtle",
    lessonId: "sea-turtle",
    subject: "english",
    minutes: 4,
    questions: [
      {
        q: "The olive ridley is known for",
        options: [
          "Living only in rivers",
          "Mass nesting called arribada",
          "Being the largest sea turtle",
          "Nesting on ice",
        ],
        answer: 1,
        explain: "Arribada is the mass-nesting event. Gahirmatha is the largest rookery.",
      },
      {
        q: "Sea turtles in India are listed in",
        options: [
          "Schedule V of the Wildlife Act",
          "Schedule I of the Wildlife (Protection) Act, 1972",
          "The Indian Forest Act only",
          "No schedule",
        ],
        answer: 1,
        explain: "Schedule I — highest protection.",
      },
      {
        q: "Artificial lights on beaches harm hatchlings because they",
        options: [
          "Heat the sand too much",
          "Disorient hatchlings heading to the sea",
          "Attract sharks",
          "Stop the tide",
        ],
        answer: 1,
        explain: "Hatchlings use light over the water. Landward lights pull them the wrong way.",
      },
    ],
  },
  {
    id: "quiz-geo",
    title: "Asia and Europe",
    lessonId: "asia-europe",
    subject: "geography",
    minutes: 4,
    questions: [
      {
        q: "The conventional boundary between Asia and Europe includes the",
        options: ["Alps", "Ural Mountains", "Andes", "Rockies"],
        answer: 1,
        explain: "Urals, Ural River, and the Caspian Sea.",
      },
      {
        q: "Europe’s longest river is the",
        options: ["Danube", "Rhine", "Volga", "Thames"],
        answer: 2,
        explain: "The Volga, flowing to the Caspian Sea.",
      },
      {
        q: "The Pamir Knot is in",
        options: ["Africa", "Asia", "Europe", "Australia"],
        answer: 1,
        explain: "Central Asia — the ‘roof of the world’ from which great ranges radiate.",
      },
    ],
  },
  {
    id: "quiz-science-mix",
    title: "Science mix · Class 8",
    subject: "science",
    minutes: 7,
    questions: [
      {
        q: "The image in a plane mirror is",
        options: [
          "Real and inverted",
          "Virtual, erect and laterally inverted",
          "Real and erect",
          "Virtual and inverted",
        ],
        answer: 1,
        explain: "Plane-mirror image is virtual, erect, same size, laterally inverted.",
      },
      {
        q: "Heat transfer that needs no medium is",
        options: ["Conduction", "Convection", "Radiation", "Evaporation"],
        answer: 2,
        explain: "Radiation travels through vacuum — sunlight is the school example.",
      },
      {
        q: "House wiring is done in",
        options: ["Series", "Parallel", "Both always", "Neither"],
        answer: 1,
        explain: "Parallel: each appliance gets the same voltage and can be switched on its own.",
      },
      {
        q: "K = °C +",
        options: ["100", "180", "273", "373"],
        answer: 2,
        explain: "T(K) = T(°C) + 273.",
      },
      {
        q: "A fuse wire should have",
        options: [
          "High melting point",
          "Low melting point",
          "Zero resistance",
          "Infinite length",
        ],
        answer: 1,
        explain: "It must melt and break the circuit when current exceeds the rating.",
      },
    ],
  },
];

export const alerts: AlertItem[] = [
  {
    id: "group-1",
    title: "TNPSC Group 1 notification is out",
    tamilTitle: "குரூப் 1 அறிவிப்பு வெளியானது",
    date: "This month",
    tag: "Group 1",
    body: "The Group 1 notification has been published. Check the official TNPSC site for vacancies, exam dates, and the syllabus PDF. This desk will map the GS paper back to the Samacheer units on this site.",
  },
  {
    id: "annual-planner",
    title: "Annual planner — mid-year update",
    tamilTitle: "ஆண்டு திட்டம் · இடைக்கால அறிவிப்பு",
    date: "This month",
    tag: "Planner",
    body: "TNPSC has issued an update to the annual planner. Group 2, 2A, 4 and VAO windows are the ones to diary first. Watch the channel post for a Tamil walkthrough.",
  },
  {
    id: "group-4-syllabus",
    title: "Group 4 still sits on Samacheer 6–10",
    tamilTitle: "குரூப் 4 பாடத்திட்டம்",
    date: "Standing note",
    tag: "Syllabus",
    body: "General Studies for Group 4 is drawn from Class 6–10 Samacheer Kalvi. Science Units 1–2 of Class 8 and History Unit 1 remain high-yield. Start there if you are beginning this month.",
  },
];

export function youtubeSearch(query: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`tnpscgs ${query}`)}`;
}

export function getLesson(id: string) {
  return lessons.find((l) => l.id === id);
}

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function getQuiz(id: string) {
  return quizzes.find((q) => q.id === id);
}

export function lessonsForCourse(course: Course) {
  return course.lessonIds
    .map((id) => getLesson(id))
    .filter((l): l is Lesson => Boolean(l));
}

export function relatedLessons(lesson: Lesson, n = 4) {
  return lessons
    .filter(
      (l) =>
        l.id !== lesson.id &&
        (l.subject === lesson.subject || l.classLevel === lesson.classLevel),
    )
    .slice(0, n);
}

export const featuredLesson = lessons.find((l) => l.featured) ?? lessons[0];
export const popularLessons = lessons.filter((l) => l.popular);
export const latestLessons = lessons.filter((l) => l.latest);
