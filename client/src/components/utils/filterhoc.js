const hasBook = searchedTerm => 
    book => !searchedTerm || book.title.toLowerCase().includes(searchedTerm.toLowerCase())

export default hasBook;