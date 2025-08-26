# FootballVoice 🏈

**Unde pasiunea pentru fotbal devine cuvânt**

FootballVoice este o platformă modernă de blog dedicată fotbalului, combinând jurnalismul tradițional cu tehnologia modernă pentru a oferi o experiență unică cititorilor pasionați de sportul rege.

## 🚀 Caracteristici Principale

### 🌐 Site Public
- **Homepage dinamic** cu articole featured și hero section
- **Sistem de categorii** (Analize Meciuri, Portrete Jucători, Știri & Transferuri, etc.)
- **Căutare avansată** în timp real
- **Design responsive** optimizat pentru toate dispozitivele
- **Pagini dedicate** (Despre, Contact)
- **Newsletter subscription**

### 👨‍💼 Panou Admin
- **Dashboard complet** cu statistici și analize
- **Editor de articole** cu suport audio
- **Gestionare categorii** și tag-uri
- **Sistem de management abonați**
- **Creator de newsletter-uri** cu șabloane
- **Analytics detaliate** cu grafice și rapoarte

### 🎨 Design & UX
- **Design modern** cu gradient signature blue-green
- **Interfață intuitivă** în română
- **Animații subtile** și efecte hover
- **Iconuri Lucide React** pentru consistență
- **Tipografie optimizată** pentru citire

## 🛠️ Tehnologii Utilizate

- **React 18** cu TypeScript
- **Vite** pentru build și development
- **Tailwind CSS** pentru styling
- **React Router** pentru navigare
- **Lucide React** pentru iconuri
- **LocalStorage** pentru persistența datelor

## 📦 Instalare și Rulare

### Cerințe Preliminare
- Node.js 18+ 
- npm sau yarn

### Pași de Instalare

1. **Clonează repository-ul:**
```bash
git clone https://github.com/nnoldi-hub/FootbalVoice.git
cd FootbalVoice
```

2. **Instalează dependențele:**
```bash
npm install
```

3. **Pornește serverul de dezvoltare:**
```bash
npm run dev
```

4. **Accesează aplicația:**
Deschide browserul la `http://localhost:5173`

## 🎯 Funcționalități Detaliate

### Partea Publică
- ✅ **Homepage** cu articole featured și căutare
- ✅ **Categorii de articole** cu filtrare
- ✅ **Vizualizare articole** cu conținut audio opțional
- ✅ **Pagina Despre** cu misiunea și viziunea platformei
- ✅ **Pagina Contact** cu formular funcțional
- ✅ **Footer complet** cu link-uri sociale

### Panoul Admin  
- ✅ **Autentificare securizată**
- ✅ **Dashboard cu statistici**
- ✅ **CRUD articole** cu editor avansat
- ✅ **Gestionare abonați** cu filtrare și căutare
- ✅ **Manager newsletter-uri** cu șabloane
- ✅ **Analytics** cu rapoarte detaliate

## 🚀 Comenzi Disponibile

```bash
# Dezvoltare
npm run dev          # Pornește serverul de dezvoltare

# Build
npm run build        # Construiește aplicația pentru producție
npm run preview      # Previzualizează build-ul de producție

# Linting
npm run lint         # Verifică codul cu ESLint
```

## 📂 Structura Proiectului

```
src/
├── components/
│   ├── admin/           # Componente pentru panoul admin
│   │   ├── AdminHeader.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── ArticleEditor.tsx
│   │   ├── ArticleManager.tsx
│   │   ├── Analytics.tsx
│   │   ├── NewsletterManager.tsx
│   │   └── SubscriberManager.tsx
│   ├── public/          # Componente pentru site-ul public
│   │   ├── AboutSection.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleView.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FeaturedArticles.tsx
│   │   ├── Newsletter.tsx
│   │   ├── PublicFooter.tsx
│   │   └── PublicHeader.tsx
│   └── legacy/          # Componente legacy (opțional)
├── pages/
│   ├── AdminDashboard.tsx
│   ├── LoginPage.tsx
│   └── PublicSite.tsx
├── types/
│   └── index.ts         # Tipuri TypeScript
├── utils/
│   └── storage.ts       # Utilități pentru localStorage
└── App.tsx             # Componenta principală
```

## 🎨 Teme de Culori

```css
/* Paleta principală */
--blue-primary: #2563eb      /* Albastru principal */
--green-accent: #10b981      /* Verde accent */
--blue-gradient: linear-gradient(to right, #2563eb, #1d4ed8, #10b981)
--gray-light: #f8fafc       /* Fundal deschis */
--gray-text: #64748b        /* Text secundar */
```

## 🤝 Contribuții

Contribuțiile sunt binevenite! Pentru schimbări majore:

1. Fork repository-ul
2. Creează un branch pentru feature (`git checkout -b feature/amazing-feature`)
3. Commit modificările (`git commit -m 'Add amazing feature'`)
4. Push la branch (`git push origin feature/amazing-feature`)
5. Deschide un Pull Request

## 📝 Licență

Acest proiect este licențiat sub [MIT License](LICENSE).

## 📞 Contact

Pentru întrebări sau sugestii:
- **Email:** contact@footballvoice.ro
- **GitHub:** [@nnoldi-hub](https://github.com/nnoldi-hub)

---

**FootballVoice** - Dezvoltat cu ❤️ și pasiune pentru fotbal în 2025
