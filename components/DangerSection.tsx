import { Flame, DollarSign, Clock, AlertTriangle } from 'lucide-react';

const items = [
  { icon: Flame, stat: '2,900', title: 'Dryer Fires Per Year', desc: 'The U.S. Fire Administration reports thousands of preventable home fires each year from clogged dryer vents.' },
  { icon: DollarSign, stat: '$35M', title: 'In Property Damage', desc: 'Annual U.S. property losses from dryer fires — almost entirely preventable with annual cleaning.' },
  { icon: Clock, stat: '30%', title: 'Higher Energy Bills', desc: 'A clogged vent forces your dryer to work harder and run longer, wasting power every cycle.' },
  { icon: AlertTriangle, stat: '34%', title: 'From Lint Buildup', desc: 'One-third of dryer fires are caused by failure to clean — the most common and preventable cause.' },
];

export default function DangerSection() {
  return (
    <section className="bg-white py-20" id="why">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
            ⚠️ THE HIDDEN DANGER
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-3">
            Your Dryer Could Be a Fire Hazard Right Now
          </h2>
          <p className="text-gray-600">
            Clogged dryer vents are the #1 cause of home dryer fires in the U.S. In Florida's humid climate, the risk runs even higher.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-7 text-center hover:-translate-y-1 hover:border-fire hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-fire" size={28} strokeWidth={2} />
                </div>
                <div className="font-display font-extrabold text-3xl text-fire mb-1">{item.stat}</div>
                <h3 className="font-display font-bold text-base text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
