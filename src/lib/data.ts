export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  date: string;
  timeAgo: string;
  image: string;
  imageSmall?: string;
  format?: "standard" | "video" | "gallery";
  featured?: boolean;
  /** Optional topic/tag names for "Related Topics" (demo shows multiple links) */
  tags?: string[];
}

const placeholderImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80";
const placeholderSmall = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80";

export const mockPosts: Post[] = [
  {
    id: "1",
    slug: "breaking-news-headline-dominates-world-today",
    title: "Breaking: Major Headline Dominates World News Today",
    excerpt: "The latest developments have captured global attention as leaders respond to the unprecedented situation unfolding across multiple regions.",
    content: "<p>Full article content would go here. This is a sample post for the Zox News theme clone.</p><p>Additional paragraphs and rich content.</p>",
    category: "World",
    categorySlug: "world",
    date: "2025-02-08",
    timeAgo: "2 hours ago",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=80",
    imageSmall: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "2",
    slug: "technology-giants-announce-new-innovations",
    title: "Technology Giants Announce Groundbreaking New Innovations",
    excerpt: "Industry leaders unveil next-generation products set to transform how we work and communicate in the digital age.",
    content: "<p>Tech content here.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-08",
    timeAgo: "4 hours ago",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "3",
    slug: "sports-championship-ends-dramatic-final",
    title: "Championship Ends in Dramatic Final Seconds",
    excerpt: "Fans witnessed an unforgettable finish as the underdogs secured victory in the closing moments of the game.",
    content: "<p>Sports content.</p>",
    category: "Sports",
    categorySlug: "sports",
    date: "2025-02-07",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1461896836934-fff60766ef32?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1461896836934-fff60766ef32?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "4",
    slug: "political-summit-addresses-global-challenges",
    title: "Political Summit Addresses Global Challenges",
    excerpt: "World leaders convene to discuss climate, economy, and security in one of the most anticipated gatherings of the year.",
    content: "<p>Politics content.</p>",
    category: "Politics",
    categorySlug: "politics",
    date: "2025-02-07",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "5",
    slug: "entertainment-awards-show-highlights",
    title: "Entertainment Awards Show Highlights Best of the Year",
    excerpt: "Stars gathered for the annual ceremony celebrating outstanding achievements in film, music, and television.",
    content: "<p>Entertainment content.</p>",
    category: "Entertainment",
    categorySlug: "entertainment",
    date: "2025-02-06",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
    format: "video",
    featured: true,
  },
  {
    id: "6",
    slug: "more-news-story-one",
    title: "Scientists Discover New Species in Deep Ocean Expedition",
    excerpt: "Marine biologists report finding previously unknown life forms during a groundbreaking deep-sea mission.",
    content: "<p>Science content.</p>",
    category: "Science",
    categorySlug: "science",
    date: "2025-02-06",
    timeAgo: "2 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "7",
    slug: "more-news-story-two",
    title: "Economy Shows Signs of Recovery in Latest Report",
    excerpt: "New data suggests positive trends as markets respond to recent policy changes and consumer confidence grows.",
    content: "<p>Business content.</p>",
    category: "Business",
    categorySlug: "business",
    date: "2025-02-05",
    timeAgo: "3 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
    tags: ["Business", "Economy", "Markets", "Recovery"],
  },
  {
    id: "8",
    slug: "more-news-story-three",
    title: "Local Community Rallies for Environmental Initiative",
    excerpt: "Residents join forces to support green projects and sustainable living efforts in the region.",
    content: "<p>Local content.</p>",
    category: "Local",
    categorySlug: "local",
    date: "2025-02-05",
    timeAgo: "3 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "9",
    slug: "more-news-story-four",
    title: "Health Experts Share Tips for Winter Wellness",
    excerpt: "Doctors recommend practical steps to stay healthy during the cold season and flu peak.",
    content: "<p>Health content.</p>",
    category: "Health",
    categorySlug: "health",
    date: "2025-02-04",
    timeAgo: "4 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "10",
    slug: "more-news-story-five",
    title: "Education Reform Bill Passes Key Committee",
    excerpt: "Legislators advance measure that could reshape curriculum and funding for schools nationwide.",
    content: "<p>Education content.</p>",
    category: "Education",
    categorySlug: "education",
    date: "2025-02-04",
    timeAgo: "4 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "11",
    slug: "more-news-story-six",
    title: "Global Markets React to Central Bank Decisions",
    excerpt: "Investors weigh policy shifts as major economies signal changes in interest rates.",
    content: "<p>Markets content.</p>",
    category: "Business",
    categorySlug: "business",
    date: "2025-02-03",
    timeAgo: "5 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "12",
    slug: "more-news-story-seven",
    title: "New Study Links Diet to Long-Term Health Outcomes",
    excerpt: "Research highlights the impact of nutrition on aging and disease prevention.",
    content: "<p>Health content.</p>",
    category: "Health",
    categorySlug: "health",
    date: "2025-02-03",
    timeAgo: "5 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "13",
    slug: "more-news-story-eight",
    title: "Renewable Energy Projects Get Green Light",
    excerpt: "Officials approve major investments in solar and wind infrastructure.",
    content: "<p>Environment content.</p>",
    category: "Science",
    categorySlug: "science",
    date: "2025-02-02",
    timeAgo: "6 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "14",
    slug: "more-news-story-nine",
    title: "Film Festival Announces Lineup for Spring Edition",
    excerpt: "Organizers reveal the selection of features and documentaries for the upcoming event.",
    content: "<p>Entertainment content.</p>",
    category: "Entertainment",
    categorySlug: "entertainment",
    date: "2025-02-02",
    timeAgo: "6 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "15",
    slug: "more-news-story-ten",
    title: "Local Schools Adopt New Digital Learning Tools",
    excerpt: "District rolls out updated platforms to support hybrid and remote instruction.",
    content: "<p>Education content.</p>",
    category: "Education",
    categorySlug: "education",
    date: "2025-02-01",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "16",
    slug: "more-news-story-eleven",
    title: "Startup Raises Record Funding for AI Platform",
    excerpt: "Venture capital backs company focused on enterprise automation and analytics.",
    content: "<p>Tech content.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-01",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "17",
    slug: "more-news-story-twelve",
    title: "Community Garden Initiative Expands to New Neighborhoods",
    excerpt: "Volunteers and partners bring urban farming to more residents this season.",
    content: "<p>Local content.</p>",
    category: "Local",
    categorySlug: "local",
    date: "2025-01-31",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "18",
    slug: "more-news-story-thirteen",
    title: "Olympic Committee Updates Qualification Rules",
    excerpt: "Athletes and federations react to revised criteria for upcoming games.",
    content: "<p>Sports content.</p>",
    category: "Sports",
    categorySlug: "sports",
    date: "2025-01-31",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "19",
    slug: "more-news-story-fourteen",
    title: "Diplomatic Talks Resume Between Key Nations",
    excerpt: "Officials meet to discuss trade, security, and climate cooperation.",
    content: "<p>Politics content.</p>",
    category: "Politics",
    categorySlug: "politics",
    date: "2025-01-30",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "20",
    slug: "more-news-story-fifteen",
    title: "Researchers Publish Breakthrough in Battery Technology",
    excerpt: "New design could extend range and lifespan of electric vehicles.",
    content: "<p>Science content.</p>",
    category: "Science",
    categorySlug: "science",
    date: "2025-01-30",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  // ... existing posts ...
  {
    id: "21",
    slug: "agritech-startup-revolutionizes-farming",
    title: "Agritech Startup Revolutionizes Sustainable Farming",
    excerpt: "New drone technology helps farmers optimize crop yields and reduce water usage by 40%.",
    content: "<p>Agritech content.</p>",
    category: "Agritech",
    categorySlug: "agritech",
    date: "2025-01-29",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1625246333195-bfccf5240fae?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1625246333195-bfccf5240fae?w=400&q=80",
    format: "standard",
  },
  {
    id: "22",
    slug: "vertical-farming-expands-urban-areas",
    title: "Vertical Farming Expands in Major Urban Areas",
    excerpt: "Cities are adopting skyscraper farms to provide fresh produce locally and cut transport emissions.",
    content: "<p>Agritech content.</p>",
    category: "Agritech",
    categorySlug: "agritech",
    date: "2025-01-28",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80",
    format: "standard",
  },
  {
    id: "23",
    slug: "fintech-unicorn-launches-global-payments",
    title: "Fintech Unicorn Launches Instant Global Payments",
    excerpt: "The new platform allows businesses to transfer funds across borders in seconds with minimal fees.",
    content: "<p>Fintech content.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-01-27",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=400&q=80",
    format: "standard",
  },
  {
    id: "24",
    slug: "ai-driven-investment-tools-rise",
    title: "AI-Driven Investment Tools on the Rise",
    excerpt: "Retail investors are turning to artificial intelligence to manage portfolios and predict market trends.",
    content: "<p>Fintech content.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-01-26",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-openai-1",
    slug: "openai-announces-next-generation-vision-models",
    title: "OpenAI Announces Next-Generation Vision Models for Real-Time Analysis",
    excerpt: "The latest breakthrough from the AI giant promises to radically improve how machines understand complex visual environments in real-time.",
    content: "<p>OpenAI has unveiled its latest suite of vision models, pushing the boundaries of what's possible in artificial intelligence. These new models are designed specifically for high-speed, real-time visual processing, enabling applications ranging from advanced robotics to augmented reality.</p><p>According to the official announcement, the models show a 40% improvement in spatial reasoning and object detection accuracy compared to previous versions.</p>",
    category: "OpenAI",
    categorySlug: "openai",
    date: "2025-02-09",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-ai-1",
    slug: "ai-regulation-global-standards-2025",
    title: "Global Summit Reaches Landmark Agreement on AI Ethics and Regulation",
    excerpt: "Leaders from 50 nations have signed a historic pact to establish common safety standards and ethical guidelines for artificial intelligence development.",
    content: "<p>In a major victory for international cooperation, a global summit on AI governance has concluded with the signing of the first-ever comprehensive international treaty on AI safety. The agreement outlines strict requirements for transparency, accountability, and human oversight in high-risk AI applications.</p>",
    category: "AI",
    categorySlug: "ai",
    date: "2025-02-08",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4628c6820?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1620712943543-bcc4628c6820?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-meta-1",
    slug: "meta-unveils-advanced-augmented-reality-glasses",
    title: "Meta Unveils Highly Anticipated Advanced Augmented Reality Glasses",
    excerpt: "Mark Zuckerberg showcases the latest prototype of AR eyewear that aims to merge the digital and physical worlds more seamlessly than ever before.",
    content: "<p>Meta has finally pulled back the curtain on its long-rumored AR glasses project. The device, which looks like a pair of standard thick-framed glasses, features a high-resolution display capable of projecting holographic overlays directly onto the physical environment.</p>",
    category: "Meta",
    categorySlug: "meta",
    date: "2025-02-07",
    timeAgo: "3 days ago",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-uber-1",
    slug: "uber-expands-autonomous-delivery-network",
    title: "Uber Expands Autonomous Delivery Network to Five New Major Cities",
    excerpt: "The ride-sharing giant is doubling down on its robotic delivery efforts, bringing self-driving pods to more urban centers across the country.",
    content: "<p>Uber is continuing its aggressive push into autonomous technologies. Today, the company announced that its fleet of sidewalk delivery robots will now be operational in five more major cities, significantly expanding its reach beyond initial test markets.</p>",
    category: "Uber",
    categorySlug: "uber",
    date: "2025-02-06",
    timeAgo: "4 days ago",
    image: "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-amazon-1",
    slug: "amazon-launches-next-gen-fulfillment-centers",
    title: "Amazon Launches Next-Gen Fulfillment Centers with AI-Driven Logistics",
    excerpt: "New facilities utilize advanced robotics and predictive analytics to achieve unprecedented delivery speeds and efficiency.",
    content: "<p>Amazon has opened its most advanced fulfillment centers to date. These sites leverage a new generation of internal logistics software powered by large language models to predict inventory needs and optimize picker routes in real-time.</p>",
    category: "Amazon",
    categorySlug: "amazon",
    date: "2025-02-05",
    timeAgo: "5 days ago",
    image: "https://images.unsplash.com/photo-1521330784802-f58d208f3d17?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1521330784802-f58d208f3d17?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-agritech-1",
    slug: "precision-farming-satellite-iot",
    title: "Precision Farming: How Satellite IoT is Revolutionizing Crop Yields",
    excerpt: "New satellite constellations are providing farmers with real-time data on soil moisture and pest outbreaks with centimeter-level precision.",
    content: "<p>The integration of Satellite IoT into modern agriculture is transforming traditional farming methods into a data-driven science. By leveraging low-earth orbit satellite networks, farmers can now monitor vast fields without the need for terrestrial cellular coverage.</p>",
    category: "AgriTech",
    categorySlug: "agritech",
    date: "2025-02-04",
    timeAgo: "6 days ago",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-fintech-1",
    slug: "central-bank-digital-currencies-adoption",
    title: "The Rise of CBDCs: How Central Banks are Responding to the Crypto Wave",
    excerpt: "Public sentiment is shifting as major economies accelerate their plans to launch state-backed digital currencies by 2026.",
    content: "<p>Central Bank Digital Currencies (CBDCs) are no longer a theoretical concept. With several major economies moving into the pilot phase, the global financial landscape is on the cusp of its most significant transformation since the move to fiat currency.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-02-03",
    timeAgo: "1 week ago",
    image: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-edtech-1",
    slug: "virtual-classrooms-immersive-learning",
    title: "Beyond the Screen: Immersive VR Classrooms are the New Normal for STEM",
    excerpt: "Schools are increasingly adopting high-fidelity VR headsets to teach complex physics and chemistry experiments in a safe, virtual environment.",
    content: "<p>Virtual Reality in education is moving past the gimmick stage. Educators are finding that students retain 30% more information when conducting experiments in immersive 3D environments compared to traditional 2D video lessons.</p>",
    category: "EdTech",
    categorySlug: "edtech",
    date: "2025-02-02",
    timeAgo: "1 week ago",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-blockchain-1",
    slug: "decentralized-finance-regulation-balancing-act",
    title: "DeFi Regulation: The Delicate Balancing Act of 2025",
    excerpt: "Regulators are struggling to impose oversight on decentralized protocols without stifling the core innovation of permissionless finance.",
    content: "<p>The decentralized finance (DeFi) sector is facing a crossroads. As institutional interest grows, the pressure for compliance with traditional KYC and AML standards is creating a fundamental tension with the ethos of decentralized protocols.</p>",
    category: "Blockchain",
    categorySlug: "blockchain",
    date: "2025-02-01",
    timeAgo: "1 week ago",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-healthtech-1",
    slug: "personalized-medicine-dna-sequencing",
    title: "AI-Powered DNA Sequencing: The Key to Eradicating Rare Genetic Disorders",
    excerpt: "Recent advancements in computational biology are allowing doctors to tailor treatments to a patient's specific genetic makeup within hours.",
    content: "<p>Personalized medicine is entering its golden age. By combining low-cost rapid DNA sequencing with advanced machine learning models, healthcare providers can now predict drug reactions and identify rare pathogens with unprecedented speed.</p>",
    category: "HealthTech",
    categorySlug: "healthtech",
    date: "2025-01-31",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-cleantech-1",
    slug: "next-gen-solar-storage-solutions",
    title: "Breaking the Night: Solid-State Batteries for Long-Duration Solar Storage",
    excerpt: "A new breakthrough in electrolyte chemistry promises to make large-scale solar power viable even during weeks of minimal sunlight.",
    content: "<p>The dream of a 24/7 solar-powered grid is becoming reality. Solid-state battery technology is rapidly closing the gap between energy production and storage capacity, promising a safer and more durable alternative to lithium-ion.</p>",
    category: "CleanTech",
    categorySlug: "cleantech",
    date: "2025-01-30",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-spacetech-1",
    slug: "lunar-colony-mining-robots",
    title: "Mining the Moon: The First Fleet of Robotic Prospectors Set for Launch",
    excerpt: "International space agencies are partnering with private startups to deploy autonomous mining drones to the lunar south pole by year-end.",
    content: "<p>The lunar economy is starting to take shape. The first mission of robotic prospectors will aim to identify and extract water ice from permanently shadowed craters, a critical resource for future deep-space exploration.</p>",
    category: "SpaceTech",
    categorySlug: "spacetech",
    date: "2025-01-29",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-cyber-1",
    slug: "post-quantum-cryptography-security",
    title: "Quantum Resistance: Why the Pentagon is Rushing to Post-Quantum Standards",
    excerpt: "With the first viable quantum computers on the horizon, the race is on to secure the world's most sensitive data against future decryption.",
    content: "<p>Post-quantum cryptography is no longer a niche concern. National security agencies are mandates billions in spending to upgrade decryption-resistant standards before 'Q-day'—the day quantum computers can break RSA.</p>",
    category: "Cyber Security",
    categorySlug: "cyber-security",
    date: "2025-01-28",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-ecommerce-1",
    slug: "social-commerce-influencer-driven-sales",
    title: "Direct-to-Avatar: The New Frontier of Social commerce in the Metaverse",
    excerpt: "Fashion brands are finding more revenue in digital wearables than in physical collections as Gen Z embraces virtual identity.",
    content: "<p>Ecommerce is moving from websites to virtual worlds. The 'direct-to-avatar' market is projected to reach $100 billion by 2030, driven by the increasing integration of social media and immersive digital platforms.</p>",
    category: "eCommerce",
    categorySlug: "ecommerce",
    date: "2025-01-27",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-ev-1",
    slug: "ev-charging-infrastructure-wireless",
    title: "Goodbye Cables: Wireless Charging for EVs Begins City-Wide Trials",
    excerpt: "Smart road technology is allowing electric vehicles to charge while driving, potentially ending range anxiety for urban commuters.",
    content: "<p>Wireless EV charging is the next great leap for sustainable mobility. By embedding resonant inductive loops under city streets, electric vehicles can now 'top up' their batteries during stop-and-go traffic.</p>",
    category: "EV & Mobility",
    categorySlug: "ev-mobility",
    date: "2025-01-26",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-foodtech-1",
    slug: "lab-grown-meat-commercial-viability",
    title: "From Lab to Table: Cultivated Meat Reaches Price Parity with Premium Beef",
    excerpt: "New bioreactor designs and serum-free growth media are slashing costs for lab-grown protein, paving the way for mass-market adoption.",
    content: "<p>The cultivated meat industry has hit a major milestone. For the first time, the production cost of lab-grown beef patties has dropped to match that of high-end traditional grass-fed beef, signaling a shift in the future of global protein production.</p>",
    category: "FoodTech",
    categorySlug: "foodtech",
    date: "2025-01-25",
    timeAgo: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1584263343327-4479f8249608?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1584263343327-4479f8249608?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-esports-1",
    slug: "esports-olympic-games-2026",
    title: "E-Sports officially Confirmed for the 2026 Winter Games: A New Era for Athletics",
    excerpt: "The International Olympic Committee has formally integrated competitive gaming into the upcoming games, marking a historic recognition for digital athletes.",
    content: "<p>It's official: gaming is an Olympic sport. Starting in 2026, the world's best players will compete for gold in a specialized e-sports arena, featuring titles that emphasize physical movement and strategic depth.</p>",
    category: "E-Sports",
    categorySlug: "e-sports",
    date: "2025-01-24",
    timeAgo: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-web3-1",
    slug: "decentralized-cloud-storage-competitive-pricing",
    title: "Web 3.0: Decentralized Cloud Storage Under有意 50% Cheaper than AWS",
    excerpt: "New blockchain-based storage networks are undercuting traditional cloud providers by leveraging underutilized hard drive space worldwide.",
    content: "<p>The decentralized web is taking on the cloud giants. By distributing data across thousands of individual nodes rather than centralized data centers, Web 3.0 storage providers are offering higher uptime and lower costs than ever before.</p>",
    category: "Web 3.0",
    categorySlug: "web3",
    date: "2025-01-23",
    timeAgo: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-cyber-2",
    slug: "biometric-authentication-vulnerabilities-deepfakes",
    title: "Biometric Failure: Deepfakes are Successfully Bypassing Facial Recognition",
    excerpt: "Security experts warn of a new wave of synthetic media attacks that can mimic human biological signals to fool advanced biometric security systems.",
    content: "<p>Face ID and fingerprint scanners are no longer foolproof. The rapid growth of generative AI is allowing attackers to create realistic 3D masks and high-fidelity video clones that can deceive even the most sophisticated sensors.</p>",
    category: "Cyber Security",
    categorySlug: "cyber-security",
    date: "2025-01-22",
    timeAgo: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-d2c-1",
    slug: "sustainable-packaging-d2c-brands",
    title: "The Zero-Waste Boom: How D2C Brands are Eliminating Single-Use Plastic",
    excerpt: "Consumer brands are seeing a 20% increase in customer loyalty after switching to 100% compostable and refillable packaging systems.",
    content: "<p>Direct-to-consumer (D2C) brands are leading the charge in environmental sustainability. By bypassing traditional retail shelves, these companies have the flexibility to experiment with radical packaging innovations that reduce carbon footprints.</p>",
    category: "D2C",
    categorySlug: "d2c",
    date: "2025-01-21",
    timeAgo: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1605600611284-1b34c6ad0a4b?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1605600611284-1b34c6ad0a4b?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-events-dubai-1",
    slug: "dubai-tech-summit-2025-announcement",
    title: "Dubai Tech Summit 2025 to Host Record-Breaking 5,000 Global Startups",
    excerpt: "The UAE's flagship technology event prepares for its largest gathering yet, with a focus on sustainable smart city solutions and AI integration.",
    content: "<p>Dubai is cementing its status as a global tech hub. The upcoming 2025 Tech Summit promises to be the most influential yet, bringing together investors, founders, and government leaders from across the Middle East and beyond.</p>",
    category: "Events",
    categorySlug: "events",
    date: "2025-01-20",
    timeAgo: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-fintech-2",
    slug: "open-banking-evolution-personalized-finance",
    title: "Open Banking 2.0: AI-Driven Personal Finance is Rendering Banks Obsolete",
    excerpt: "New fintech apps are using real-time spending data to automatically switch users to higher-yield accounts and cheaper insurance providers.",
    content: "<p>The second wave of open banking is here. By granting third-party apps direct access to financial data, consumers are benefiting from hyper-personalized tools that manage money more effectively than any human advisor could.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-01-19",
    timeAgo: "1 month ago",
    image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=400&q=80",
    format: "standard",
  },
  {
    id: "sn-agritech-2",
    slug: "vertical-farming-urban-food-security",
    title: "Vertical Farming: The Solution to Growing Food in Underserved Urban Deserts",
    excerpt: "High-tech indoor farms are producing fresh produce year-round in the heart of cities, reducing transportation emissions and food waste.",
    content: "<p>Vertical farming is scaling up. As city populations explode, the demand for locally-grown, pesticide-free food is being met by automated hydroponic towers that use 95% less water than traditional agriculture.</p>",
    category: "AgriTech",
    categorySlug: "agritech",
    date: "2025-01-18",
    timeAgo: "1 month ago",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&q=80",
    format: "standard",
  },
];

// Generate more mock posts to test pagination
const categories = [
  "Agritech", "Tech", "Business", "AI", "Fintech", "eCommerce", "EdTech",
  "FoodTech", "E-Sports", "HealthTech", "Social Media", "Web3", "SpaceTech",
  "CleanTech", "Cyber Security", "D2C", "EV Mobility", "Blockchain", "AI DeepTech"
];
for (let i = 0; i < 400; i++) {
  const cat = categories[i % categories.length];
  const catSlug = cat.toLowerCase().replace(/ /g, "-").replace(/[&.]/g, "");

  mockPosts.push({
    id: `generated-${i}`,
    slug: `generated-post-${i}`,
    title: `Generated ${cat} News Title ${i}`,
    excerpt: `This is a generated post for ${cat} to test the layout and pagination for all sector pages.`,
    content: "<p>Content...</p>",
    category: cat,
    categorySlug: catSlug,
    date: "2025-01-01",
    timeAgo: "Recently",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80",
    format: "standard"
  });
}

export function getFeaturedPosts(): Post[] {
  return mockPosts.filter((p) => p.featured).slice(0, 5);
}

/** First post = main featured, next 2 = sub stories (feat1 left column) */
export function getFeat1LeftPosts(): { main: Post; sub: [Post, Post] } {
  const featured = getFeaturedPosts();
  const main = featured[0];
  const sub: [Post, Post] = [featured[1], featured[2]];
  return { main, sub };
}

/** 5 posts for Trending column (exclude main featured 3) */
export function getTrendingPosts(): Post[] {
  const featured = getFeaturedPosts();
  const exclude = featured.slice(0, 3).map((p) => p.id);
  return mockPosts.filter((p) => !exclude.includes(p.id)).slice(0, 5);
}

/** Posts for Latest/Videos/Galleries list in feat1 right column (small thumb list) */
export function getFeat1ListPosts(excludeIds: string[] = []): Post[] {
  return mockPosts.filter((p) => !excludeIds.includes(p.id)).slice(0, 13);
}

/** All posts for More News section (home shows 10, load more 10 on click; no limit here) */
export function getMoreNewsPosts(excludeIds: string[] = []): Post[] {
  return mockPosts.filter((p) => !excludeIds.includes(p.id));
}

/** Posts by category for homepage widget sections */
export function getPostsByCategory(categorySlug: string, limit = 10): Post[] {
  return mockPosts.filter((p) => p.categorySlug === categorySlug).slice(0, limit);
}

/** All posts for a category section: 1 featured + 2 right + 3–6 side list (Feat2: Entertainment, Business) */
export function getCategorySectionPosts(categorySlug: string): {
  featured: Post | null;
  right: [Post, Post];
  list: Post[];
} {
  const posts = getPostsByCategory(categorySlug, 9);
  const featured = posts[0] ?? null;
  const right: [Post, Post] = [posts[1], posts[2]].filter(Boolean) as [Post, Post];
  const list = posts.slice(3, 9);
  if (right.length < 2) {
    const extra = mockPosts.filter((p) => p.categorySlug !== categorySlug).slice(0, 2 - right.length);
    right.push(...extra);
  }
  if (list.length < 3) {
    list.push(...mockPosts.filter((p) => !list.find((x) => x.id === p.id)).slice(0, 6 - list.length));
  }
  return { featured, right: right as [Post, Post], list };
}

/** Dark section: 1 featured + 4 list (Videos) */
export function getDarkSectionPosts(categorySlug: string): { featured: Post | null; list: Post[] } {
  const posts = getPostsByCategory(categorySlug, 5);
  const featured = posts[0] ?? null;
  let list = posts.slice(1, 5);
  if (list.length < 4) {
    list = list.concat(
      mockPosts.filter((p) => !list.find((x) => x.id === p.id) && p.id !== featured?.id).slice(0, 4 - list.length)
    );
  }
  return { featured, list };
}

/** Feat1 section: 2 top + 4 bottom (Tech) */
export function getFeat1SectionPosts(categorySlug: string): {
  top: [Post, Post];
  bottom: [Post, Post, Post, Post];
} {
  const posts = getPostsByCategory(categorySlug, 6);
  const top: [Post, Post] = [posts[0], posts[1]].filter(Boolean) as [Post, Post];
  let bottom = posts.slice(2, 6) as Post[];
  if (top.length < 2) {
    const extra = mockPosts.filter((p) => !top.find((x) => x.id === p.id)).slice(0, 2 - top.length);
    (top as Post[]).push(...extra);
  }
  if (bottom.length < 4) {
    bottom = bottom.concat(
      mockPosts.filter((p) => !bottom.find((x) => x.id === p.id) && !top.find((x) => x.id === p.id)).slice(0, 4 - bottom.length)
    ) as [Post, Post, Post, Post];
  }
  return { top: top as [Post, Post], bottom: bottom as [Post, Post, Post, Post] };
}

export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return mockPosts;
}

