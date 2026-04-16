import { buildMetadata } from '@/lib/seo';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18135551234';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 555-1234';

export const metadata = buildMetadata({
  title: 'Contact Dry Vent Tampa | Get a Free Estimate',
  description: 'Get in touch with Dry Vent Tampa for a free dryer vent cleaning estimate. Call (813) 555-1234, email us, or book online. Same-day service across Tampa Bay.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy-mid to-navy-light py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 70% 20%, rgba(232,69,14,0.12) 0%, transparent 60%)',
        }} />
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-4">
            Get a Free Estimate
          </h1>
          <p className="text-lg text-white/75">Call us, email us, or fill out the form. We reply fast.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom grid lg:grid-cols-2 gap-12 max-w-6xl">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-navy mb-6">How to Reach Us</h2>

            <div className="space-y-5 mb-8">
              <a href={`tel:${PHONE}`} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-fire transition-all group">
                <div className="w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-fire group-hover:text-white transition-colors">
                  <Phone className="text-fire group-hover:text-white" size={22} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Call / Text</div>
                  <div className="font-display font-bold text-xl text-navy">{PHONE_DISPLAY}</div>
                  <div className="text-sm text-gray-600">Fastest way to book</div>
                </div>
              </a>

              <a href="mailto:info@dryventtampa.com" className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-fire transition-all group">
                <div className="w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-fire" size={22} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</div>
                  <div className="font-display font-bold text-lg text-navy">info@dryventtampa.com</div>
                  <div className="text-sm text-gray-600">Replies within 2 hours</div>
                </div>
              </a>

              <div className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-fire" size={22} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hours</div>
                  <div className="font-display font-bold text-base text-navy">Mon–Sat · 7AM–7PM</div>
                  <div className="text-sm text-gray-600">Closed Sundays</div>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-fire" size={22} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Area</div>
                  <div className="font-display font-bold text-base text-navy">Tampa Bay, FL</div>
                  <div className="text-sm text-gray-600">All Hillsborough, Pinellas &amp; Pasco counties</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
