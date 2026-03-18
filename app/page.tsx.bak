import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Gallery />
      
      {/* About Section Preview */}
      <section id="about" className="py-24 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 aspect-square relative grayscale transition-all duration-700 hover:grayscale-0">
            <div className="absolute inset-0 border-2 border-accent m-4 translate-x-4 translate-y-4 -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80" 
              alt="Rafał Woźny" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-3 block">O mnie</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Pasja Zrodzona w Górach</h2>
            <p className="text-muted text-lg font-light leading-relaxed mb-8">
              Od lat przemierzam szlaki Beskidów, Tatr i Karkonoszy, szukając idealnego światła i momentów, które zapierają dech w piersiach. Moja fotografia to nie tylko obraz, to emocje i cisza, którą można znaleźć tylko na szczytach o świcie.
            </p>
            <button className="text-white text-sm font-bold uppercase tracking-[0.2em] border-b-2 border-accent pb-2 hover:text-accent transition-colors">
              Czytaj Więcej
            </button>
          </div>
        </div>
      </section>

      {/* Footer / Contact Preview */}
      <footer id="contact" className="py-24 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-12">Stwórzmy Coś <br /> <span className="text-accent">Pięknego</span></h2>
            <p className="text-muted text-xl mb-12 max-w-2xl mx-auto">
              Chcesz zamówić wydruk lub nawiązać współpracę? Zapraszam do kontaktu.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-12 text-white">
              <div>
                <span className="block text-accent text-xs font-bold uppercase tracking-widest mb-2">Telefon</span>
                <span className="text-2xl">+48 504 277 856</span>
              </div>
              <div>
                <span className="block text-accent text-xs font-bold uppercase tracking-widest mb-2">Email</span>
                <span className="text-2xl font-light">rafal.wozny@poczta.onet.pl</span>
              </div>
            </div>
            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <span className="text-muted text-sm tracking-widest uppercase font-bold">© 2026 RAFAŁ WOŹNY PHOTOGRAPHY</span>
              <div className="flex gap-8 text-muted">
                <a href="#" className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">Instagram</a>
                <a href="#" className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">Facebook</a>
                <a href="#" className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">Behance</a>
              </div>
            </div>
        </div>
      </footer>
    </main>
  );
}