/** Related posts for single post "You may like": same category first, then others to fill up to limit */
export function getRelatedPosts(excludeSlug: string, categorySlug: string, limit = 6): Post[] {
  const sameCategory = mockPosts.filter(
    (p) => p.slug !== excludeSlug && p.categorySlug === categorySlug
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const otherCategory = mockPosts.filter(
    (p) => p.slug !== excludeSlug && p.categorySlug !== categorySlug
  );
  return [...sameCategory, ...otherCategory].slice(0, limit);
}

/** Previous/next post by date order (by id for mock). Never returns current post. */
export function getPrevNextPosts(currentSlug: string): { prev: Post | null; next: Post | null } {
  const idx = mockPosts.findIndex((p) => p.slug === currentSlug);
  if (idx < 0) return { prev: null, next: null };
  const prevPost = idx > 0 ? mockPosts[idx - 1] ?? null : null;
  const nextPost = idx < mockPosts.length - 1 ? mockPosts[idx + 1] ?? null : null;
  return {
    prev: prevPost?.slug === currentSlug ? null : prevPost,
    next: nextPost?.slug === currentSlug ? null : nextPost,
  };
}

/** Posts with format video for Videos tab */
export function getVideoPosts(limit = 10): Post[] {
  return mockPosts.filter((p) => p.format === "video").slice(0, limit);
}

/** Default event card image (reference has image on top of each card) */
const DEFAULT_EVENT_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80";

/** Startup Events (from StartupNews.fyi reference) – location, date, title, url, excerpt, image for event-by-country page */
export interface StartupEvent {
  location: string;
  date: string;
  title: string;
  url: string;
  excerpt?: string;
  /** Card image URL; uses default if not set */
  image?: string;
}

export function getEventImage(event: StartupEvent): string {
  return event.image ?? DEFAULT_EVENT_IMAGE;
}

const EVENTS_BASE = "https://startupnews.thebackend.in/startup-events";

/** Order of regions for event-by-country page (matches reference layout) */
export const EVENTS_REGION_ORDER = [
  "Bengaluru",
  "Cohort",
  "Delhi NCR",
  "Dubai",
  "Hyderabad",
  "International Events",
  "Mumbai",
  "Other Cities",
] as const;

export const startupEvents: StartupEvent[] = [
  { location: "Bengaluru", date: "21 February 2026", title: "Healthcare Summit | Bangalore | 21 February 2026", url: `${EVENTS_BASE}/healthcare-summit-bangalore-21-february-2026/`, excerpt: "Calling Global Thought Leaders & Changemakers at Healthcare Summit 2026. Engage with curated sessions on…" },
  { location: "Bengaluru", date: "21 February 2026", title: "D2C Insider Regional CXO Meets | Bangalore | 21 February 2026", url: `${EVENTS_BASE}/d2c-insider-regional-cxo-meets-bangalore-21-february-2026/`, excerpt: "D2C Insider Regional CXO Meets Where D2C Leaders Connect & Collaborate! Join D2C Insider's most exclusive Regional…" },
  { location: "Bengaluru", date: "09 April 2026", title: "Connected, Autonomous & Electric Vehicle EXPO | Bangalore | 9-10 April 2026", url: `${EVENTS_BASE}/connected-autonomous-electric-vehicle-expo-bangalore-9-10-april-2026/`, excerpt: "Asia's biggest Connected, Autonomous & Electric Vehicle EXPO will be held on 09–10 April 2026 at the KTPO Convention…" },
  { location: "Cohort", date: "15 February 2026", title: "Onest Entrepreneurship Fellowship | Co-Hort | 1 December – 1 June", url: `${EVENTS_BASE}/onest-entrepreneurship-fellowship-co-hort-1-december-1-june/`, excerpt: "If you are building / wanting to build solutions for Employment, you can't miss this…" },
  { location: "Delhi NCR", date: "13 February 2026", title: "Community Networking Meetup : For Entrepreneurs By Entrepreneurs | Delhi | 13 February", url: `${EVENTS_BASE}/community-networking-meetup-for-entrepreneurs-by-entrepreneurs-delhi-13-february/`, excerpt: "Looking to connect with fellow entrepreneurs, share ideas, and build real relationships? This is an…" },
  { location: "Delhi NCR", date: "25 February 2026", title: "Municipalika | Delhi | 25-27 February", url: `${EVENTS_BASE}/municipalika-delhi-25-27-february/`, excerpt: "MUNICIPALIKA is India's oldest and largest trade show and conference on safe, smart and sustainable cities." },
  { location: "Delhi NCR", date: "14 March 2026", title: "India Smart Utility Week 2026 | Delhi | 10-14 March", url: `${EVENTS_BASE}/india-smart-utility-week-2026-delhi-10-14-march/`, excerpt: "The 12th edition of ISUW is scheduled from 10 - 14 March 2026 in New…" },
  { location: "Dubai", date: "12 February 2026", title: "The GATE Summit | Dubai | 12 February 2026", url: `${EVENTS_BASE}/the-gate-summit-dubai-12-february-2026/`, excerpt: "The GATE Summit Dubai 2026 (3rd Edition) will take place on 12 February 2026 in Dubai, UAE. Building on…" },
  { location: "Dubai", date: "28 April 2026", title: "The Experience Show Middle East 2026 | Dubai | 28-29 April", url: `${EVENTS_BASE}/the-experience-show-middle-east-2026-dubai-28-29-april/`, excerpt: "The Experience Show Middle East, encompassing the region's most prestigious CX Live Show, helps organisations…" },
  { location: "Dubai", date: "28 April 2026", title: "Operational Excellence Show Middle East 2026 | Dubai | 28-29 April", url: `${EVENTS_BASE}/operational-excellence-show-middle-east-2026-dubai-28-29-april/`, excerpt: "The Operational Excellence Show Middle East 2026 (CPD-accredited), taking place on 28-29 April in Dubai,…" },
  { location: "Dubai", date: "05 May 2026", title: "GISEC GLOBAL 2026 | Dubai | 5-7 May, 2026", url: `${EVENTS_BASE}/gisec-global-2026-dubai-5-7-may-2026/`, excerpt: "The largest cybersecurity event in the Middle East and Africa, in collaboration with the UAE Cybersecurity Council and Dubai…" },
  { location: "Hyderabad", date: "23 April 2026", title: "India Pharma Expo 2026 | Hyderabad | 23-25 April, 2026", url: `${EVENTS_BASE}/india-pharma-expo-2026-hyderabad-23-25-april-2026/`, excerpt: "India Pharma Expo 2026 is a premier international exhibition and conference dedicated to the pharmaceutical,…" },
  { location: "International Events", date: "15 February 2026", title: "World Advanced Manufacturing Saudi | Riyadh | 15-17 February, 2026", url: `${EVENTS_BASE}/world-advanced-manufacturing-saudi-riyadh-15-17-february-2026/`, excerpt: "WAM Saudi 2026 is organised by KAOUN International (a subsidiary of Dubai World Trade Centre)…" },
  { location: "International Events", date: "26 February 2026", title: "3rd Fintech Week & Expo 2026 | Amsterdam | 26-27 February", url: `${EVENTS_BASE}/3rd-fintech-week-expo-2026-amsterdam-26-27-february/`, excerpt: "3rd Fintech Week & Expo Amsterdam 2026 unites a vibrant international community of fintech innovators,…" },
  { location: "International Events", date: "25 March 2026", title: "ASEAN Smart Energy & Energy Storage Expo 2026 | Thailand | March 25-26", url: `${EVENTS_BASE}/asean-smart-energy-energy-storage-expo-2026-thailand-march-25-26/`, excerpt: "Guided by the Ministry of Energy of Thailand & Electricity Generating Authority of Thailand (EGAT)…" },
  { location: "International Events", date: "25 March 2026", title: "ASEAN Solar PV & Energy Storage Expo 2026 | Thailand | March 25-27", url: `${EVENTS_BASE}/asean-solar-pv-energy-storage-expo-2026-thailand-march-25-27/`, excerpt: "ASEAN Solar PV & Energy Storage Expo 2026 will be held in Bangkok Thailand on…" },
  { location: "International Events", date: "07 April 2026", title: "Education 2.0 Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/education-2-0-conference-usa-7-9-april-2026/`, excerpt: "The Education 2.0 Conference will be held over three days at the InterContinental, Dubai Festival…" },
  { location: "International Events", date: "07 April 2026", title: "CXO 2.0 Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/cxo-2-0-conference-usa-7-9-april-2026/`, excerpt: "The CXO 2.0 Conference will bring together senior leaders, decision-makers, and emerging voices from across…" },
  { location: "International Events", date: "07 April 2026", title: "Founders 2.0 Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/founders-2-0-conference-usa-7-9-april-2026/`, excerpt: "The Founders 2.0 Conference gathers entrepreneurs, startup leaders, and innovators for two dynamic editions…" },
  { location: "International Events", date: "07 April 2026", title: "FUELD Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/fueld-conference-usa-7-9-april-2026/`, excerpt: "The FUELD Conference is a global gathering of leaders, strategists, and innovators operating at the…" },
  { location: "International Events", date: "07 April 2026", title: "Health 2.0 Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/health-2-0-conference-usa-7-9-april-2026/`, excerpt: "The Health 2.0 Conference is set to convene global healthcare professionals and innovators for two…" },
  { location: "International Events", date: "09 April 2026", title: "CFO StraTech 2026 | Turkey | 9 April", url: `${EVENTS_BASE}/cfo-stratech-2026-turkey-9-april/`, excerpt: "Located at the crossroads of Europe, Asia, and the Middle East, Türkiye is entering a…" },
  { location: "International Events", date: "16 April 2026", title: "BFSI Philippines Summit | Philippines | 16 April 2026", url: `${EVENTS_BASE}/bfsi-philippines-summit-philippines-16-april-2026/`, excerpt: "As the proud organizers of the successful Digital Banking Asia Series for over a decade,…" },
  { location: "International Events", date: "21 April 2026", title: "Money20/20 Asia 2026 | Thailand | 21-23 April", url: `${EVENTS_BASE}/money-20-20-asia-2026-thailand-21-23-april/`, excerpt: "After two successful editions, Money20/20 Asia will return to Bangkok's state-of-the-art Queen Sirikit National Convention…" },
  { location: "International Events", date: "30 April 2026", title: "Asia Retail Innovation | Philippines | 30 April 2026", url: `${EVENTS_BASE}/asia-retail-innovation-philippines-30-april-2026/`, excerpt: "Since 2015, the Asia Retail & eCommerce Innovation Summit has been the premier platform for…" },
  { location: "International Events", date: "21 May 2026", title: "GLOBAL BIOPROCESSING & BIOTECHNOLOGY SUMMIT | Berlin | 21-22 May", url: `${EVENTS_BASE}/global-bioprocessing-biotechnology-summit-berlin-21-22-may/`, excerpt: "The Global Bioprocessing Summit will unite leading industry experts, researchers, and innovators to explore the…" },
  { location: "International Events", date: "02 June 2026", title: "Future Biotech Expo | USA | 2-3 June, 2026", url: `${EVENTS_BASE}/future-biotech-expo-usa-2-3-june-2026/`, excerpt: "The Future Biotech Expo is a premier international red biotechnology exhibition and conference dedicated to accelerating breakthroughs…" },
  { location: "International Events", date: "10 June 2026", title: "The Experience Show Asia | Singapore | 10-11 June", url: `${EVENTS_BASE}/the-experience-show-asia-singapore-10-11-june/`, excerpt: "The Experience Show Asia, encompassing the region's most prestigious CX Live Show, helps organisations develop…" },
  { location: "International Events", date: "16 June 2026", title: "4th Data Science & AI Summit | London | 16-17 June", url: `${EVENTS_BASE}/4th-data-science-ai-summit-london-16-17-june/`, excerpt: "Data Science Week is an international platform designed to bring together the brightest minds across…" },
  { location: "International Events", date: "18 June 2026", title: "London Biotechnology Show | London | 18-19 June, 2026", url: `${EVENTS_BASE}/london-biotechnology-show-london-18-19-june-2026/`, excerpt: "The London Biotechnology Show is a leading biotechnology industry event aimed at accelerating innovation and…" },
  { location: "International Events", date: "18 June 2026", title: "The Experience Show South Europe 2026 | Madrid | 18-19 June", url: `${EVENTS_BASE}/the-experience-show-south-europe-2026-madrid-18-19-june/`, excerpt: "The Experience Show South Europe, encompassing the region's most prestigious CX Live Show, helps organisations…" },
  { location: "International Events", date: "01 July 2026", title: "Smart Health Asia 2026 | Singapore | 1-2 July", url: `${EVENTS_BASE}/smart-health-asia-2026-singapore-1-2-july/`, excerpt: "Smart Health Asia is a platform dedicated to transforming healthcare across the region." },
  { location: "International Events", date: "07 July 2026", title: "The Experience Show UK 2026 | Manchester | 7-8 July", url: `${EVENTS_BASE}/the-experience-show-uk-2026-manchester-7-8-july/`, excerpt: "The Experience Show UK, encompassing the region's most prestigious CX Live Show, helps organisations develop…" },
  { location: "International Events", date: "28 July 2026", title: "The Experience Show Asia 2026 | Malaysia | 28-29 July", url: `${EVENTS_BASE}/the-experience-show-asia-2026-malaysia-28-29-july/`, excerpt: "The Experience Show Asia, encompassing the region's most prestigious CX Live Show, helps organisations develop…" },
  { location: "International Events", date: "04 August 2026", title: "The Experience Show 2026 | Australia | 4-5 August", url: `${EVENTS_BASE}/the-experience-show-2026-australia-4-5-august/`, excerpt: "The Experience Show Australia, encompassing the region's most prestigious CX Live Show, helps organisations develop…" },
  { location: "International Events", date: "10 September 2026", title: "ASEAN SHOP 2026 | Malaysia | 10 – 12 September", url: `${EVENTS_BASE}/asean-shop-2026-malaysia-10-12-september/`, excerpt: "ASEAN SHOP 2026 will take place from 10–12 September 2026 at MITEC, Kuala Lumpur, following…" },
  { location: "International Events", date: "16 September 2026", title: "11th World Battery & Energy Storage Industry Expo 2026 | China | September 16", url: `${EVENTS_BASE}/11th-world-battery-energy-storage-industry-expo-2026-china-september-16/`, excerpt: "WBE 2026 is set to take place from September 16th-18th at the China Import and…" },
  { location: "Mumbai", date: "12 February 2026", title: "IFEX 2026 – 22nd International Exhibition | Mumbai | 12-14 February", url: `${EVENTS_BASE}/ifex-2026-22nd-international-exhibition-mumbai-12-14-february/`, excerpt: "IFEX 2026 – 22nd International Exhibition on Foundry Technology Equipment Supplies and Services concurrent with…" },
  { location: "Mumbai", date: "05 October 2026", title: "Mumbai 2026 Venture Capital World Summit | Mumbai | 5 October", url: `${EVENTS_BASE}/mumbai-2026-venture-capital-world-summit-mumbai-5-october/`, excerpt: "Mumbai India Venture Capital World Summit, World Series Season of Investment Conferences Venture Capital World…" },
  { location: "Other Cities", date: "13 February 2026", title: "Community Networking Meetup: For Entrepreneurs By Entrepreneurs | Pune | 13 February", url: `${EVENTS_BASE}/community-networking-meetup-for-entrepreneurs-by-entrepreneurs-pune-13-february/`, excerpt: "Looking to connect with fellow entrepreneurs, share ideas, and build real relationships? This is an…" },
  { location: "Other Cities", date: "21 February 2026", title: "Le Startups Confluence | Gurugram | 21 February 2026", url: `${EVENTS_BASE}/le-startups-confluence-gurugram-21-february-2026/`, excerpt: "NASSCOM Innovation Hub, Gurugram. Join India's most impactful startup meetup crafted for founders investors and…" },
  { location: "Other Cities", date: "20 March 2026", title: "TECHSTARS STARTUP WEEKEND | SILIGURI | 20 – 22 March 2026", url: `${EVENTS_BASE}/techstars-startup-weekend-siliguri-20-22-march-2026/`, excerpt: "Startup Weekend is a three-day event organized by the Incubation cell at Inspiria Knowledge Campus,…" },
  { location: "Other Cities", date: "27 March 2026", title: "EV Future Summit India 2026 | Chennai | March 27", url: `${EVENTS_BASE}/ev-future-summit-india-2026-chennai-march-27/`, excerpt: "The EV Future Summit is a platform that brings together experts, industry leaders, and innovators…" },
  { location: "Other Cities", date: "19 November 2026", title: "Women in Tech Chennai – OutGeekWomen 2026 | Chennai | November 19", url: `${EVENTS_BASE}/women-in-tech-chennai-outgeekwomen-2026-chennai-november-19/`, excerpt: "All the badass women in tech, are you in? #outgeekwomen #womenintech We are happy to…" },
];

/** Events grouped by region for event-by-country page. Returns regions in EVENTS_REGION_ORDER with non-empty events. */
export function getEventsByRegion(): Record<string, StartupEvent[]> {
  const map: Record<string, StartupEvent[]> = {};
  for (const region of EVENTS_REGION_ORDER) {
    map[region] = startupEvents.filter((e) => e.location === region);
  }
  return map;
}
