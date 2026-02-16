"use client";

import React from "react";
import { PostImage } from "@/components/PostImage";

/**
 * AboutPage - Redesigned to match Step 2054 visual reference.
 */
export default function AboutPage() {
    return (
        <div id="mvp-article-cont" className="left relative about-custom-page" style={{ width: "100%", background: "#f9f9f9", overflow: "hidden", minHeight: "100vh" }}>

            {/* STICKY SOCIAL SIDEBAR (MOCKED POSITION) */}
            <div className="sn-social-vertical" style={{
                position: "fixed",
                left: "40px",
                top: "150px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                zIndex: 100
            }}>
                <div style={{ width: "32px", height: "32px", background: "#3b5998", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}><i className="fa-brands fa-facebook-f"></i></div>
                <div style={{ width: "32px", height: "32px", background: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}><i className="fa-brands fa-x-twitter"></i></div>
                <div style={{ width: "32px", height: "32px", background: "#bd081c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}><i className="fa-brands fa-pinterest-p"></i></div>
                <div style={{ width: "32px", height: "32px", background: "#ccc", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}><i className="fa-solid fa-envelope"></i></div>
            </div>

            <div className="kt-row-column-wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>

                {/* HEADER */}
                <header style={{ textAlign: "center", marginBottom: "40px" }}>
                    <h1 style={{
                        fontSize: "28px",
                        fontWeight: 800,
                        color: "#000",
                        textTransform: "uppercase",
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "30px",
                        letterSpacing: "1px"
                    }}>
                        ABOUT US
                    </h1>
                </header>

                {/* INTRODUCTION */}
                <section style={{ maxWidth: "900px", margin: "0 auto 80px", textAlign: "center" }}>
                    <p style={{
                        fontSize: "15px",
                        lineHeight: "1.6",
                        color: "#000",
                        marginBottom: "25px",
                        fontFamily: "'NB International', sans-serif"
                    }}>
                        StartupNews.fyi offers readers a clear window into the future of startups, innovation, and global business. It's where founders, operators, investors, and industry leaders come to understand what's emerging, what's shifting, and what truly matters across markets. From breakthrough technologies and evolving business models to investment trends and cross-border expansion, we surface high-impact stories and intelligence that help decision-makers stay one step ahead in a rapidly changing world.
                    </p>
                    <p style={{
                        fontSize: "15px",
                        lineHeight: "1.6",
                        color: "#000",
                        fontFamily: "'NB International', sans-serif"
                    }}>
                        Built as a trusted, verified news aggregation and ecosystem intelligence platform, StartupNews.fyi is designed to cut through noise and misinformation. Every update is curated with credibility and relevance at its core, ensuring our audience receives reliable insights they can act on with confidence. As we engage a global community through content, data, and ecosystem initiatives, authenticity remains central to who we are—if you ever encounter communication claiming to represent StartupNews.fyi, we encourage verification through our official channels to ensure trust and transparency at every touchpoint.
                    </p>
                </section>

                {/* TEAM GRID */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }} className="team-grid">

                    {/* Madhur Mohan Malik */}
                    <div className="team-card" style={{ background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "flex-start" }}>
                            <div style={{ width: "100px", height: "70px", background: "#f0f0f0", overflow: "hidden", flexShrink: 0, position: "relative", borderRadius: "4px" }}>
                                <PostImage
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
                                    alt="Madhur Mohan Malik"
                                    width={100}
                                    height={70}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                                />
                            </div>
                            <div>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#000", marginBottom: "5px" }}>Madhur Mohan Malik</h3>
                                <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>Founder</p>
                                <a href="#" style={{ color: "#0077b5", fontSize: "20px" }}><i className="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                        <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#333", fontStyle: "italic" }}>
                            <span style={{ fontWeight: 700 }}>Madhur Mohan Malik</span> is the Founder of StartupNews.fyi, driving its vision to become a trusted global source for startup and industry intelligence. With deep experience across media, technology, and ecosystem building, he focuses on creating high-signal platforms that connect founders, investors, and operators worldwide. His work is centered on credibility, global perspective, and building meaningful bridges across innovation ecosystems.
                        </p>
                    </div>

                    {/* Kapil Suri */}
                    <div className="team-card" style={{ background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "flex-start" }}>
                            <div style={{ width: "100px", height: "70px", background: "#f0f0f0", overflow: "hidden", flexShrink: 0, position: "relative", borderRadius: "4px" }}>
                                <PostImage
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces"
                                    alt="Kapil Suri"
                                    width={100}
                                    height={70}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                                />
                            </div>
                            <div>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#000", marginBottom: "5px" }}>Kapil Suri</h3>
                                <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>CoFounder</p>
                                <a href="#" style={{ color: "#0077b5", fontSize: "20px" }}><i className="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                        <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#333", fontStyle: "italic" }}>
                            <span style={{ fontWeight: 700 }}>Kapil Suri</span> is the Co-Founder of StartupNews.fyi, bringing strategic insight and operational depth to the platform's global growth. With a strong background in business development and ecosystem partnerships, he plays a key role in shaping long-term strategy and execution. His focus lies in building scalable systems, trusted relationships, and sustainable value across global startup communities.
                        </p>
                    </div>

                    {/* Shounak Sengupta */}
                    <div className="team-card" style={{ background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "flex-start" }}>
                            <div style={{ width: "100px", height: "70px", background: "#f0f0f0", overflow: "hidden", flexShrink: 0, position: "relative", borderRadius: "4px" }}>
                                <PostImage
                                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces"
                                    alt="Shounak Sengupta"
                                    width={100}
                                    height={70}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                                />
                            </div>
                            <div>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#000", marginBottom: "5px" }}>Shounak Sengupta</h3>
                                <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>leads Events & Global Partnerships</p>
                                <a href="#" style={{ color: "#0077b5", fontSize: "20px" }}><i className="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                        <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#333" }}>
                            <span style={{ fontWeight: 700 }}>Shounak Sengupta</span> leads Events & Global Partnerships at StartupNews.fyi, where he drives strategic collaborations and ecosystem engagement to elevate founder, investor, and community connections across events and initiatives. His work strengthens the platform's presence and impact within the global startup landscape.
                        </p>
                    </div>

                    {/* Sreejit Kumar */}
                    <div className="team-card" style={{ background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "flex-start" }}>
                            <div style={{ width: "100px", height: "70px", background: "#f0f0f0", overflow: "hidden", flexShrink: 0, position: "relative", borderRadius: "4px" }}>
                                <PostImage
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces"
                                    alt="Sreejit Kumar"
                                    width={100}
                                    height={70}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                                />
                            </div>
                            <div>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#000", marginBottom: "5px" }}>Sreejit Kumar</h3>
                                <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>Media & Communications Professional</p>
                                <a href="#" style={{ color: "#0077b5", fontSize: "20px" }}><i className="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                        <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#333" }}>
                            <span style={{ fontWeight: 700 }}>Sreejit Kumar</span> contributes to StartupNews.fyi as a Media & Communications Professional, bringing expertise in digital publishing, content strategy, and audience engagement. With a strong foundation in media and communications, he helps amplify the platform's reach and resonance across audiences worldwide.
                        </p>
                    </div>

                </div>

            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .team-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    .sn-social-vertical {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
