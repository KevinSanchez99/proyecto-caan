const Pagination = () => (
    <div className="mt-xl flex justify-center gap-2">
        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>chevron_left</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm">
            1
        </button>
        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">
            2
        </button>
        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">
            3
        </button>
        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>chevron_right</span>
        </button>
    </div>
);

export default Pagination;