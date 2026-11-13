type AddBookCardProps = {
    onClick: () => void;
};

function AddBookCard({ onClick }: AddBookCardProps) {
    return (
        <button 
            className="add-book-card"
            onClick={onClick}
            type="button"
        >
            <div className="add-book-cover">
                <span className="add=book-plus">+</span>
                <span>Добавить свою книгу</span>
            </div>
        </button>
    );
}

export default AddBookCard;