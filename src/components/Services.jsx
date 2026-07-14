import {useState} from 'react'
import {AnimatePresence, LayoutGroup, motion} from 'framer-motion'
import {ArrowUpRight} from 'lucide-react'
import Marquee from './Marquee'

const SERVICES = [
    {
        id: '01',
        title: 'Webové prezentace',
        tags: ['Firemní web', 'Landing page', 'Kampaně'],
        detail:
            'Marketingové weby a launch stránky, které udrží pozornost i po prvním scrollu — ne šablona s vaším logem. Každý web navrhujeme na míru vašemu příběhu a cílové skupině, ne podle hotové sady komponent.',
        points: [
            'Copywriting a struktura obsahu na míru',
            'Responzivní design pro všechna zařízení',
            'SEO základ a rychlé načítání stránky',
            'Napojení na analytiku a poptávkové formuláře',
        ],
        timeline: '2–5 týdnů',
        shape: (
            <svg viewBox="0 0 80 80" className="h-full w-full">
                <motion.rect
                    x="16" y="16" width="48" height="48" rx="2"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    animate={{rotate: 360}}
                    transition={{duration: 12, repeat: Infinity, ease: 'linear'}}
                    style={{transformOrigin: '40px 40px'}}
                />
                <circle cx="40" cy="40" r="4" fill="currentColor"/>
            </svg>
        ),
    },
    {
        id: '02',
        title: 'Webové aplikace',
        tags: ['Dashboardy', 'Interní nástroje', 'SaaS'],
        detail:
            'Produkty stavěné na denní, reálné používání — datově bohaté, rychlé a odolné vůči skutečným uživatelům. Řešíme celý stack od databáze po rozhraní, takže nic nezůstává mezi dvěma dodavateli.',
        points: [
            'Návrh datového modelu a API',
            'Autentizace a řízení přístupových práv',
            'Škálovatelná infrastruktura a nasazení',
            'Testování, monitoring a chybové logy',
        ],
        timeline: '6–14 týdnů',
        shape: (
            <svg viewBox="0 0 80 80" className="h-full w-full">
                {[0, 1, 2].map((i) => (
                    <motion.circle
                        key={i}
                        cx="40" cy="40" r={10 + i * 10}
                        fill="none" stroke="currentColor" strokeWidth="1"
                        animate={{scale: [1, 1.06, 1]}}
                        transition={{duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut'}}
                        style={{transformOrigin: '40px 40px'}}
                    />
                ))}
            </svg>
        ),
    },
    {
        id: '03',
        title: 'Mobilní aplikace',
        tags: ['iOS', 'Android', 'PWA'],
        detail:
            'Nativní i hybridní aplikace, které se cítí jako doma na každém zařízení. Využíváme moderní frameworky, takže vývoj je rychlý a údržba levná — ať už stavíte pro iOS, Android nebo obojí.',
        points: [
            'Nativní výkon a přístup k hardwaru',
            'Offline režim a push notifikace',
            'Distribuce přes App Store / Google Play',
            'Testování na reálných zařízeních',
        ],
        timeline: '8–16 týdnů',
        shape: (
            <svg viewBox="0 0 80 80" className="h-full w-full">
                <motion.rect
                    x="28" y="12" width="24" height="56" rx="4"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    animate={{rotate: [0, 4, 0, -4, 0]}}
                    transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
                    style={{transformOrigin: '40px 40px'}}
                />
                <circle cx="40" cy="60" r="2" fill="currentColor"/>
            </svg>
        ),
    },
    {
        id: '04',
        title: 'Produktový design',
        tags: ['Design systémy', 'UX', 'Prototypy'],
        detail:
            'Rozhraní navržená tak, aby přežila i druhé a třetí vydání — konzistentní, zdokumentovaná a předaná vašemu týmu v pořádku. Design a kód vznikají společně, takže nic se při předání "neztratí v překladu".',
        points: [
            'Wireframy a mapování uživatelských toků',
            'Znovupoužitelná komponentová knihovna',
            'Klikatelné prototypy s reálnými daty',
            'Předání ve Figmě i přímo v kódu',
        ],
        timeline: '3–6 týdnů',
        shape: (
            <svg viewBox="0 0 80 80" className="h-full w-full">
                <motion.path
                    d="M40 12 L68 60 H12 Z"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    animate={{rotate: [0, 8, 0, -8, 0]}}
                    transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
                    style={{transformOrigin: '40px 44px'}}
                />
            </svg>
        ),
    },
    {
        id: '05',
        title: 'Systémy &amp; infrastruktura',
        tags: ['Výkon', 'Nasazení', 'Monitoring'],
        detail:
            'Nudná, ale kritická práce — CI, hosting, observabilita — nastavené jednou a správně, ať vás nic nebudí ve 2 ráno. Řešíme i migrace a audit stávající infrastruktury, pokud na něčem už stavíte.',
        points: [
            'CI/CD pipeline pro rychlé a bezpečné nasazení',
            'Hosting, škálování a optimalizace výkonu',
            'Monitoring, alerting a incident response',
            'Zálohy a bezpečnostní audit',
        ],
        timeline: 'Průběžně / dle rozsahu',
        shape: (
            <svg viewBox="0 0 80 80" className="h-full w-full">
                {[18, 40, 62].map((y, i) => (
                    <motion.rect
                        key={y}
                        x="16" y={y - 0.75} width="48" height="1.5"
                        fill="currentColor"
                        initial={{scaleX: 0}}
                        animate={{scaleX: 1}}
                        transition={{
                            duration: 1.2,
                            delay: i * 0.15,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            repeatDelay: 1
                        }}
                        style={{transformOrigin: '16px center', transformBox: 'fill-box'}}
                    />
                ))}
            </svg>
        ),
    },
]

const row = {
    hidden: {opacity: 0, y: 20},
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1]},
    }),
}

