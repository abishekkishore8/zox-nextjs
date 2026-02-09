"use client";

import React, { useState } from "react";

/**
 * AdvertisePage - Redesigned to match Step 1958 and Step 1990 visual references.
 * Fixed missing components and row order.
 */
export default function AdvertisePage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobTitle: "",
        jobLevel: "",
        industry: "",
        company: "",
        country: "",
        objective: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for your enquiry. We will get back to you soon!");
    };

    return (
        <div id="mvp-article-cont" className="left relative advertise-custom-page" style={{ width: "100%", background: "#fff", overflow: "hidden" }}>

            {/* ROW 1: HERO */}
            <div className="sn-row-hero" style={{ padding: "80px 0", background: "#fff" }}>
                <div className="kt-row-column-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: "1200px", margin: "0 auto", padding: "0 20px", gap: "60px", alignItems: "center" }}>

                    {/* Left: Social & Text */}
                    <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
                        {/* Vertical Social Bar */}
                        <div className="sn-social-vertical" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "5px" }}>
                            <div style={{ width: "32px", height: "32px", background: "#3b5998", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}><i className="fa-brands fa-facebook-f"></i></div>
                            <div style={{ width: "32px", height: "32px", background: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}><i className="fa-brands fa-x-twitter"></i></div>
                            <div style={{ width: "32px", height: "32px", background: "#bd081c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}><i className="fa-brands fa-pinterest-p"></i></div>
                            <div style={{ width: "32px", height: "32px", background: "#ccc", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}><i className="fa-solid fa-envelope"></i></div>
                        </div>
                        {/* Headline & Description */}
                        <div>
                            <h1 style={{ fontSize: "32px", lineHeight: "1.2", fontWeight: 700, color: "#000", marginBottom: "10px", fontFamily: "sans-serif" }}>
                                Reuters reaches a global, unmatched audience
                            </h1>
                            <p style={{ fontSize: "18px", lineHeight: "1.3", color: "#000", fontWeight: 700 }}>
                                Access A Global Audience of Influential decision makers who shape the future of business
                            </p>
                        </div>
                    </div>

                    {/* Right: Large Pink Box */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div style={{ background: "#ee1761", padding: "60px 50px", borderRadius: "15px", width: "100%", maxWidth: "450px", boxShadow: "0px 10px 40px rgba(0,0,0,0.1)" }}>
                            <div style={{ fontSize: "86px", fontWeight: 900, color: "#fff", lineHeight: "1", fontFamily: "Anton, sans-serif" }}>97m</div>
                            <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginTop: "12px", letterSpacing: "0.5px" }}>Total Global Audience</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 2: STATS DETAILS (GRAY BACKGROUND) */}
            <div className="sn-row-stats-details" style={{ padding: "80px 0", background: "#f0f0f0" }}>
                <div className="kt-row-column-wrap" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", maxWidth: "1200px", margin: "0 auto", padding: "0 20px", gap: "60px", alignItems: "center" }}>

                    {/* Left: 3 Pink Boxes (4m, 50+, 50m) */}
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div style={{ background: "#ee1761", padding: "35px 25px", borderRadius: "12px", flex: 1, minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}>
                            <div style={{ fontSize: "42px", fontWeight: 900, color: "#fff", lineHeight: "1" }}>4m</div>
                            <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginTop: "10px" }}>Total Global Audience</div>
                        </div>
                        <div style={{ background: "#ee1761", padding: "35px 25px", borderRadius: "12px", flex: 1, minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}>
                            <div style={{ fontSize: "42px", fontWeight: 900, color: "#fff", lineHeight: "1" }}>50+</div>
                            <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginTop: "10px" }}>Total Global Audience</div>
                        </div>
                        <div style={{ background: "#ee1761", padding: "35px 25px", borderRadius: "12px", flex: 1, minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}>
                            <div style={{ fontSize: "42px", fontWeight: 900, color: "#fff", lineHeight: "1" }}>50m</div>
                            <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginTop: "10px" }}>Total Global Audience</div>
                        </div>
                    </div>

                    {/* Right: Text List */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        {[
                            { val: "500m", label: "Monthly Video Views" },
                            { val: "7m", label: "Monthly Audio sessions" },
                            { val: "2600", label: "Journalists" },
                            { val: "200", label: "Locations" }
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #ccc", padding: "18px 0" }}>
                                <div style={{ fontSize: "38px", fontWeight: 900, color: "#ee1761", lineHeight: "1" }}>{item.val}</div>
                                <div style={{ fontSize: "12px", fontWeight: 700, color: "#000", textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ROW 3: INFORMATIONAL BANNER (WHITE BACKGROUND) */}
            <div className="sn-row-info-banner" style={{ padding: "100px 0", background: "#fff" }}>
                <div className="kt-row-column-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: "1200px", margin: "0 auto", padding: "0 20px", gap: "60px", alignItems: "center" }}>

                    {/* Left: Headline repeated per Step 1958 */}
                    <div style={{ fontSize: "28px", fontWeight: 700, lineHeight: "1.3", color: "#000" }}>
                        Access A Global Audience of Influential decision makers who shape the future of business Access A Global Audience of Influential decision makers who shape the future of business
                    </div>

                    {/* Right: Image with Wave Overlay Mockup */}
                    <div style={{ position: "relative" }}>
                        <div style={{
                            backgroundImage: "url('https://s3.amazonaws.com/startupnews-media-2026/uploads/2026/01/feature-phones-live-content-without-internet-d2m.jpeg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "420px",
                            borderRadius: "15px",
                            boxShadow: "0px 20px 50px rgba(0,0,0,0.1)"
                        }}>
                            {/* Blue wave effect mockup overlay */}
                            <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%", background: "radial-gradient(circle at 70% 50%, rgba(29, 161, 242, 0.15) 0%, transparent 60%)", borderRadius: "15px", pointerEvents: "none" }}></div>
                            <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "90%", height: "2px", background: "rgba(255,255,255,0.3)", boxShadow: "0 0 20px 2px rgba(29, 161, 242, 0.5)" }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 4: TICKER ROW (PALE GRAY) */}
            <div className="sn-row-ticker" style={{ padding: "60px 0", background: "#f8f8f8" }}>
                <div className="kt-row-column-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
                    {[
                        { val: "m", label: "udience" },
                        { val: "55+", label: "Total Global Audience" },
                        { val: "150m", label: "Total Global Audience" },
                        { val: "150m", label: "Total Global Audience" }
                    ].map((item, idx) => (
                        <div key={idx} style={{ textAlign: "center", borderRight: idx === 3 ? "none" : "1px solid #ddd", padding: "0 20px" }}>
                            <div style={{ fontSize: "52px", fontWeight: 900, color: "#ee1761", lineHeight: "1", fontFamily: "Anton, sans-serif" }}>{item.val}</div>
                            <div style={{ fontSize: "11px", fontWeight: 700, color: "#000", textTransform: "uppercase", marginTop: "12px", letterSpacing: "0.5px" }}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ROW 5: FORM HEADER & CONTACT FORM */}
            <div className="sn-row-form" style={{ padding: "100px 0", background: "#fff" }}>
                <div className="kt-row-column-wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>

                    <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#000", marginBottom: "50px", textTransform: "none" }}>Speak to an expert</h2>

                    <form onSubmit={handleSubmit} className="sn-advertise-form" style={{ width: "100%", maxWidth: "1100px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }} className="mobile-one-col">
                            <div className="form-group">
                                <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>First Name *</label>
                                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px" }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Last Name *</label>
                                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px" }} />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }} className="mobile-one-col">
                            <div className="form-group">
                                <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Work Email Address *</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px" }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Business Phone *</label>
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px" }} />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }} className="mobile-one-col">
                            <div className="form-group">
                                <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Job Title *</label>
                                <input type="text" name="jobTitle" required value={formData.jobTitle} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px" }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Job Level *</label>
                                <select name="jobLevel" required value={formData.jobLevel} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px", height: "42px" }}>
                                    <option value="">Please Select</option>
                                    <option value="C-Level">C-Level</option>
                                    <option value="VP">VP</option>
                                    <option value="Director">Director</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Individual Contributor">Individual Contributor</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }} className="mobile-one-col">
                            <div className="form-group">
                                <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Industry *</label>
                                <select name="industry" required value={formData.industry} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px", height: "42px" }}>
                                    <option value="">Please Select</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Company / Organization *</label>
                                <input type="text" name="company" required value={formData.company} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px" }} />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: "30px" }}>
                            <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Country *</label>
                            <select name="country" required value={formData.country} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", background: "#fff", fontSize: "14px", height: "42px" }}>
                                <option value="">Please Select</option>
                                <option value="India">India</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: "40px" }}>
                            <label style={{ display: "block", marginBottom: "10px", fontWeight: 700, fontSize: "11px", color: "#000", textTransform: "uppercase" }}>Please outline your brand campaign objective or provide additional details. *</label>
                            <textarea name="objective" required value={formData.objective} onChange={handleChange} rows={6} style={{ width: "100%", padding: "15px", border: "1px solid #ccc", background: "#fff", fontSize: "14px" }}></textarea>
                        </div>

                        <div style={{ paddingTop: "10px" }}>
                            <button type="submit" style={{ padding: "15px 40px", background: "#000", color: "#fff", fontWeight: 800, fontSize: "14px", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: "0" }}>
                                Submit
                            </button>
                        </div>

                        <p style={{ fontSize: "11px", color: "#000", marginTop: "40px", lineHeight: "1.5", maxWidth: "800px" }}>
                            By submitting this form, I agree to Reuters contacting me in relation to this enquiry, and I understand that the Reuters group of companies will process my personal information as described in the Privacy Statement.
                        </p>
                    </form>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .kt-row-column-wrap {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                    .mobile-one-col {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    h1 { font-size: 28px !important; }
                    .sn-row-stats-details .kt-row-column-wrap { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
