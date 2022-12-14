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

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Ciudades de España</label>
            <input type="text" onChange={handleInput} value={filterText} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

        </div>

    )
}

export default SearchBar