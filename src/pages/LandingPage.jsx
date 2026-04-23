import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Scale, 
  Clock, 
  FileText, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2,
  Users,
  Zap,
  LayoutDashboard
} from 'lucide-react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { supabase } from '../lib/supabase'
import logoSimple from '../assets/logo-simple.png'
import logoText from '../assets/lexona-ecriture.png'

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const y1 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -500]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.95]);

  return (
    <div className="landing-container" style={{ position: 'relative' }}>
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '2px', 
          background: 'rgba(255,255,255,0.3)', 
          scaleX: scrollYProgress, 
          transformOrigin: '0%', 
          zIndex: 2000 
        }} 
      />

      <motion.div className="bg-glow" style={{ top: '-15%', left: '0%', opacity: 0.6, y: y1 }}></motion.div>
      <div className="bg-glow" style={{ top: '25%', right: '-25%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 70%)', width: '1400px', height: '1400px' }}></div>
      <div className="bg-glow" style={{ bottom: '-10%', left: '25%', opacity: 0.4 }}></div>
      
      {/* Dynamic Ambient Spotlights */}
      <div className="white-blur-ambient" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '60vh', opacity: 0.8 }}></div>
      <div className="white-blur-ambient" style={{ top: '60%', left: '10%', width: '40vw', height: '40vh', opacity: 0.3 }}></div>
      
      {/* Accent Light Lines */}
      <div style={{ position: 'absolute', top: 0, left: '15%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', top: 0, right: '20%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', top: '15%', left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.02), transparent)', zIndex: -1 }}></div>

      {/* Navbar */}
      <nav className="glass navbar-container">
        <div className="brand-container navbar-brand-container">
          <img src={logoSimple} alt="Lexona Logo" className="brand-logo navbar-brand-logo" />
          <img src={logoText} alt="LEXONA" className="brand-text navbar-brand-text" />
        </div>
        
        <div className="nav-links" style={{ display: 'none', gap: '32px' }}>
          {/* Hidden on mobile, can be added later with styles */}
          <a href="#features" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Fonctionnalités</a>
          <a href="#dashboard" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Dashboard</a>
          <a href="#security" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Sécurité</a>
        </div>

        <Link to="/dashboard">
          <button className="btn-primary btn-nav-cta">
            <span className="hide-mobile">Accéder au </span>Dashboard
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="container" style={{ paddingTop: '180px', textAlign: 'center' }}>
        <motion.div
           style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <span className="glass" style={{ 
            padding: '6px 16px', 
            fontSize: '0.8rem', 
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '100px',
            marginBottom: '24px',
            display: 'inline-block'
          }}>
            L'excellence technologique au service de votre rentabilité
          </span>
          <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: '1.1', marginBottom: '24px' }}>
            Maximisez la Rentabilité <br />
            <span className="gradient-text-accent">de votre Cabinet.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px' }}>
            Ne perdez plus jamais un dossier faute de réactivité. Lexona automatise votre intake, vos relances et votre facturation pour transformer chaque appel en succès.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/dashboard">
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Accéder à mon dashboard <ArrowRight size={18} />
              </button>
            </Link>
            <button className="btn-secondary">Demander une démo</button>
          </div>
        </motion.div>

        {/* Hero Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ marginTop: '80px', position: 'relative' }}
        >
          <div className="glass-premium" style={{ 
            width: '100%', 
            aspectRatio: '16/9', 
            borderRadius: '24px',
            padding: '10px',
            background: 'rgba(255,255,255,0.01)',
            boxShadow: '0 0 80px rgba(255,255,255,0.03)'
          }}>
            <div className="glass" style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden', background: '#0a0e17' }}>
               {/* Simplified Dashboard Mockup Preview */}
               <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ height: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '20px', padding: '0 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={logoSimple} alt="" style={{ width: '16px', height: '16px', opacity: 0.8 }} />
                      <img src={logoText} alt="" style={{ height: '10px', opacity: 0.8 }} />
                    </div>
                    <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
                    <div style={{ width: '200px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[1,2,3,4,5].map(i => <div key={i} style={{ width: '80%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>)}
                    </div>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="glass" style={{ padding: '20px', background: 'rgba(0, 229, 255, 0.02)' }}></div>
                      <div className="glass" style={{ padding: '20px' }}></div>
                      <div className="glass" style={{ padding: '20px' }}></div>
                      <div className="glass" style={{ padding: '20px' }}></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          {/* Floating elements */}
          <div className="glass" style={{ position: 'absolute', top: '10%', right: '-5%', padding: '16px', width: '200px', textAlign: 'left', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Relance SMS envoyée</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Mme Dupuis : Rappel RDV demain 14h</div>
          </div>
          <div className="glass" style={{ position: 'absolute', bottom: '15%', left: '-5%', padding: '16px', width: '220px', textAlign: 'left', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
              <Zap size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Automatisation active</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>-12h d'administratif par semaine</div>
          </div>
        </motion.div>
      </header>

      <section id="features" className="container" style={{ marginTop: '140px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3.2rem', marginBottom: '24px', letterSpacing: '-0.03em' }}>Un Écosystème Dédié à Votre <span className="gradient-text-accent">Croissance.</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            Oubliez les outils juridiques classiques. Lexona est un centre de commande business conçu pour maximiser chaque opportunité de votre cabinet.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { icon: <Zap />, title: "Lead In-take & Conversion", desc: "Qualification instantanée, rappels SMS et prise de RDV automatique pour ne plus rater aucun appel." },
            { icon: <Clock />, title: "Zéro Perte Administrative", desc: "Pré-remplissage, templates et automatisation documentaire pour regagner jusqu'à 15h de temps facturable." },
            { icon: <CheckCircle2 />, title: "Paiement & Recouvrement", desc: "Hébergement de factures, liens de paiement et relances automatiques pour assurer votre cash-flow." },
            { icon: <FileText />, title: "Dossier Client Unique", desc: "Centralisation totale : documents, signatures et historique d'échanges en un lieu sécurisé." },
            { icon: <ShieldCheck />, title: "Expérience Client Premium", desc: "Un portail client moderne avec suivi de statut et e-signature sans friction." },
            { icon: <LayoutDashboard />, title: "Pilotage & IA Sécurisée", desc: "Dashboard business de vos KPI et IA 'fermée' pour l'extraction de données confidentielles." }
          ].map((item, index) => (
            <div 
              key={index} 
              className="glass-premium premium-border" 
              style={{ padding: '40px', transition: 'all 0.5s ease' }}
            >
              <div style={{ color: '#fff', marginBottom: '24px', opacity: 0.9 }}>
                {React.cloneElement(item.icon, { size: 36 })}
              </div>
              <h3 style={{ marginBottom: '16px', fontSize: '1.6rem', fontWeight: '700' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lexona Response Section */}
      <section id="features" style={{ background: 'rgba(255,255,255,0.01)', borderY: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 className="gradient-text-accent" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>La Solution Lexona</h2>
              <h3 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '24px' }}>Reprenez le contrôle total de votre activité.</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem' }}>
                Conçu pour les avocats, notaires et juristes, Lexona transforme votre organisation en avantage concurrentiel.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: "Automatisation de la paperasse", desc: "Générez vos documents et gérez les flux administratifs sans effort." },
                  { title: "Relance prospects & SMS", desc: "Ne perdez plus aucune affaire. Rappels automatiques après appels manqués." },
                  { title: "Centralisation Sécurisée", desc: "Tous vos dossiers et documents accessibles en un clic, partout." }
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div className="glass" style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{f.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ flex: '1 1 400px' }}>
              <div className="glass-premium" style={{ padding: '40px', position: 'relative' }}>
                <div style={{ width: '100%', aspectRatio: '4/3', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ textAlign: 'center' }}>
                      <div className="glass" style={{ padding: '24px', marginBottom: '20px', display: 'inline-block' }}>
                        <Users size={48} color="#fff" />
                      </div>
                      <h4>Gestion Prospects</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Interface intuitive et performante</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="workflow" className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>Une intégration fluide en 4 étapes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', position: 'relative' }}>
          {[
            { step: "01", title: "Centralisez", desc: "Connectez vos dossiers, prospects et documents en un lieu unique." },
            { step: "02", title: "Automatisez", desc: "Configurez vos rappels SMS et vos relances automatiques." },
            { step: "03", title: "Pilotez", desc: "Suivez votre activité via un tableau de bord personnalisé." },
            { step: "04", title: "Performance", desc: "Gagnez en réactivité et multipliez votre rentabilité." }
          ].map((item, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <div style={{ fontSize: '4rem', fontWeight: '900', color: 'rgba(255,255,255,0.03)', position: 'absolute', top: '-40px', left: '0', zIndex: -1 }}>
                {item.step}
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" style={{ background: 'var(--bg-midnight-alt)', padding: '120px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>L'impact Lexona sur votre cabinet</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Des résultats concrets pour une gestion sereine.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { val: "+35%", label: "De conversion prospect" },
              { val: "-15h", label: "D'administratif / semaine" },
              { val: "100%", label: "Documents centralisés" },
              { val: "0", label: "Appels non relancés" }
            ].map((stat, i) => (
              <div key={i} className="glass" style={{ padding: '40px 20px' }}>
                <div className="gradient-text-accent" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '8px' }}>{stat.val}</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="container">
        <div className="glass-premium" style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center', padding: '60px' }}>
          <div style={{ flex: '1 1 300px' }}>
            <ShieldCheck size={64} color="#fff" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Secret Professionnel & Rigueur</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Lexona déploie une infrastructure de sécurité souveraine et des IA fermées pour garantir la confidentialité absolue. Les avocats veulent résumer et rédiger plus vite sans mettre le secret pro en danger.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#fff" /> IA Encadrée
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#fff" /> Hébergement Local
               </div>
            </div>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            {/* Visual element for security */}
            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
              <div className="glass" style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Scale size={80} color="#fff" opacity={0.1} />
              </div>
              <div className="glass" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', borderRadius: '50%', background: '#fff' }}>
                <ShieldCheck size={40} color="#000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="container" style={{ paddingTop: '100px', paddingBottom: '160px', textAlign: 'center' }}>
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6 }}
         >
           <h2 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>Prêt à transformer votre cabinet ?</h2>
           <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 48px' }}>
             Laissez-nous vos coordonnées pour une démonstration personnalisée ou accédez directement à votre dashboard.
           </p>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start', textAlign: 'left', marginBottom: '80px' }}>
              <div className="glass-premium" style={{ padding: '40px' }}>
                <LeadForm />
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '24px' }}>Pourquoi choisir Lexona ?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                   {[
                     { title: "Expertise Métier", desc: "Un outil conçu par et pour les professionnels du droit." },
                     { title: "Gain de temps", desc: "Automatisez jusqu'à 15h de tâches administratives par semaine." },
                     { title: "Sécurité Totale", desc: "Chiffrement de bout en bout et hébergement souverain." }
                   ].map((item, i) => (
                     <div key={i}>
                       <h4 style={{ color: '#fff', marginBottom: '4px' }}>{item.title}</h4>
                       <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
           </div>

           <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
             <Link to="/dashboard" style={{ textDecoration: 'none' }}>
               <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                 Accéder à mon dashboard
               </button>
             </Link>
           </div>
         </motion.div>
      </section>
      
      {/* Footer */}
      <footer style={{ background: 'rgba(0,0,0,0.3)', padding: '80px 0 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', marginBottom: '60px', textAlign: 'left' }}>
          <div>
            <div className="brand-container footer-brand-container">
              <img src={logoSimple} alt="Lexona Logo" className="brand-logo footer-brand-logo" />
              <img src={logoText} alt="LEXONA" className="brand-text footer-brand-text" />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              La plateforme de pilotage nouvelle génération pour les métiers du droit.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px' }}>Produit</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li>Fonctionnalités</li>
              <li>Dashboard</li>
              <li>SMS Relances</li>
              <li>Documents</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px' }}>Société</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li>À propos</li>
              <li>Sécurité</li>
              <li>Contact</li>
              <li>Carrières</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px' }}>Légal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li>Mentions Légales</li>
              <li>Confidentialité</li>
              <li>CGU</li>
            </ul>
          </div>
        </div>
        <div className="container" style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>&copy; 2026 Lexona. Tous droits réservés. L'excellence juridique centralisée.</p>
        </div>
      </footer>
    </div>
  )
}

const LeadForm = () => {
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    }

    const { error } = await supabase.from('leads').insert([data])

    if (error) {
      console.error(error)
      alert("Une erreur est survenue lors de l'envoi. Avez-vous configuré la table 'leads' dans Supabase ?")
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <CheckCircle2 color="#fff" size={48} style={{ marginBottom: '16px' }} />
      <h3>Merci !</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Votre demande a été envoyée. Nous vous recontacterons sous 24h.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Nom complet</label>
        <input name="name" required className="glass" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>E-mail</label>
        <input name="email" type="email" required className="glass" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Téléphone (pour relances SMS démo)</label>
        <input name="phone" className="glass" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Message / Spécialité</label>
        <textarea name="message" rows="4" className="glass" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }}></textarea>
      </div>
      <button disabled={loading} className="btn-primary" style={{ marginTop: '10px' }}>
        {loading ? 'Envoi...' : 'Demander ma démo'}
      </button>
    </form>
  )
}

export default LandingPage
