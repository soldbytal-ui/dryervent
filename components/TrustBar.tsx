export default function TrustBar() {
  const items = [
    { number: '847+', label: '5-Star Reviews' },
    { number: '15,000+', label: 'Vents Cleaned' },
    { number: '11+', label: 'Years Experience' },
    { number: '100%', label: 'Satisfaction Rate' },
  ];

  return (
    <section className="bg-gray-50 border-b border-gray-200 py-8">
      <div className="container-custom flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div>
              <div className="font-display font-extrabold text-3xl text-navy leading-none">{item.number}</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">{item.label}</div>
            </div>
            {i < items.length - 1 && <div className="hidden md:block w-px h-10 bg-gray-200 ml-12" />}
          </div>
        ))}
      </div>
    </section>
  );
}
