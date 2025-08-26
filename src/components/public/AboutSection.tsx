import React from 'react';
import { Users, Target, Heart, Award, Calendar, Zap } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Despre Football<span className="text-green-500">Voice</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unde pasiunea pentru fotbal devine cuvânt. Suntem o platformă dedicată 
            iubitorilor fotbalului care caută analize aprofundate, interviuri exclusive 
            și cele mai recente știri din lumea sportului rege.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 ml-4">Misiunea Noastră</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Să oferim conținut de calitate superioară despre fotbal, combinând jurnalismul 
              tradițional cu inovația tehnologică. Ne dedicăm să aducem poveștile fotbalului 
              mai aproape de fanii din întreaga lume.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Credem că fotbalul nu este doar un sport - este o pasiune care unește oameni 
              din toate culturile și mediile sociale.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 ml-4">Viziunea Noastră</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Să devenim vocea de referință în jurnalismul sportiv din România, 
              recunoscuți pentru acuratețe, creativitate și pasiunea cu care abordăm 
              fiecare poveste.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aspirăm să inspirăm următoarea generație de jurnaliști sportivi și 
              să creăm o comunitate vibrantă de iubitori ai fotbalului.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Valorile Noastre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Excelența</h3>
              <p className="text-gray-600">
                Ne străduim să livrăm conținut de cea mai înaltă calitate, 
                cu atenție la detalii și rigoare jurnalistică.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Comunitatea</h3>
              <p className="text-gray-600">
                Construim o comunitate unită de pasiunea pentru fotbal, 
                unde fiecare voce contează și este respectată.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Inovația</h3>
              <p className="text-gray-600">
                Adoptăm tehnologiile moderne pentru a oferi experiențe unice, 
                incluzând conținut audio și interactiv.
              </p>
            </div>
          </div>
        </div>

        {/* Team Story */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg">
                <Calendar className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Povestea Noastră
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                FootballVoice s-a născut din pasiunea unui grup de jurnaliști și dezvoltatori 
                pentru fotbal și tehnologie. În 2025, am decis să combinăm expertiza noastră 
                în jurnalism cu inovația tehnologică pentru a crea o platformă unică.
              </p>
              <p>
                Ne-am propus să revolutionăm modul în care consumăm conținutul sportiv, 
                introducând elemente audio interactive și analize aprofundate care să 
                ofere cititorilor o experiență completă.
              </p>
              <p>
                Astăzi, FootballVoice este o platformă în continuă creștere, cu o echipă 
                dedicată de jurnaliști, editori și dezvoltatori care lucrează împreună 
                pentru a aduce cele mai bune povești din lumea fotbalului.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Articole Publicate</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <div className="text-gray-600">Cititori Lunari</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600">Interviuri Exclusive</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
            <div className="text-gray-600">Ore de Conținut Audio</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
