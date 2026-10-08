'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function LeadForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.from('leads').insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.company_name,
          message: formData.message,
          status: 'new',
        },
      ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-4 text-cyan-400">
          ปรึกษาโซลูชันนวัตกรรมกับ PANLATEC
        </h2>
        <p className="text-slate-400 text-center mb-8">
          กรอกข้อมูลด้านล่าง ทีมผู้เชี่ยวชาญของเราจะติดต่อกลับภายใน 24 ชั่วโมง
        </p>

        {submitted ? (
          <div className="bg-cyan-950/50 border border-cyan-500/50 text-cyan-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">ส่งข้อมูลสำเร็จ!</h3>
            <p>ขอบคุณที่สนใจ PANLATEC ทีมงานจะติดต่อกลับโดยเร็วที่สุดครับ</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">ชื่อ-นามสกุล *</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 text-white"
                  placeholder="สมชาย ใจดี"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">อีเมล *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 text-white"
                  placeholder="somchai@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 text-white"
                  placeholder="081-234-5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">ชื่อองค์กร / บริษัท</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 text-white"
                  placeholder="PANLATEC Co., Ltd."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">ข้อความ / ความต้องการ</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 text-white"
                placeholder="ระบุรายละเอียดโครงการ หรือระบบที่ต้องการรับคำปรึกษา..."
              />
            </div>

            {errorMsg && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-semibold text-slate-950 rounded-lg transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? 'กำลังส่งข้อมูล...' : 'ลงทะเบียนรับคำปรึกษาฟรี'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
