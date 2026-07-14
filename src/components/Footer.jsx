export default function Footer() {
    return (
        <footer className="border-t border-bone/10 bg-ink py-10">
            <div
                className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-12">

                <div className="flex flex-col gap-1 sm:gap-0.5">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
                        META-Development
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70">
                        IČO: 12345678 | Jablonec nad Nisou, Česká republika
                    </p>
                </div>

                <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-fog">
                    <a href="#services" data-cursor="link" className="transition-colors hover:text-bone">
                        Služby
                    </a>
                    <a href="#poptavka" data-cursor="link" className="transition-colors hover:text-bone">
                        Poptávka
                    </a>
                    <a
                        href="mailto:info@metadev.cz"
                        data-cursor="link"
                        className="transition-colors hover:text-bone"
                    >
                        E-mail
                    </a>
                </nav>

                <p className="font-mono text-[11px] text-fog/70">
                    © 2026 META-Development. Všechna práva vyhrazena.
                </p>
            </div>
        </footer>
    )
}