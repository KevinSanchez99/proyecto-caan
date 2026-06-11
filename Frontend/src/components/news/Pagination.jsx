import {MdChevronLeft, MdChevronRight} from 'react-icons/md';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="mt-xl flex justify-center gap-2">
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full bg-white border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <span className="text-lg text-on-surface-variant"><MdChevronLeft/></span>
            </button>
            
            {pages.map(page => (
                <button 
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-label-sm text-label-sm transition-colors ${
                        currentPage === page 
                            ? "bg-primary text-on-primary" 
                            : "bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full bg-white border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span aria-hidden className="text-lg text-on-surface-variant" ><MdChevronRight/></span>
            </button>
        </div>
    );
};

export default Pagination;