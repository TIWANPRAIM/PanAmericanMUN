/* =============================================
   js/committees-data.js — Pan American MUN
   All 17 committee definitions with visual identity
   ============================================= */
'use strict';

const COMMITTEES = {
  unga: {
    acronym: 'UNGA',
    fullName: 'United Nations General Assembly',
    category: 'regular',
    topic: 'Preventing another Cold War over lunar territory occupation.',
    description: 'The General Assembly was established in 1945 under the Charter of the United Nations. The General Assembly exercises deliberative, supervisory, financial, and elective functions relating to any matter within the scope of the UN Charter. It serves as the principal deliberative, policymaking and representative organ of the United Nations, though it cannot enforce resolutions or mandate state compliance.',
    accent: '#009EDB',
    gradient: 'linear-gradient(160deg, rgba(0,35,75,0.88) 0%, rgba(0,119,182,0.72) 60%, rgba(0,158,219,0.55) 100%)',
    heroImg: 'img/committees/unga.jpg',
    logo: 'img/logos/un-emblem.png',
    staff: [
      { role: 'Director',      name: 'Iker Rodriguez Cienfuegos' },
      { role: 'Moderator',     name: 'Sofia Cuellar Elizondo' },
      { role: 'Sub-Director',  name: 'Maximiliano Cruz Garza' },
      { role: 'Page',          name: 'Frida Carvallo Leija' }
    ]
  },
  unsc: {
    acronym: 'UNSC',
    fullName: 'United Nations Security Council',
    category: 'regular',
    topic: 'Promoting Conflict De-escalation Between Nuclear States: The India-Pakistan Dispute.',
    description: 'The Security Council takes the lead in determining the existence of a threat to the peace or act of aggression and calls upon the parties to a dispute to settle it by peaceful means. The Council comprises five permanent member states — the United States, China, France, Russia, and the United Kingdom — and ten elected non-permanent members.',
    accent: '#1a3a6b',
    gradient: 'linear-gradient(160deg, #0a0e1f 0%, #1a3a6b 50%, #2d5a8e 100%)',
    heroImg: 'img/committees/unsc.jpg',
    logo: 'img/logos/un-emblem.png',
    staff: [
      { role: 'Director',      name: 'Luis Mario Martínez Treviño' },
      { role: 'Moderator',     name: 'Fátima Sauceda Torres' },
      { role: 'Sub-Director',  name: 'Emilio Sierra Garcia' },
      { role: 'Page',          name: 'Victoria Garza Mercado' }
    ]
  },
  unhrc: {
    acronym: 'UNHRC',
    fullName: 'United Nations Human Rights Council',
    category: 'regular',
    topic: 'Protecting Civilians from further attacks from both Israel and Iran.',
    description: 'The UNHRC is the body of independent experts that monitors implementation of the International Covenant on Civil and Political Rights by its States parties. The committee\'s work aims to advance civil and political rights through policy changes and legal reforms, ensuring accountability for human rights violations at the international level.',
    accent: '#00796B',
    gradient: 'linear-gradient(160deg, #003D33 0%, #00796B 55%, #4CAF50 100%)',
    heroImg: 'img/committees/unga.jpg',
    logo: 'img/logos/un-emblem.png',
    staff: [
      { role: 'Director',      name: 'Victor Zermeño De Koster' },
      { role: 'Moderator',     name: 'Rebecca Garza Treviño' },
      { role: 'Sub-Director',  name: 'Diego Torres González' },
      { role: 'Page',          name: 'Mauricio Muñoz' }
    ]
  },
  csw: {
    acronym: 'CSW',
    fullName: 'Commission on the Status of Women',
    category: 'regular',
    topic: 'Protecting the rights of women in certain countries due to restriction and violated laws.',
    description: 'The CSW is the principal global intergovernmental body exclusively dedicated to the promotion of gender equality and the empowerment of women. A functional commission of the Economic and Social Council (ECOSOC), the CSW was established in 1946. Its mission encompasses advocating for women\'s rights, documenting women\'s circumstances globally, and establishing international benchmarks on gender equality.',
    accent: '#7B1FA2',
    gradient: 'linear-gradient(160deg, #3A0050 0%, #7B1FA2 55%, #E040FB 100%)',
    heroImg: 'img/committees/csw.jpg',
    logo: 'img/logos/un-emblem.png',
    staff: [
      { role: 'Director',      name: 'Camila Salazar Cavazos' },
      { role: 'Moderator',     name: 'Carolina de la Garza González' },
      { role: 'Sub-Director',  name: 'Lim Jihyun' },
      { role: 'Page',          name: 'Regina Márquez Torres' }
    ]
  },
  who: {
    acronym: 'WHO',
    fullName: 'World Health Organization',
    category: 'regular',
    topic: 'Health and environmental impacts of misuse of medicines; addressing its side effects and pollution.',
    description: 'The WHO is a specialized agency of the United Nations responsible for international public health. Established in 1948, it focuses on promoting health, ensuring global safety, and supporting vulnerable populations. Key responsibilities include disease prevention, health emergency response, universal health coverage, and combating health inequalities worldwide.',
    accent: '#0288D1',
    gradient: 'linear-gradient(160deg, #003A5C 0%, #0277BD 55%, #29B6F6 100%)',
    heroImg: 'img/committees/who.jpg',
    logo: 'img/logos/who.png',
    staff: [
      { role: 'Director',      name: 'Yhiomar Garza Rivera' },
      { role: 'Moderator',     name: 'Alejandro Hinojosa Serna' },
      { role: 'Sub-Director',  name: 'Patricio Gutiérrez Salinas' },
      { role: 'Page',          name: 'Mariana Manera Altamirano' }
    ]
  },
  unodc: {
    acronym: 'UNODC',
    fullName: 'United Nations Office on Drugs and Crime',
    category: 'regular',
    topic: 'Addressing State Complicity in the Global Drug Trade: A Barrier to Effective Drug Control.',
    description: 'UNODC is a United Nations agency responsible for helping countries address issues related to illegal drugs, crime, corruption, and terrorism. The organization operates globally to aid governments in preventing drug trafficking and abuse, combating organized crime, strengthening criminal justice systems, and protecting vulnerable populations from threats including human trafficking.',
    accent: '#C62828',
    gradient: 'linear-gradient(160deg, #1A0000 0%, #B71C1C 55%, #E53935 100%)',
    heroImg: 'img/committees/unodc.jpg',
    logo: 'img/logos/un-emblem.png',
    staff: [
      { role: 'Director',      name: 'Santiago Vargas Martínez' },
      { role: 'Moderator',     name: 'Victoria Ceseña Martínez' },
      { role: 'Sub-Director',  name: 'Amanda Peña Balli' },
      { role: 'Page',          name: 'Edgar Cuervo Cantu' }
    ]
  },
  ctc: {
    acronym: 'CTC',
    fullName: 'Counter-Terrorism Committee',
    category: 'regular',
    topic: 'Strengthening legal frameworks to combat CBRN terrorism (chemical, biological, radiological, and nuclear weapons).',
    description: 'The CTC is a UN Security Council body established after 9/11 that monitors member states\' counter-terrorism efforts. It promotes measures including legal strengthening, border security enhancement, terrorist financing disruption, and international cooperation. The committee provides guidance, assessments, and capacity-building assistance while upholding human rights and rule of law.',
    accent: '#37474F',
    gradient: 'linear-gradient(160deg, #0D1117 0%, #263238 55%, #455A64 100%)',
    heroImg: 'img/committees/ctc.jpg',
    logo: 'img/logos/un-emblem.png',
    staff: [
      { role: 'Director',      name: 'Daniel Mondragón Gallegos' },
      { role: 'Moderator',     name: 'German Rodríguez Morua' },
      { role: 'Sub-Director',  name: 'Maria Jose Zapata Sáenz' },
      { role: 'Page',          name: 'Emma García Tamez' }
    ]
  },
  unoosa: {
    acronym: 'UNOOSA',
    fullName: 'United Nations Office for Outer Space Affairs',
    category: 'regular',
    topic: 'Sustaining Human Life Beyond Earth: Mars as a New Frontier.',
    description: 'UNOOSA is the UN agency responsible for promoting the peaceful, safe, and sustainable use of outer space. The committee supports nations in developing space capabilities, facilitates international cooperation on space science and technology, and ensures implementation of space-related treaties. It also manages initiatives helping developing countries access satellite technology and disaster management resources.',
    accent: '#6A1B9A',
    gradient: 'linear-gradient(160deg, #0D0221 0%, #311B92 50%, #6A1B9A 100%)',
    heroImg: 'img/committees/unoosa.jpg',
    logo: 'img/logos/un-emblem.png',
    staff: [
      { role: 'Director',      name: 'Jaime Sebastián Puertos Martínez' },
      { role: 'Moderator',     name: 'Natalia Machado Ayala' },
      { role: 'Sub-Director',  name: 'Antonio Garza Castillo' },
      { role: 'Page',          name: 'Jose Eduardo Martínez Treviño' }
    ]
  },
  'us-senate': {
    acronym: 'US Senate',
    fullName: 'United States Senate',
    category: 'regular',
    topic: 'Addressing the recent terrorist attack on the Twin Towers.',
    description: 'The U.S. Senate serves as one of two chambers in the United States Congress. It comprises 100 senators — two from each state — who serve six-year terms. The body\'s primary responsibilities involve crafting and passing federal laws, approving treaties, and confirming key presidential appointments such as federal judges, cabinet members, and ambassadors.',
    accent: '#B71C1C',
    gradient: 'linear-gradient(160deg, #1A0000 0%, #8B0000 40%, #C62828 70%, #1565C0 100%)',
    heroImg: 'img/committees/us-senate.jpg',
    logo: 'img/logos/us-senate.png',
    staff: [
      { role: 'Director',      name: 'Roberto Garza Camarena' },
      { role: 'Moderator',     name: 'Hugo García Ocañas' },
      { role: 'Sub-Director',  name: 'Constanza Banda Cabriales' },
      { role: 'Page',          name: 'Marian Martínez Muñoz' }
    ]
  },
  eu: {
    acronym: 'EU',
    fullName: 'European Union Council',
    category: 'regular',
    topic: 'How should the EU respond to states that undermine democracy?',
    description: 'The EU is a political and economic union made up of 27 European countries that work together to promote peace, stability, and shared prosperity. It operates through institutions like the European Commission, European Parliament, and Council of the European Union, with a single market enabling free movement of goods, services, people, and capital across member states.',
    accent: '#003399',
    gradient: 'linear-gradient(160deg, #00135C 0%, #003399 55%, #1A56DB 100%)',
    heroImg: 'img/committees/eu.jpg',
    logo: 'img/logos/eu.png',
    staff: [
      { role: 'Director',      name: 'Valeria Pérez Garza' },
      { role: 'Moderator',     name: 'Fernanda Guerra Estrella' },
      { role: 'Sub-Director',  name: 'César Garza Guardo' },
      { role: 'Page',          name: 'Victoria González García' }
    ]
  },
  iom: {
    acronym: 'IOM',
    fullName: 'International Organization for Migration',
    category: 'regular',
    topic: 'Protecting Migrants in Transit: Responsibilities of Countries of Origin, Transit and Destination.',
    description: 'The IOM is a United Nations–related intergovernmental organization established in 1951 that works to ensure humane and orderly migration worldwide. Based in Geneva, Switzerland, it focuses on supporting migrants and displaced populations, assisting governments with migration management, responding to humanitarian crises, and fostering international cooperation on migration matters.',
    accent: '#0277BD',
    gradient: 'linear-gradient(160deg, #002244 0%, #0277BD 55%, #4FC3F7 100%)',
    heroImg: 'img/committees/iom.jpg',
    logo: 'img/logos/un-emblem.png',
    staff: [
      { role: 'Director',      name: 'Rebeca Cabrera Olvera' },
      { role: 'Moderator',     name: 'Roberta Navarro Zepeda' },
      { role: 'Sub-Director',  name: 'Fernanda Sandoval Salazar' },
      { role: 'Page',          name: 'Renata Abrego Zorrilla' }
    ]
  },
  gpm: {
    acronym: 'GPM',
    fullName: 'Gabinete Presidencial Mexicano',
    category: 'specialized',
    topic: 'Crisis — Soluciones a los problemas del Estado Mexicano.',
    description: 'El Gabinete Presidencial Mexicano se encarga de proponer soluciones adecuadas a los problemas que se encuentran en los Estados Unidos Mexicanos. Delegates representing different government secretaries develop policy proposals and legislative solutions, simulating the highest executive decision-making body in Mexico.',
    accent: '#006847',
    gradient: 'linear-gradient(160deg, #002B1E 0%, #006847 50%, #CE1126 100%)',
    heroImg: 'img/committees/gpm.jpg',
    logo: 'img/logos/mexico.png',
    staff: [
      { role: 'Director',      name: 'Paulette Martínez García' },
      { role: 'Moderator',     name: 'Abelardo García Rodríguez' },
      { role: 'Sub-Director',  name: 'Themis López García' },
      { role: 'Page',          name: 'Diego Gutierrez Cantú' }
    ]
  },
  icc: {
    acronym: 'ICC',
    fullName: 'International Criminal Court',
    category: 'specialized',
    topic: 'Crisis — Prosecution of crimes against humanity.',
    description: 'The ICC investigates and tries individuals charged with the gravest crimes of concern to the international community: genocide, war crimes, crimes against humanity and the crime of aggression. It functions as a complementary body to national court systems, stepping in when states are unable or unwilling to prosecute.',
    accent: '#4A4A4A',
    gradient: 'linear-gradient(160deg, #111111 0%, #2C3E50 55%, #4A5568 100%)',
    heroImg: 'img/committees/icc.jpg',
    logo: 'img/logos/icc.png',
    staff: [
      { role: 'Head Judge',    name: 'Aarón Rodríguez Morua' },
      { role: 'Moderator',     name: 'Arturo Treviño Garza' },
      { role: 'Defense',       name: 'Gia Cortés Madrigal' },
      { role: 'Prosecution',   name: 'Sofía Guajardo Núñez' },
      { role: 'Sub-Director',  name: 'Alejandra Peña Ballí' },
      { role: 'Page',          name: 'Juan Pablo Ramírez Salazar' }
    ]
  },
  interpol: {
    acronym: 'INTERPOL',
    fullName: 'International Criminal Police Organization',
    category: 'specialized',
    topic: 'Crisis — International law enforcement coordination.',
    description: 'INTERPOL is the world\'s largest police coordination body, enabling law-enforcement agencies from more than 190 countries to collaborate on investigations involving terrorism, cybercrime, trafficking, and other international offenses. It facilitates the sharing of intelligence, issues international notices, and coordinates major cross-border operations.',
    accent: '#002B7F',
    gradient: 'linear-gradient(160deg, #001040 0%, #002B7F 55%, #C8102E 100%)',
    heroImg: 'img/committees/interpol.jpg',
    logo: 'img/logos/interpol.png',
    staff: [
      { role: 'Director',      name: 'Dannia Gutiérrez Cantú' },
      { role: 'Moderator',     name: 'Valentina Garza Mercado' },
      { role: 'Sub-Director',  name: 'Lyah Rodríguez Acosta' },
      { role: 'Page',          name: 'Patricio Guajardo Garza' }
    ]
  },
  unesco: {
    acronym: 'UNESCO',
    fullName: 'UN Educational, Scientific and Cultural Organization',
    category: 'beginner',
    topic: 'Protecting the world\'s cultural heritage, traditions, history and important historical sites from wars and natural disasters.',
    description: 'UNESCO is a specialized UN agency established in 1945 focused on promoting international collaboration in education, science, culture, and communication. The organization works to foster peace and sustainable development by preserving cultural heritage through World Heritage Sites, advancing literacy and education initiatives, supporting scientific research, and championing freedom of expression.',
    accent: '#E65100',
    gradient: 'linear-gradient(160deg, #1A0800 0%, #BF360C 50%, #E65100 100%)',
    heroImg: 'img/committees/unesco.jpg',
    logo: 'img/logos/unesco.png',
    staff: [
      { role: 'Director',      name: 'Roberto Garza Villarreal' },
      { role: 'Moderator',     name: 'Mariana Cardona Bautista' },
      { role: 'Sub-Director',  name: 'Kael Hinojosa Serna' },
      { role: 'Page',          name: 'Helmut Putz Guerra' }
    ]
  },
  unicef: {
    acronym: 'UNICEF',
    fullName: 'United Nations Children\'s Fund',
    category: 'beginner',
    topic: 'Addressing the challenges of children in war zones: Ensuring children have access to clean water, sanitation, safe zones, and necessary supplies.',
    description: 'UNICEF is a United Nations agency founded in 1946 to provide humanitarian and developmental aid to children around the world. The organization prioritizes protecting children\'s rights across health care, education, nutrition, water access, and emergency relief. Operating in over 190 countries, it advocates particularly for vulnerable populations.',
    accent: '#0288D1',
    gradient: 'linear-gradient(160deg, #003655 0%, #0277BD 55%, #40C4FF 100%)',
    heroImg: 'img/committees/unicef.jpg',
    logo: 'img/logos/unicef.png',
    staff: [
      { role: 'Director',      name: 'Ximena Sierra García' },
      { role: 'Moderator',     name: 'Eloisa Ballesteros Cavasos' },
      { role: 'Sub-Director',  name: 'Aime Acosta Santos' },
      { role: 'Page',          name: 'Romina Pérez Arambula' }
    ]
  },
  'unicef-ii': {
    acronym: 'UNICEF II',
    fullName: 'United Nations Children\'s Fund — Committee II',
    category: 'beginner',
    topic: 'Addressing the challenges of children in war zones: Ensuring children have access to clean water, sanitation, safe zones and necessary supplies.',
    description: 'UNICEF II is the second committee addressing children\'s rights at Pan American MUN, sharing the mission of the main UNICEF body. This committee focuses on delivering humanitarian and developmental aid to children in conflict zones, advocating for safe access to education, clean water, and emergency relief worldwide.',
    accent: '#0097A7',
    gradient: 'linear-gradient(160deg, #002B30 0%, #00838F 55%, #26C6DA 100%)',
    heroImg: 'img/committees/unicef-ii.jpg',
    logo: 'img/logos/unicef.png',
    staff: [
      { role: 'Director',      name: 'José Mauricio González Lara' },
      { role: 'Moderator',     name: 'Silvana López Quiroga' },
      { role: 'Sub-Director',  name: 'Gabriella Sofía Fernández Correa' },
      { role: 'Page',          name: 'Isabela Lazo López' }
    ]
  }
};
