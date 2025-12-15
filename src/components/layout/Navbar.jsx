import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-concrete">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 -ml-2 hover:bg-vapor rounded-full transition-colors"
        >
          <Bars3Icon className="w-6 h-6 text-obsidian" />
        </button>

        {/* Brand */}
        <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
          AJ Store
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors">
            Shop
          </Link>
          <Link to="/orders" className="text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors">
            Orders
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
             <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-neutral-500">Hi, {user.name}</span>
                <button onClick={logout} className="text-sm font-medium uppercase tracking-widest hover:text-accent">
                  Logout
                </button>
             </div>
          ) : (
             <div className="hidden md:flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium uppercase tracking-widest hover:text-accent">
                  Login
                </Link>
             </div>
          )}

          {/* Cart Trigger */}
          <Link to="/checkout" className="relative p-2 hover:bg-vapor rounded-full transition-colors group">
            <ShoppingBagIcon className="w-6 h-6 text-obsidian" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-obsidian text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-50 p-6 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                 <span className="text-xl font-bold tracking-tighter">MENU</span>
                 <button onClick={() => setIsOpen(false)}>
                   <XMarkIcon className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex flex-col gap-6">
                <Link to="/" className="text-2xl font-medium tracking-tight">Shop</Link>
                <Link to="/orders" className="text-2xl font-medium tracking-tight">Orders</Link>
                <div className="h-px bg-concrete my-2" />
                {user ? (
                  <>
                    <span className="text-neutral-500">Signed in as {user.name}</span>
                    <button onClick={logout} className="text-left text-xl font-medium text-red-600">Logout</button>
                  </>
                ) : (
                   <Link to="/login" className="text-2xl font-medium tracking-tight">Login</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
