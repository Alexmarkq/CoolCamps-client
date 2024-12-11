import { useState } from "react"

const SearchBar = ({ filterRents }) => {

    const [filterText, setFilterText] = useState("")

    const handleInput = e => {
        setFilterText(e.target.value)
        filterRents(e.target.value)
    }

    return (
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Ciudades de España</label>
            <input type="text" onChange={handleInput} value={filterText} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

        </div>
    )
}

export default SearchBar