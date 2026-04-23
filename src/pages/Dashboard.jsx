import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FolderOpen, 
  FileText, 
  Calendar, 
  CheckSquare, 
  Settings, 
  User,
  ShieldCheck,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  Clock,
  ExternalLink,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logoSimple from '../assets/logo-simple.png'
import logoText from '../assets/lexona-ecriture.png'

const Dashboard = () => {
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Tableau de bord", path: "/dashboard" },
    { icon: <Users size={20} />, label: "Prospects", path: "/dashboard/prospects" },
    { icon: <MessageSquare size={20} />, label: "Relances SMS", path: "/dashboard/sms" },
    { icon: <FolderOpen size={20} />, label: "Dossiers", path: "/dashboard/dossiers" },
    { icon: <FileText size={20} />, label: "Documents", path: "/dashboard/documents" },
    { icon: <Calendar size={20} />, label: "Planning", path: "/dashboard/planning" },
    { icon: <CheckSquare size={20} />, label: "Tâches", path: "/dashboard/tasks" },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-midnight)', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside className="glass" style={{ 
        width: '280px', 
        height: '100vh', 
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <img src={logoSimple} alt="Lexona Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <img src={logoText} alt="LEXONA" style={{ height: '12px', objectFit: 'contain', marginTop: '2px' }} />
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item, idx) => (
            <Link key={idx} to={item.path} style={{ textDecoration: 'none' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '12px 16px', 
                borderRadius: '8px',
                color: location.pathname === item.path ? '#fff' : 'var(--text-secondary)',
                background: location.pathname === item.path ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                transition: 'all 0.2s'
              }}>
                {item.icon}
                <span style={{ fontSize: '0.95rem', fontWeight: location.pathname === item.path ? '600' : '400' }}>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', color: 'var(--text-secondary)' }}>
            <Settings size={20} />
            <span style={{ fontSize: '0.95rem' }}>Paramètres</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>Me Jean Dupont</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Cabinet Avocats D.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Tableau de bord</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Bienvenue, voici l'activité de votre cabinet aujourd'hui.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="glass" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Search size={18} color="var(--text-secondary)" />
              <input type="text" placeholder="Rechercher..." style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
            </div>
            <button 
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} /> Nouveau Dossier
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isModalOpen && (
            <NewFolderModal onClose={() => setIsModalOpen(false)} />
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/prospects" element={<ProspectsModule />} />
          <Route path="/sms" element={<SMSModule />} />
          <Route path="/documents" element={<DocumentsModule />} />
          <Route path="*" element={<div style={{ padding: '40px', textAlign: 'center' }}><ShieldCheck size={48} color="#fff" /><h2 style={{marginTop: '20px'}}>Module en cours de développement</h2></div>} />
        </Routes>
      </main>
    </div>
  )
}

const NewFolderModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nature: 'Conseil',
    description: ''
  })

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-premium premium-border"
        style={{
          width: '100%',
          maxWidth: '600px',
          background: 'rgba(15, 23, 42, 0.9)',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 0 100px rgba(255,255,255,0.05)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Ouverture de dossier</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Renseignez les informations du nouveau client</p>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: 'none', 
              color: '#fff', 
              padding: '10px', 
              borderRadius: '12px',
              cursor: 'pointer' 
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Prénom</label>
            <input 
              type="text" 
              className="glass" 
              style={{ width: '100%', padding: '12px 16px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} 
              placeholder="Ex: Sarah"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Nom</label>
            <input 
              type="text" 
              className="glass" 
              style={{ width: '100%', padding: '12px 16px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} 
              placeholder="Ex: Bernard"
            />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Email</label>
          <input 
            type="email" 
            className="glass" 
            style={{ width: '100%', padding: '12px 16px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} 
            placeholder="sarah.bernard@email.fr"
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Nature d'ouverture de dossier</label>
          <select 
            className="glass" 
            style={{ width: '100%', padding: '12px 16px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.9)' }}
          >
            <option value="contentieux">Contentieux</option>
            <option value="conseil">Conseil</option>
            <option value="arbitrage">Arbitrage</option>
            <option value="urgence">Urgence / Référé</option>
          </select>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Notes préliminaires</label>
          <textarea 
            className="glass" 
            rows="3"
            style={{ width: '100%', padding: '12px 16px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', resize: 'none' }}
            placeholder="Détails rapides sur l'affaire..."
          />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>Annuler</button>
          <button className="btn-primary" style={{ flex: 2 }}>Créer le dossier</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ProspectsModule = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
      if (!error && data) setLeads(data)
      setLoading(false)
    }
    fetchLeads()
  }, [])

  return (
    <div className="glass" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Gestion des Prospects (Live)</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" style={{ fontSize: '0.85rem' }}>Filtrer</button>
          <button className="btn-primary" style={{ fontSize: '0.85rem' }}>Ajouter un prospect</button>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <th style={{ padding: '16px' }}>Nom</th>
              <th style={{ padding: '16px' }}>Email</th>
              <th style={{ padding: '16px' }}>Statut</th>
              <th style={{ padding: '16px' }}>Date</th>
              <th style={{ padding: '16px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}>Chargement...</td></tr>
            ) : leads.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}>Aucun prospect pour le moment.</td></tr>
            ) : leads.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                <td style={{ padding: '16px', fontWeight: '500' }}>{row.name}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{row.email}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem' }}>Nouveau</span>
                </td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{new Date(row.created_at || Date.now()).toLocaleDateString()}</td>
                <td style={{ padding: '16px' }}>
                  <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><ExternalLink size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const SMSModule = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
    <div className="glass" style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Relances SMS & Rappels</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { to: "Mme Sarah Bernard", content: "Bonjour, j'ai tenté de vous joindre. Pouvons-nous fixer un RDV ?", status: "Envoyé", time: "10:15" },
          { to: "M. Marc Lefebvre", content: "Rappel : Votre audience est demain à 9h30 au Tribunal de Grande Instance.", status: "Programmé", time: "Demain 08:00" }
        ].map((sms, i) => (
          <div key={i} className="glass" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>À : {sms.to}</span>
              <span style={{ fontSize: '0.75rem', color: sms.status === 'Envoyé' ? '#fff' : '#94a3b8' }}>{sms.status}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '8px' }}>"{sms.content}"</p>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{sms.time}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="glass" style={{ padding: '24px' }}>
       <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Appels Manqués</h3>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: "06 12 34 56 XX", time: "Il y a 5 min" },
            { name: "07 88 99 00 XX", time: "Il y a 20 min" }
          ].map((call, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.05)' }}>
               <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{call.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{call.time}</p>
               </div>
               <button style={{ background: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.7rem', color: '#000', fontWeight: 'bold' }}>Relancer</button>
            </div>
          ))}
       </div>
    </div>
  </div>
)

const DocumentsModule = () => (
  <div className="glass" style={{ padding: '32px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
      <h2 style={{ fontSize: '1.5rem' }}>Centre de Documents</h2>
      <button className="btn-primary" style={{ fontSize: '0.85rem' }}>Importer un fichier</button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
      {[
        { name: "Contrat_Prestation_A.pdf", size: "1.2 MB", type: "PDF" },
        { name: "Facture_Mars_2026.pdf", size: "450 KB", type: "PDF" },
        { name: "Statuts_Lexona_Draft.docx", size: "2.1 MB", type: "DOC" },
        { name: "Identité_Client_Rivière.jpg", size: "3.4 MB", type: "IMG" }
      ].map((doc, i) => (
        <div key={i} className="glass" style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
          <FileText size={32} color="#fff" style={{ marginBottom: '12px' }} />
          <p style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{doc.type} • {doc.size}</p>
        </div>
      ))}
    </div>
  </div>
)

const Overview = () => {
  const [stats, setStats] = useState({ leads: 0, conversion: 68, hours: 14.5, revenue: 12450 })

  useEffect(() => {
    const fetchStats = async () => {
      const { count, error } = await supabase.from('leads').select('*', { count: 'exact', head: true })
      if (!error) setStats(prev => ({ ...prev, leads: count || 0 }))
    }
    fetchStats()
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
      {/* Stats Cards */}
      <div className="glass-premium premium-border" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', borderRadius: '8px' }}>
            <Users size={20} />
          </div>
          <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold', opacity: 0.8 }}>+12%</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Prospects actifs</p>
        <h3 style={{ fontSize: '1.8rem' }}>{stats.leads}</h3>
      </div>
    <div className="glass-premium premium-border" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', borderRadius: '8px' }}>
          <MessageSquare size={20} />
        </div>
        <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold', opacity: 0.8 }}>+5</span>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Taux de conversion</p>
      <h3 style={{ fontSize: '1.8rem' }}>{stats.conversion}%</h3>
    </div>
    <div className="glass-premium premium-border" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', borderRadius: '8px' }}>
          <Clock size={20} />
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Heures gagnées / sem</p>
      <h3 style={{ fontSize: '1.8rem' }}>14.5</h3>
    </div>
    <div className="glass-premium premium-border" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', borderRadius: '8px' }}>
          <FolderOpen size={20} />
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Honoraires sécurisés (€)</p>
      <h3 style={{ fontSize: '1.8rem' }}>{stats.revenue.toLocaleString()}€</h3>
    </div>

    {/* Main Widgets */}
    <div className="glass" style={{ gridColumn: 'span 3', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.2rem' }}>Derniers Prospects & Relances</h3>
        <button style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Voir tout <ExternalLink size={14} />
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { name: "Mme Sarah Bernard", type: "Droit de la famille", date: "Il y a 2h", status: "À relancer" },
          { name: "M. Marc Lefebvre", type: "Droit des affaires", date: "Il y a 5h", status: "SMS Envoyé" },
          { name: "Cabinet Immobilier Sud", type: "Immobilier", date: "Hier", status: "Rendez-vous" }
        ].map((p, i) => (
          <div key={i} className="glass" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {p.name.charAt(0)}
              </div>
              <div>
                <p style={{ fontWeight: '600' }}>{p.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.type} • {p.date}</p>
              </div>
            </div>
            <div style={{ 
              padding: '4px 12px', 
              borderRadius: '100px', 
              fontSize: '0.75rem', 
              background: p.status === 'À relancer' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              color: p.status === 'À relancer' ? '#fb7185' : '#34d399'
            }}>
              {p.status}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Sidebar Widget: Planning */}
    <div className="glass" style={{ gridColumn: 'span 1', padding: '24px' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Échéances & Planning</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {[
          { time: "09:30", title: "Audience Tribunal", type: "Urgent" },
          { time: "14:00", title: "RDV Client - Dossier B.", type: "Bureau" },
          { time: "16:30", title: "Appel Notaire", type: "Tél" }
        ].map((e, i) => (
          <div key={i} style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '16px' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{e.time}</p>
            <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{e.title}</p>
          </div>
        ))}
        <button className="btn-secondary" style={{ width: '100%', fontSize: '0.85rem' }}>Voir tout le planning</button>
      </div>
    </div>
  </div>
  )
}

export default Dashboard
