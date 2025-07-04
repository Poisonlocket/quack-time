import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import './globals.css'

export default function Home() {
  return (

      <main className="bg-yellow-100 text-gray-800 min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-yellow-200">
          <h1 className="text-5xl font-extrabold mb-4">🦆 Quack Time</h1>
          <p className="text-xl mb-6 max-w-2xl">
            Dein Pomodoro-Timer mit Personality – Lass dich vom Quack motivieren und booste deine Produktivität auf süsseste Weise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="https://play.google.com/store/apps/details?id=quacktime.app">
                App jetzt herunterladen
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">Mehr erfahren</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-white">
          <h2 className="text-3xl font-bold text-center mb-12">Was Quack Time besonders macht</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="bg-yellow-50 rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">🧠 Fokus mit Spass</h3>
              <p>Die Pomodoro-Technik trifft auf Entencharme – bleib motiviert und fokussiert mit jeder Quack-Runde.</p>
            </div>
            <div className="bg-yellow-50 rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">📱 Einfach & intuitiv</h3>
              <p>Ein klarer, verspielter Timer – ganz ohne Schnickschnack, aber mit Quack.</p>
            </div>
            <div className="bg-yellow-50 rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">🔔 Quack-Reminder</h3>
              <p>Wenn die Zeit um ist, vibriert's – charmant, nicht stressig. So bleibt’s entspannt produktiv.</p>
            </div>
          </div>
        </section>

        {/* Screenshot Section */}
        <section className="py-20 px-6 bg-yellow-100">
          <h2 className="text-3xl font-bold text-center mb-12">Ein Blick in die App</h2>
          <div className="flex justify-center">
            <Image
                src="/img.png"
                alt="Screenshot von Quack Time"
                width={300}
                height={600}
                className="rounded-2xl shadow-xl border"
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-yellow-300 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Bereit für deinen ersten Quack?</h2>
          <p className="text-lg mb-8">Hol dir die App und steig ein in die charmanteste Produktivität deiner Woche!</p>
          <Button asChild size="lg">
            <Link href="https://play.google.com/store/apps/details?id=quacktime.app">
              Jetzt kostenlos herunterladen
            </Link>
          </Button>
        </section>

        {/* Footer */}
        <footer className="bg-yellow-900 text-yellow-100 text-center py-8">
          <p>© {new Date().getFullYear()} Quack Time. Mit Liebe und Quacks entwickelt.</p>
        </footer>
      </main>
  );
}
