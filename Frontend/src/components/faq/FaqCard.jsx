import { MdArrowRightAlt } from 'react-icons/md';
const FaqCard = ({ title, description, actionText, actionLink }) => (
    <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_10px_20px_rgba(0,0,0,0.03)] border border-outline-variant/20 flex flex-col h-full">
        <h3 className="font-h3 text-h3 text-on-surface mb-sm">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant grow">
            {description}
        </p>
        {actionText && (
            <a
                href={actionLink || "#"}
                className="mt-md font-label-sm text-label-sm text-tertiary hover:underline self-start flex items-center gap-xs"
            >
                {actionText} <span className="text-[16px]"><MdArrowRightAlt/></span>
            </a>
        )}
    </div>
);

export default FaqCard;