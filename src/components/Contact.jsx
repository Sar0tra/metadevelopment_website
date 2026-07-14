import {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {ArrowUpRight, CheckCircle2, Mail, Phone} from 'lucide-react'

const PROJECT_TYPES = ['Webová prezentace', 'Webová aplikace', 'Ještě nevím']

const fade = {
    hidden: {opacity: 0, y: 20},
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1]},
    }),
}

function Field({label, ...props}) {
    return (
        <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-widest text-fog">
        {label}
      </span>
            <input
                {...props}
                className="mt-3 w-full border-b border-bone/20 bg-transparent pb-3 font-display text-xl text-bone outline-none transition-colors placeholder:text-fog/50 focus:border-acid sm:text-2xl"
            />
        </label>
    )
}

export default function Contact() {
    const [submitted, setSubmitted] = useState(false)
    const [projectType, setProjectType] = useState(PROJECT_TYPES[0])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section id="poptavka" className="relative overflow-hidden bg-ink py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0 noise-overlay"/>
            <div
                className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-acid-glow blur-3xl"/>

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-8 lg:px-12">
                {/* left — pitch + contact info */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.4}}
                    variants={fade}
                    className="lg:col-span-5"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
                        05 — Poptávka
                    </p>
                    <h2 className="mt-4 font-display text-5xl leading-[0.95] text-bone sm:text-6xl">
                        Máte
                        <br/>
                        projekt?
                    </h2>
                    <p className="mt-8 max-w-sm text-lg leading-relaxed text-fog">
                        Napište nám pár vět o tom, co potřebujete. Ozveme se do 24 hodin s
                        konkrétním dalším krokem — bez generických nabídek, bez čekání
                        týdny.
                    </p>

                    <div className="mt-12 flex flex-col gap-4 border-t border-bone/10 pt-8">
                        <a
                            href="mailto:info@metadev.cz"
                            data-cursor="link"
                            data-cursor-text="Napsat"
                            className="group flex items-center gap-3 text-bone transition-colors hover:text-acid"
                        >
                            <Mail className="h-4 w-4 text-fog transition-colors group-hover:text-acid"/>
                            <span className="font-medium">info@metadev.cz</span>
                        </a>
                        <a
                            href="tel:+420608716133"
                            data-cursor="link"
                            className="group flex items-center gap-3 text-bone transition-colors hover:text-acid"
                        >
                            <Phone className="h-4 w-4 text-fog transition-colors group-hover:text-acid"/>
                            <span className="font-medium">+420 608 716 133 </span>
                        </a>
                    </div>
                </motion.div>

                {/* right — form */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.3}}
                    custom={0.15}
                    variants={fade}
                    className="lg:col-span-7"
                >
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{opacity: 0, y: 12}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0}}
                                className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-acid/30 bg-acid/[0.04] p-10 text-center"
                            >
                                <CheckCircle2 className="h-10 w-10 text-acid"/>
                                <h3 className="font-display text-2xl text-bone">
                                    Díky! Poptávka je na cestě.
                                </h3>
                                <p className="max-w-sm text-fog">
                                    Ozveme se vám do 24 hodin na uvedený e-mail s dalším krokem.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                exit={{opacity: 0}}
                                className="flex flex-col gap-8"
                            >
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                    <Field label="Jméno a příjmení" type="text" placeholder="Jana Nováková" required/>
                                    <Field label="E-mail" type="email" placeholder="jana@firma.cz" required/>
                                </div>

                                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-fog">
                    Typ projektu
                  </span>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {PROJECT_TYPES.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                data-cursor="link"
                                                onClick={() => setProjectType(type)}
                                                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                                                    projectType === type
                                                        ? 'border-acid bg-acid text-ink'
                                                        : 'border-bone/20 text-fog hover:border-bone/40 hover:text-bone'
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-fog">
                    O co jde?
                  </span>
                                    <textarea
                                        rows={3}
                                        placeholder="Pár vět o projektu, termínu a rozpočtu…"
                                        required
                                        className="mt-3 w-full resize-none border-b border-bone/20 bg-transparent pb-3 font-display text-xl text-bone outline-none transition-colors placeholder:text-fog/50 focus:border-acid"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    data-cursor="link"
                                    data-cursor-text="Odeslat"
                                    className="group relative mt-2 inline-flex w-fit items-center gap-3 overflow-hidden rounded-full border border-acid px-7 py-4 font-mono text-xs uppercase tracking-widest text-acid transition-colors duration-300"
                                >
                                    <span
                                        className="absolute inset-0 -translate-x-full bg-acid transition-transform duration-400 ease-out group-hover:translate-x-0"/>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                    Odeslat poptávku
                  </span>
                                    <ArrowUpRight
                                        className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"/>
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
