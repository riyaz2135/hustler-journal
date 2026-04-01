import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { Accounts } from './components/Accounts';
import { History } from './components/History';
import { Performance } from './components/Performance';
import { Weekly } from './components/Weekly';
import { Reports } from './components/Reports';
import { AddTrade } from './components/AddTrade';
import { Settings } from './components/Settings';
import { Trade, Account } from './types';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tradeToEdit, setTradeToEdit] = useState<Trade | null>(null);
  const [trades, setTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem('hj_trades');
    return saved ? JSON.parse(saved) : [];
  });
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('hj_accounts');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('hj_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('hj_trades', JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    localStorage.setItem('hj_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('hj_theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('hj_theme', 'light');
    }
  }, [isDark]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard trades={trades} accounts={accounts} onNavigate={setActivePage} />;
      case 'accounts':
        return <Accounts accounts={accounts} setAccounts={setAccounts} trades={trades} />;
      case 'history':
        return (
          <History 
            trades={trades} 
            setTrades={setTrades} 
            accounts={accounts} 
            onEditTrade={(trade) => {
              setTradeToEdit(trade);
              setActivePage('add-trade');
            }}
          />
        );
      case 'performance':
        return <Performance trades={trades} accounts={accounts} />;
      case 'reports':
        return <Reports trades={trades} accounts={accounts} />;
      case 'weekly':
        return <Weekly trades={trades} />;
      case 'add-trade':
        return (
          <AddTrade 
            trades={trades} 
            setTrades={setTrades} 
            accounts={accounts} 
            tradeToEdit={tradeToEdit}
            onComplete={() => {
              setTradeToEdit(null);
              setActivePage('dashboard');
            }} 
          />
        );
      case 'settings':
        return <Settings trades={trades} setTrades={setTrades} accounts={accounts} setAccounts={setAccounts} />;
      default:
        return <Dashboard trades={trades} accounts={accounts} onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar 
        activePage={activePage} 
        setActivePage={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false);
        }} 
        isDark={isDark} 
        setIsDark={setIsDark}
        trades={trades}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <TopBar 
          activePage={activePage} 
          onAddTrade={() => {
            setTradeToEdit(null);
            setActivePage('add-trade');
          }} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
