import { MdExpandMore } from 'react-icons/md';
const AcordionItems = ({ question, children, defaultOpen = false }) => (
    <details
        className="group bg-surface-container-lowest rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.03)] border border-outline-variant/20 overflow-hidden"
        open={defaultOpen}
    >
        <summary className="flex justify-between items-center cursor-pointer p-md font-h3 text-h3 text-on-surface list-none">
            {question}
            <span className="text-primary group-open:rotate-180 transition-transform duration-300">
                <MdExpandMore/>
            </span>
        </summary>
        <div className="p-md pt-0 text-body-md font-body-md text-on-surface-variant border-t border-outline-variant/10 mt-sm">
            {children}
        </div>
    </details>
);

export default AcordionItems;