function ServiceRow({service, index, isOpen, onToggle}) {
    return (
        <motion.div
            layout="position"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.4}}
            custom={index}
            variants={row}
            transition={{layout: {duration: 0.35, ease: [0.16, 1, 0.3, 1]}}}
            className="border-b border-bone/10"
        >
            <button
                type="button"
                data-cursor="link"
                onClick={onToggle}
                className="group relative flex w-full items-center gap-6 overflow-hidden py-8 text-left"
            >
                <motion.span
                    initial={{scaleX: 0}}
                    animate={{scaleX: isOpen ? 1 : 0}}
                    transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
                    className="absolute inset-0 origin-left bg-bone"
                />
                <span
                    className={`relative z-10 font-mono text-sm transition-colors duration-300 ${
                        isOpen ? 'text-ink/50' : 'text-fog'
                    }`}
                >
          {service.id}
        </span>

                <h3
                    className={`relative z-10 flex-1 font-display text-3xl transition-colors duration-300 sm:text-5xl ${
                        isOpen ? 'text-ink' : 'text-bone group-hover:text-fog'
                    }`}
                    dangerouslySetInnerHTML={{__html: service.title}}
                />

                <div
                    className={`relative z-10 hidden gap-2 sm:flex ${
                        isOpen ? 'text-ink/50' : 'text-fog'
                    }`}
                >
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-current/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                        >
              {tag}
            </span>
                    ))}
                </div>

                <motion.span
                    animate={{rotate: isOpen ? 45 : 0}}
                    transition={{duration: 0.3}}
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isOpen ? 'border-ink/30 text-ink' : 'border-bone/20 text-bone'
                    }`}
                >
                    <ArrowUpRight className="h-4 w-4"/>
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
                    >
                        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-[1.3fr_1fr_110px]">
                            <div>
                                <p className="max-w-lg text-base leading-relaxed text-fog">
                                    {service.detail}
                                </p>
                                <p className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-acid">
                                    Typický rozsah
                                    <span className="h-1 w-1 rounded-full bg-acid"/>
                                    {service.timeline}
                                </p>
                            </div>

                            <ul className="flex flex-col gap-3">
                                {service.points.map((point) => (
                                    <li key={point} className="flex items-start gap-3 text-sm text-fog">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-acid"/>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <div className="h-24 w-24 text-acid">{service.shape}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function Services() {
    const [openIndex, setOpenIndex] = useState(-1)

    return (
        <section id="services" className="relative bg-ink py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                    variants={row}
                    className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
                            Co stavíme — index
                        </p>
                        <h2 className="mt-4 font-display text-4xl text-bone sm:text-5xl">
                            Pět disciplín.
                            <br/>
                            Jedno studio.
                        </h2>
                    </div>
                    <p className="max-w-sm text-fog">
                        Žádné přehazování mezi agenturami. Všechno probíhá pod jednou
                        střechou — klikněte na řádek a zjistěte, jak to funguje.
                    </p>
                </motion.div>

                <LayoutGroup>
                    <div>
                        {SERVICES.map((service, index) => (
                            <ServiceRow
                                key={service.id}
                                service={service}
                                index={index}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                            />
                        ))}
                    </div>
                </LayoutGroup>
            </div>

            <Marquee
                className="mt-24 border-y border-bone/10 py-4"
                items={['REACT', 'NEXT.JS', 'NODE', 'TAILWIND', 'POSTGRES', 'DOCKER', 'TYPESCRIPT', 'FLUTTER', 'DART', 'JAVASCRIPT']}
            />
        </section>
    )
}
