import { useEffect, useState } from "react"
import { useContext } from "react"
import { RentContext } from "../../contexts/rent.context"

const SearchBar = ({ filterRents }) => {

    const [filterText, setFilterText] = useState("")

    const handleInput = e => {
        setFilterText(e.target.value)
        filterRents(e.target.value)
    }

    return (
        <div>
            <input type="text" onChange={handleInput} value={filterText} />
        </div>
    )
}

export default SearchBar