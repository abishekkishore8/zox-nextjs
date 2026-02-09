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
    content: "<p>Major technology companies have unveiled a series of groundbreaking innovations that promise to reshape the digital landscape. These new products integrate advanced artificial intelligence with cutting-edge hardware, offering unprecedented capabilities for both consumers and enterprises.</p><p>The announcements include next-generation processors, AI-powered software solutions, and revolutionary communication technologies. Industry analysts predict these developments will accelerate the adoption of AI across multiple sectors, from healthcare to finance to manufacturing.</p><p>Experts believe these innovations represent a significant leap forward in computational power and machine learning capabilities, potentially enabling new applications that were previously thought impossible.</p>",
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
    content: "<p>A promising AI startup has secured a record-breaking funding round, raising over $200 million in Series B financing. The company specializes in enterprise automation and advanced analytics, helping businesses streamline operations through intelligent machine learning solutions.</p><p>The funding will be used to expand the platform's capabilities, particularly in deep learning and neural network optimization. The startup's technology has already been adopted by several Fortune 500 companies, demonstrating significant ROI through automated decision-making processes.</p><p>Industry experts see this as a validation of the growing demand for enterprise AI solutions that can handle complex business logic while maintaining transparency and explainability.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-01",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "21",
    slug: "deep-learning-breakthrough-revolutionizes-computer-vision",
    title: "Deep Learning Breakthrough Revolutionizes Computer Vision",
    excerpt: "Researchers achieve unprecedented accuracy in image recognition using novel neural network architectures.",
    content: "<p>Scientists have developed a revolutionary deep learning model that achieves human-level accuracy in computer vision tasks. The new architecture combines convolutional neural networks with transformer technology, creating a hybrid approach that outperforms previous state-of-the-art systems.</p><p>The breakthrough has significant implications for autonomous vehicles, medical imaging, and security systems. The model can process complex visual scenes with remarkable precision, identifying objects, patterns, and anomalies that were previously challenging for AI systems.</p><p>This advancement represents years of research in neural network optimization and demonstrates the rapid pace of innovation in the field of artificial intelligence. The research team has made their methodology open-source, encouraging further development in the community.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-07",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "22",
    slug: "quantum-computing-milestone-achieved-in-ai-research",
    title: "Quantum Computing Milestone Achieved in AI Research",
    excerpt: "Scientists successfully run complex machine learning algorithms on quantum processors, opening new possibilities.",
    content: "<p>In a landmark achievement, researchers have successfully executed advanced machine learning algorithms on quantum computing hardware. This breakthrough demonstrates the potential for quantum processors to solve AI problems that are intractable for classical computers.</p><p>The experiment involved training neural networks using quantum circuits, achieving results that would take exponentially longer on traditional systems. This development could accelerate drug discovery, financial modeling, and climate prediction simulations.</p><p>While still in early stages, this research points toward a future where quantum computing and artificial intelligence work synergistically to tackle humanity's most complex challenges. The team plans to scale their approach to larger quantum systems as hardware capabilities improve.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-06",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
    format: "standard",
  },
  {
    id: "23",
    slug: "neural-interface-technology-enables-direct-brain-computer-communication",
    title: "Neural Interface Technology Enables Direct Brain-Computer Communication",
    excerpt: "Breakthrough brain-computer interface allows users to control devices through thought alone.",
    content: "<p>A revolutionary neural interface has been developed that enables direct communication between the human brain and computers. The technology uses advanced AI algorithms to interpret neural signals, allowing users to control digital devices through thought alone.</p><p>Initial applications focus on assistive technologies for individuals with mobility impairments, but the potential extends to gaming, productivity tools, and even creative applications. The system achieves remarkable accuracy by leveraging deep learning models trained on extensive neural signal datasets.</p><p>Ethical considerations around privacy and cognitive autonomy are being actively discussed as the technology moves toward commercialization. Regulatory bodies are working to establish guidelines for safe and responsible deployment of brain-computer interfaces.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-05",
    timeAgo: "3 days ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    format: "standard",
  },
  {
    id: "24",
    slug: "generative-ai-transforms-content-creation-industry",
    title: "Generative AI Transforms Content Creation Industry",
    excerpt: "New AI models produce high-quality text, images, and video, reshaping creative workflows across industries.",
    content: "<p>Generative artificial intelligence has reached a tipping point, with new models capable of producing professional-grade content across multiple media types. These systems can generate written articles, create realistic images, and even produce video content with minimal human input.</p><p>Content creators, marketers, and media companies are rapidly adopting these tools to enhance productivity and explore new creative possibilities. The technology is particularly transformative for small businesses and independent creators who previously lacked access to high-end production resources.</p><p>However, the rise of generative AI has also sparked debates about intellectual property, authenticity, and the future of human creativity. Industry leaders are calling for balanced approaches that leverage AI capabilities while preserving the unique value of human artistic expression.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-04",
    timeAgo: "4 days ago",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
    format: "standard",
  },
  {
    id: "25",
    slug: "edge-ai-enables-real-time-processing-on-mobile-devices",
    title: "Edge AI Enables Real-Time Processing on Mobile Devices",
    excerpt: "Advanced optimization techniques bring powerful AI capabilities to smartphones and IoT devices.",
    content: "<p>Engineers have developed breakthrough optimization techniques that enable sophisticated AI models to run efficiently on mobile devices and edge computing hardware. This advancement eliminates the need for constant cloud connectivity, enabling real-time AI processing directly on smartphones, tablets, and IoT devices.</p><p>The technology uses model compression, quantization, and specialized hardware acceleration to achieve desktop-level AI performance in power-constrained environments. Applications include real-time language translation, advanced photography features, and intelligent personal assistants that work offline.</p><p>This development is particularly significant for privacy-conscious users and applications in remote areas with limited connectivity. It also reduces latency and improves responsiveness for AI-powered features in consumer electronics.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-03",
    timeAgo: "5 days ago",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e698e?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1512941937669-90a1b58e698e?w=400&q=80",
    format: "standard",
  },
  {
    id: "26",
    slug: "digital-banking-revolution-transforms-financial-services",
    title: "Digital Banking Revolution Transforms Financial Services",
    excerpt: "Neobanks and fintech platforms challenge traditional banking with innovative digital-first solutions.",
    content: "<p>The financial services industry is experiencing a fundamental transformation as digital banking platforms gain widespread adoption. Neobanks and fintech companies are offering seamless, mobile-first banking experiences that traditional institutions struggle to match.</p><p>These platforms leverage advanced technology to provide instant account opening, real-time transaction processing, and personalized financial insights. Features like AI-powered budgeting tools, automated savings, and instant peer-to-peer payments are becoming standard expectations among consumers.</p><p>Traditional banks are responding by investing heavily in digital transformation initiatives, but many face challenges with legacy systems and organizational inertia. The shift toward digital banking is expected to accelerate as younger generations, who are digital natives, become the primary banking demographic.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-02-08",
    timeAgo: "3 hours ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "27",
    slug: "cryptocurrency-adoption-reaches-mainstream-milestone",
    title: "Cryptocurrency Adoption Reaches Mainstream Milestone",
    excerpt: "Major retailers and financial institutions begin accepting digital currencies as payment methods.",
    content: "<p>Cryptocurrency has reached a significant milestone as major retailers, payment processors, and financial institutions announce plans to accept digital currencies. This mainstream adoption represents a major shift in how consumers and businesses think about money and transactions.</p><p>The integration of blockchain technology into traditional payment systems is enabling faster, more secure, and lower-cost transactions across borders. Financial institutions are developing infrastructure to support cryptocurrency trading, custody, and integration with existing banking services.</p><p>Regulatory clarity in several jurisdictions has provided the confidence needed for institutional adoption. However, challenges remain around volatility, energy consumption, and regulatory compliance as the industry continues to mature.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-02-07",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "28",
    slug: "ai-powered-fraud-detection-saves-billions-for-financial-institutions",
    title: "AI-Powered Fraud Detection Saves Billions for Financial Institutions",
    excerpt: "Machine learning algorithms identify and prevent fraudulent transactions in real-time.",
    content: "<p>Financial institutions are leveraging advanced artificial intelligence to combat fraud, saving billions of dollars annually. Machine learning algorithms analyze transaction patterns, user behavior, and contextual data to identify suspicious activities in real-time.</p><p>These AI systems can process millions of transactions per second, detecting anomalies that would be impossible for human analysts to catch. The technology continuously learns from new fraud patterns, adapting to evolving threats faster than traditional rule-based systems.</p><p>While the technology has significantly reduced fraud losses, it also presents challenges around false positives and the need for explainable AI to meet regulatory requirements. Financial institutions are investing in balancing security with user experience.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-02-06",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    format: "standard",
  },
  {
    id: "29",
    slug: "buy-now-pay-later-services-reshape-consumer-spending",
    title: "Buy Now Pay Later Services Reshape Consumer Spending",
    excerpt: "Flexible payment options gain popularity as consumers seek alternatives to credit cards.",
    content: "<p>Buy Now Pay Later (BNPL) services are rapidly transforming how consumers make purchases, offering flexible payment options without traditional credit card requirements. These fintech solutions allow customers to split purchases into interest-free installments, appealing particularly to younger demographics.</p><p>The convenience and accessibility of BNPL services have led to significant growth in adoption, with major retailers integrating these payment options at checkout. However, concerns are emerging about consumer debt levels and the need for responsible lending practices.</p><p>Regulators are beginning to examine BNPL services more closely, considering whether they should be subject to the same consumer protection regulations as traditional credit products. The industry is working to establish best practices for transparency and responsible lending.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-02-05",
    timeAgo: "3 days ago",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    format: "standard",
  },
  {
    id: "30",
    slug: "open-banking-apis-enable-financial-innovation",
    title: "Open Banking APIs Enable Financial Innovation",
    excerpt: "Regulatory frameworks promote data sharing, enabling new financial services and products.",
    content: "<p>Open banking regulations are fostering innovation by requiring financial institutions to share customer data through secure APIs. This shift is enabling fintech companies to build new services that aggregate financial information, provide better insights, and offer personalized financial products.</p><p>Consumers can now access comprehensive views of their finances across multiple accounts and institutions through single applications. This transparency is driving competition and innovation in financial services, with new products emerging that help users manage money more effectively.</p><p>While open banking promises significant benefits, it also raises important questions about data privacy and security. Financial institutions and fintech companies must implement robust security measures and obtain clear consent from consumers to use their financial data.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-02-04",
    timeAgo: "4 days ago",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    format: "standard",
  },
  {
    id: "31",
    slug: "robo-advisors-democratize-investment-management",
    title: "Robo-Advisors Democratize Investment Management",
    excerpt: "Automated investment platforms make professional portfolio management accessible to all investors.",
    content: "<p>Robo-advisors are making professional investment management accessible to a broader range of investors through automated, algorithm-driven portfolio management. These platforms use modern portfolio theory and advanced algorithms to create and manage diversified investment portfolios with minimal fees.</p><p>The technology has particularly appealed to younger investors and those with smaller account balances who previously couldn't access professional investment management. Robo-advisors offer features like automatic rebalancing, tax-loss harvesting, and goal-based investing strategies.</p><p>As the technology matures, robo-advisors are expanding their offerings to include retirement planning, estate planning, and more sophisticated investment strategies. The industry is also seeing hybrid models that combine automated investing with access to human financial advisors.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-02-03",
    timeAgo: "5 days ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    format: "standard",
  },
  {
    id: "32",
    slug: "central-bank-digital-currencies-enter-pilot-phase",
    title: "Central Bank Digital Currencies Enter Pilot Phase",
    excerpt: "Multiple countries test digital versions of their national currencies for public use.",
    content: "<p>Central banks around the world are advancing their digital currency initiatives, with several countries entering pilot phases for Central Bank Digital Currencies (CBDCs). These digital versions of national currencies aim to combine the benefits of digital payments with the stability and backing of central banks.</p><p>CBDCs promise to improve payment efficiency, reduce transaction costs, and enhance financial inclusion. They could also provide central banks with new tools for monetary policy implementation and better visibility into economic transactions.</p><p>However, the development of CBDCs raises complex questions about privacy, cybersecurity, and the role of commercial banks. Central banks are carefully designing these systems to balance innovation with stability and security, engaging with stakeholders to address concerns and ensure successful implementation.</p>",
    category: "Fintech",
    categorySlug: "fintech",
    date: "2025-02-02",
    timeAgo: "6 days ago",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80",
    format: "standard",
  },
  {
    id: "33",
    slug: "social-media-platforms-embrace-creator-economy",
    title: "Social Media Platforms Embrace Creator Economy",
    excerpt: "Major platforms introduce new monetization tools and revenue sharing programs for content creators.",
    content: "<p>Social media platforms are fundamentally reshaping their business models to better support content creators, recognizing that creators drive engagement and platform growth. New monetization tools, revenue sharing programs, and creator funds are being launched across major platforms.</p><p>These initiatives enable creators to earn income directly from their content through subscriptions, tips, brand partnerships, and platform revenue sharing. The creator economy has become a multi-billion dollar industry, with platforms competing to attract and retain top talent.</p><p>However, creators face challenges around algorithm changes, platform policies, and income stability. Many are diversifying across multiple platforms to reduce dependency on any single platform's policies or algorithm updates.</p>",
    category: "Social Media",
    categorySlug: "social-media",
    date: "2025-02-08",
    timeAgo: "2 hours ago",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "34",
    slug: "short-form-video-dominates-social-media-landscape",
    title: "Short-Form Video Dominates Social Media Landscape",
    excerpt: "TikTok-style content formats reshape user engagement and platform strategies across the industry.",
    content: "<p>Short-form video content has become the dominant format across social media platforms, with platforms like TikTok, Instagram Reels, and YouTube Shorts driving unprecedented engagement rates. This shift is fundamentally changing how users consume content and how brands approach social media marketing.</p><p>The format's success lies in its ability to capture attention quickly, deliver entertainment or information in digestible segments, and leverage algorithm-driven discovery. Content creators are adapting their strategies to excel in this fast-paced, attention-competitive environment.</p><p>Brands and marketers are investing heavily in short-form video production, recognizing its effectiveness in reaching younger demographics and driving viral content. The format's mobile-first nature aligns perfectly with how most users access social media today.</p>",
    category: "Social Media",
    categorySlug: "social-media",
    date: "2025-02-07",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "35",
    slug: "privacy-concerns-drive-social-media-regulation",
    title: "Privacy Concerns Drive Social Media Regulation",
    excerpt: "Governments worldwide implement stricter data protection laws affecting social media platforms.",
    content: "<p>Growing concerns about data privacy and user protection are driving governments to implement stricter regulations for social media platforms. New laws require platforms to be more transparent about data collection, give users greater control over their information, and face significant penalties for violations.</p><p>These regulations are forcing platforms to redesign their data practices, privacy settings, and user consent mechanisms. Some platforms are proactively implementing privacy-focused features to differentiate themselves in the market.</p><p>While these regulations aim to protect users, they also present challenges for platforms' business models, which often rely on targeted advertising based on user data. Platforms are exploring alternative revenue streams and advertising methods that comply with new privacy requirements.</p>",
    category: "Social Media",
    categorySlug: "social-media",
    date: "2025-02-06",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    format: "standard",
  },
  {
    id: "36",
    slug: "influencer-marketing-evolves-into-mainstream-advertising",
    title: "Influencer Marketing Evolves into Mainstream Advertising",
    excerpt: "Brands allocate larger budgets to influencer partnerships as traditional advertising effectiveness declines.",
    content: "<p>Influencer marketing has evolved from a niche strategy to a mainstream advertising channel, with brands allocating significant portions of their marketing budgets to creator partnerships. This shift reflects changing consumer behavior, particularly among younger demographics who trust recommendations from creators over traditional advertisements.</p><p>The industry has become more sophisticated, with agencies specializing in influencer management, analytics tools measuring campaign effectiveness, and standardized contracts protecting both brands and creators. Micro-influencers are gaining attention for their authentic connections with niche audiences.</p><p>However, the industry faces challenges around disclosure requirements, fake engagement, and measuring true ROI. Brands are becoming more selective, seeking creators whose audiences align with their target demographics and whose engagement is authentic.</p>",
    category: "Social Media",
    categorySlug: "social-media",
    date: "2025-02-05",
    timeAgo: "3 days ago",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
    format: "standard",
  },
  {
    id: "37",
    slug: "social-commerce-transforms-online-shopping-experience",
    title: "Social Commerce Transforms Online Shopping Experience",
    excerpt: "Platforms integrate shopping features directly into social feeds, enabling seamless purchases.",
    content: "<p>Social commerce is revolutionizing online shopping by integrating purchasing capabilities directly into social media platforms. Users can now discover, research, and buy products without leaving their favorite social apps, creating a seamless shopping experience.</p><p>Platforms are investing heavily in features like in-app checkout, live shopping events, and shoppable posts. Brands are adapting their social media strategies to include direct sales, recognizing the power of social proof and impulse purchasing in social environments.</p><p>The convergence of social media and e-commerce is particularly effective for fashion, beauty, and lifestyle products, where visual content and peer recommendations drive purchasing decisions. This trend is expected to continue growing as platforms enhance their commerce capabilities.</p>",
    category: "Social Media",
    categorySlug: "social-media",
    date: "2025-02-04",
    timeAgo: "4 days ago",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    format: "standard",
  },
  {
    id: "38",
    slug: "algorithm-changes-impact-content-discoverability",
    title: "Algorithm Changes Impact Content Discoverability",
    excerpt: "Platform algorithm updates reshape how content reaches audiences, affecting creators and brands.",
    content: "<p>Social media platforms regularly update their algorithms, significantly impacting how content is discovered and distributed. These changes can dramatically affect creators' reach, engagement rates, and revenue, making algorithm understanding crucial for success.</p><p>Recent algorithm shifts have emphasized authentic engagement, original content, and user preferences over follower counts. Platforms are prioritizing content that keeps users on-platform longer and drives meaningful interactions rather than passive consumption.</p><p>Creators and brands must continuously adapt their content strategies to align with algorithm preferences. This includes understanding optimal posting times, content formats, engagement tactics, and staying informed about platform updates and best practices.</p>",
    category: "Social Media",
    categorySlug: "social-media",
    date: "2025-02-03",
    timeAgo: "5 days ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    format: "standard",
  },
  {
    id: "39",
    slug: "community-platforms-foster-niche-connections",
    title: "Community Platforms Foster Niche Connections",
    excerpt: "Specialized social networks gain popularity as users seek more focused, meaningful interactions.",
    content: "<p>Niche community platforms are gaining traction as users seek more focused, meaningful social connections beyond mainstream platforms. These specialized networks bring together people with shared interests, hobbies, or professional goals, fostering deeper engagement and community building.</p><p>Unlike broad social media platforms, community platforms often feature discussion forums, interest-based groups, and tools designed for specific use cases. They appeal to users who want more control over their social experience and connections with like-minded individuals.</p><p>This trend reflects a broader shift toward quality over quantity in social interactions. Users are increasingly valuing meaningful connections and relevant content over the broad reach and viral potential of mainstream platforms.</p>",
    category: "Social Media",
    categorySlug: "social-media",
    date: "2025-02-02",
    timeAgo: "6 days ago",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    format: "standard",
  },
  {
    id: "40",
    slug: "electric-vehicle-adoption-accelerates-globally",
    title: "Electric Vehicle Adoption Accelerates Globally",
    excerpt: "Record sales numbers and expanding charging infrastructure drive EV market growth worldwide.",
    content: "<p>Electric vehicle adoption has reached unprecedented levels globally, with sales records being broken quarter after quarter. Governments, automakers, and consumers are increasingly embracing electric mobility as a solution to climate change and air quality concerns.</p><p>The expansion of charging infrastructure, improvements in battery technology, and a growing variety of EV models across all price segments are making electric vehicles more accessible to mainstream consumers. Major automakers are committing billions to electrify their fleets, signaling a fundamental shift in the automotive industry.</p><p>While challenges remain around charging availability in some regions and upfront costs, falling battery prices and government incentives are making EVs increasingly competitive with traditional vehicles. The transition to electric mobility is expected to accelerate as technology continues to improve and costs decline.</p>",
    category: "EV & Mobility",
    categorySlug: "ev-mobility",
    date: "2025-02-08",
    timeAgo: "1 hour ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
    featured: true,
  },
  {
    id: "41",
    slug: "autonomous-vehicles-enter-commercial-deployment",
    title: "Autonomous Vehicles Enter Commercial Deployment",
    excerpt: "Self-driving technology reaches new milestones as companies launch commercial robotaxi services.",
    content: "<p>Autonomous vehicle technology has reached a critical milestone with several companies launching commercial robotaxi services in select cities. These deployments represent years of development in sensor technology, artificial intelligence, and safety systems, bringing self-driving vehicles closer to widespread adoption.</p><p>The technology promises to revolutionize transportation by reducing accidents, improving traffic flow, and providing mobility options for those unable to drive. However, challenges around regulatory approval, public acceptance, and edge case handling remain significant hurdles to overcome.</p><p>As autonomous vehicles become more common, questions about job displacement, infrastructure requirements, and liability are emerging. Policymakers and industry leaders are working together to address these concerns while ensuring safe and equitable deployment of the technology.</p>",
    category: "EV & Mobility",
    categorySlug: "ev-mobility",
    date: "2025-02-07",
    timeAgo: "1 day ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
    featured: true,
  },
  {
    id: "42",
    slug: "battery-technology-breakthrough-extends-ev-range",
    title: "Battery Technology Breakthrough Extends EV Range",
    excerpt: "New solid-state batteries promise longer range and faster charging for electric vehicles.",
    content: "<p>Breakthrough developments in battery technology are addressing one of the primary concerns about electric vehicles: range anxiety. New solid-state battery designs promise significantly longer driving ranges, faster charging times, and improved safety compared to current lithium-ion batteries.</p><p>These advancements could make electric vehicles practical for long-distance travel and reduce charging times to minutes rather than hours. Automakers are investing heavily in battery research and development, recognizing that battery technology is a key competitive differentiator in the EV market.</p><p>While these technologies show great promise, challenges around manufacturing scale, cost, and durability remain. However, the pace of innovation suggests that these barriers will be overcome, potentially accelerating the transition to electric mobility.</p>",
    category: "EV & Mobility",
    categorySlug: "ev-mobility",
    date: "2025-02-06",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
    format: "standard",
  },
  {
    id: "43",
    slug: "micromobility-solutions-transform-urban-transportation",
    title: "Micromobility Solutions Transform Urban Transportation",
    excerpt: "E-scooters, e-bikes, and shared mobility services reshape how people navigate cities.",
    content: "<p>Micromobility solutions including electric scooters, e-bikes, and shared mobility services are transforming urban transportation. These compact, electric-powered vehicles offer convenient alternatives to cars for short-distance trips, reducing congestion and emissions in cities.</p><p>Shared mobility platforms have made these options accessible to millions of urban residents, with apps enabling easy access to scooters and bikes throughout cities. The convenience and affordability of these services are driving adoption, particularly among younger urban dwellers.</p><p>However, the rapid growth of micromobility has also raised concerns about safety, sidewalk clutter, and regulation. Cities are working to develop frameworks that balance innovation with public safety and urban planning considerations.</p>",
    category: "EV & Mobility",
    categorySlug: "ev-mobility",
    date: "2025-02-05",
    timeAgo: "3 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "44",
    slug: "charging-infrastructure-expansion-addresses-ev-adoption-barriers",
    title: "Charging Infrastructure Expansion Addresses EV Adoption Barriers",
    excerpt: "Public and private investments accelerate deployment of fast-charging networks globally.",
    content: "<p>Significant investments in charging infrastructure are addressing one of the key barriers to electric vehicle adoption. Governments and private companies are deploying fast-charging networks along highways, in urban areas, and at workplaces, making EV ownership more practical for a broader range of consumers.</p><p>The expansion includes ultra-fast charging stations capable of adding hundreds of miles of range in minutes, as well as more accessible Level 2 chargers for overnight and workplace charging. This infrastructure development is critical for supporting the growing number of electric vehicles on the road.</p><p>Standardization efforts are also improving the charging experience, with initiatives to create universal connectors and payment systems. However, challenges remain around grid capacity, rural coverage, and ensuring equitable access to charging infrastructure.</p>",
    category: "EV & Mobility",
    categorySlug: "ev-mobility",
    date: "2025-02-04",
    timeAgo: "4 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "45",
    slug: "shared-mobility-platforms-redefine-urban-transportation",
    title: "Shared Mobility Platforms Redefine Urban Transportation",
    excerpt: "Car-sharing, ride-hailing, and mobility-as-a-service models reshape transportation economics.",
    content: "<p>Shared mobility platforms are fundamentally changing how people think about transportation ownership and usage. Car-sharing services, ride-hailing apps, and mobility-as-a-service platforms are providing alternatives to traditional car ownership, particularly in urban areas.</p><p>These services offer convenience and flexibility while potentially reducing the number of vehicles on the road and associated emissions. The integration of multiple transportation modes through single platforms is making it easier for users to choose the most appropriate option for each trip.</p><p>However, the economics of shared mobility remain challenging, with many services struggling to achieve profitability. The industry is evolving, with consolidation and new business models emerging as companies seek sustainable paths forward.</p>",
    category: "EV & Mobility",
    categorySlug: "ev-mobility",
    date: "2025-02-03",
    timeAgo: "5 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "46",
    slug: "hydrogen-fuel-cell-vehicles-gain-traction-in-commercial-sector",
    title: "Hydrogen Fuel Cell Vehicles Gain Traction in Commercial Sector",
    excerpt: "Heavy-duty vehicles and commercial fleets explore hydrogen as alternative to battery electric.",
    content: "<p>Hydrogen fuel cell technology is gaining attention as a potential solution for heavy-duty transportation and commercial vehicle applications where battery electric vehicles face limitations. Fuel cell vehicles offer longer ranges and faster refueling times, making them attractive for applications like long-haul trucking and commercial fleets.</p><p>While the technology shows promise, challenges around hydrogen production, distribution infrastructure, and cost remain significant. However, investments in green hydrogen production and refueling infrastructure are addressing these barriers.</p><p>The commercial sector is leading adoption, with several companies deploying hydrogen fuel cell vehicles in their fleets. As the technology matures and costs decline, hydrogen could play an important role in decarbonizing heavy transportation sectors.</p>",
    category: "EV & Mobility",
    categorySlug: "ev-mobility",
    date: "2025-02-02",
    timeAgo: "6 days ago",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
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
];

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
