import { useEffect, useState } from "react"
import { useContext } from "react"
import { RentContext } from "../../contexts/rent.context"

const SearchBar = ({ setShowRents }) => {

    const [filterText, setFilterText] = useState("")

    const { rents, loadRents } = useContext(RentContext)


    const handleInput = e => {
        setFilterText(e.target.value)
    }

    const handleFilterRents = () => {
        if (rents) {

            const filterRents = rents.filter(elm => {
                return elm.city.toLowerCase().includes(filterText.toLowerCase())
            })
            setShowRents(filterRents)
        }
    }

    useEffect(() => {
        loadRents()
    }, [])

    useEffect(() => {
        handleFilterRents()
    }, [filterText])


    return (
        <div>
            <input type="text" onChange={handleInput} value={filterText} />
        </div>
    )
}

export default SearchBar