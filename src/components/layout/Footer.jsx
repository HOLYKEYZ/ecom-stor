import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="border-t border-concrete py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase">
            AJ Store
          </Link>
          <p className="text-neutral-500 max-w-sm">
            Premium goods for the modern professional. Curated quality for your workspace and life.
          </p>
          <div className="text-sm text-neutral-400">
            © {new Date().getFullYear()} AJ Store. All rights reserved.
          </div>
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Shop</h4>
          <Link to="/" className="text-neutral-500 hover:text-obsidian transition-colors">All Products</Link>
          <Link to="/orders" className="text-neutral-500 hover:text-obsidian transition-colors">My Orders</Link>
        </div>

        {/* Social Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Connect</h4>
          <div className="flex gap-4">
            {/* Email */}
            <a href="mailto:ayandajoseph390@gmail.com" className="w-10 h-10 border border-concrete flex items-center justify-center hover:bg-obsidian hover:text-white transition-all text-neutral-600">
              <EnvelopeIcon className="w-5 h-5" />
            </a>
            
            {/* GitHub */}
            <a href="https://github.com/HOLYKEYZ" target="_blank" rel="noreferrer" className="w-10 h-10 border border-concrete flex items-center justify-center hover:bg-obsidian hover:text-white transition-all text-neutral-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Threads */}
            <a href="https://www.threads.com/@josepha.mayo?__pwa=1" target="_blank" rel="noreferrer" className="w-10 h-10 border border-concrete flex items-center justify-center hover:bg-obsidian hover:text-white transition-all text-neutral-600">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.004 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm2.755 12.56c-.364.555-.838.971-1.401 1.229-.622.316-1.319.467-2.009.467-1.353 0-2.585-.561-3.468-1.579-.884-1.018-1.374-2.433-1.374-3.985 0-1.552.49-2.967 1.374-3.985.884-1.018 2.115-1.579 3.468-1.579 1.458 0 2.736.657 3.597 1.85.297.411.517.868.647 1.352h2.246c-.161-.83-.497-1.613-.984-2.298-1.317-1.856-3.327-2.904-5.506-2.904-2.126 0-4.075.981-5.464 2.705C4.478 7.575 3.75 9.704 3.75 12c0 2.296.728 4.425 2.086 6.168 1.389 1.724 3.338 2.705 5.464 2.705 1.583 0 3.036-.549 4.2-1.587.777-.693 1.383-1.553 1.76-2.503.376-.95.568-1.986.568-3.048v-.881h-2.131v.826c0 1.218-.465 2.131-1.428 2.793-.418.287-.897.432-1.408.432-.979 0-1.839-.537-2.313-1.438-.173-.393-.284-.668-.284-.668h5.362v-2h-5.498s-.014-.142-.014-.247c0-2.348 1.951-4.256 4.359-4.256 2.373 0 4.256 1.859 4.256 4.205 0 .284.092.517.276.701.183.184.416.276.7.276 1.488 0 2.086-1.536 2.086-2.904 0-1.874-.633-3.618-1.782-4.908-1.148-1.29-2.731-2.001-4.456-2.001-3.692 0-6.696 3.004-6.696 6.696 0 3.692 3.004 6.696 6.696 6.696 2.022 0 3.864-.91 5.093-2.332l1.586 1.328c-1.636 1.896-4.09 3.004-6.679 3.004-4.793 0-8.696-3.903-8.696-8.696 0-4.793 3.903-8.696 8.696-8.696 4.793 0 8.696 3.903 8.696 8.696 0 2.016-.403 3.238-1.028 4.09-.624.851-1.537 1.49-2.738 1.49-1.393 0-2.525-.92-2.525-2.052v-3.213z"/>
               </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
