"use client";

import * as LucideIcons from "lucide-react";

import { portfolioService } from "@/services/portfolio.service";
import React, { useEffect, useState } from "react";
import { contact } from "../types/portfolioData";

export default function Contact() {
  const [data, setData] = useState<contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formSubmission, setFormSubmission] = useState<boolean | false>(false);
  const [isSubmitting, setisSubmitting] = useState<boolean | false>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSubmitting(true);

    try {
      const result = await portfolioService.submitForm(formData);
      setFormSubmission(result);

      if (result) {
        setFormData({ name: "", email: "", subject: "", message: "" }); // reset form
        setisSubmitting(false);
      }
      setTimeout(() => setFormSubmission(false), 5000);
    } catch (error) {
      return error;
    }
  };

  const loadData = async () => {
    try {
      const result = await portfolioService.getAllData<contact>("contact");
      if (result) {
        setData(result);
        setError(null);
      }
    } catch (err) {
      setError("Failed to load contact data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => await loadData();
    fetchData();
  }, []);

  const contactInfo = data?.contactInfo?.contactInfo ?? [];
  const socialLinks = data?.contactInfo?.socialLinks ?? [];
  return (
    <main className="container !bg-slate-900 mx-auto !px-6 !py-20" id="contact">
      <div className="max-w-6xl !mx-auto ">
        <h2 className="text-4xl text-slate-100 !mb-3 text-center">
          {data?.contactData.title || "Contact Info"}
        </h2>
        <div className="w-20 h-1 bg-emerald-500 !mx-auto !mb-12"></div>
        <p className="text-center text-slate-300 !mb-12 max-w-2xl !mx-auto">
          {data?.contactData?.description}
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center !mb-16">
          {/* Contact Information */}
          <div className="grid ">
            <h3 className="text-2xl text-slate-100 !mb-10">
              Contact Information
            </h3>
            <div className="!space-y-4 !mb-8">
              {contactInfo.map((info, index) => {
                const IconComponent = LucideIcons[
                  info.icon as keyof typeof LucideIcons
                ] as typeof LucideIcons.CircleQuestionMark;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="!p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <p className="text-slate-100 !mb-1">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-slate-200 hover:text-emerald-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-200">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <h3 className="text-2xl text-slate-100 !mb-6">Connect With Me</h3>
            <div className="!space-y-4">
              {socialLinks.map((social, index) => {
                const IconComponent = LucideIcons[
                  social.icon as keyof typeof LucideIcons
                ] as typeof LucideIcons.CircleQuestionMark;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 !p-4 bg-slate-800/50 rounded-lg border-2 border-slate-700 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/20 group"
                  >
                    <div className="text-slate-400 group-hover:text-emerald-400 transition-colors">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <p className="text-slate-100">{social.name}</p>
                      <p className="text-sm text-slate-400">
                        {social.username}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl text-slate-100 !mb-6">Send a Message</h3>
            <form className="!space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-slate-200 !mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                  className="w-full !px-4 !py-3 bg-slate-950/50 border-2 border-slate-700 text-slate-100 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-500"
                  placeholder=""
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-200 !mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  className="w-full !px-4 !py-3 bg-slate-950/50 border-2 border-slate-700 text-slate-100 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-slate-200 !mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  required
                  onChange={handleChange}
                  className="w-full !px-4 !py-3 bg-slate-950/50 border-2 border-slate-700 text-slate-100 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-500"
                  placeholder="Project Collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-200 !mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  rows={5}
                  onChange={handleChange}
                  className="w-full !px-4 !py-3 bg-slate-950/50 border-2 border-slate-700 text-slate-100 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors resize-none placeholder:text-slate-500"
                  placeholder="Your message here..."
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className={`${
                  isSubmitting ? "bg-gray-500 text-gray-400" : ""
                } " w-full !px-6 !py-3  bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg  transition-colors flex items-center justify-center gap-2"`}
              >
                <LucideIcons.Send size={20} />
                Send Message
              </button>

              {formSubmission && (
                <div className="!p-4 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-lg text-emerald-400 text-center">
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
