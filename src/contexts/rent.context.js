import { createContext, useState } from 'react'
import rentService from '../services/Rent.service'

const RentContext = createContext()

const RentProviderWrapper = ({ children }) => {
  const [rents, setRents] = useState([])
  const [ownRents, setOwnRents] = useState([])
  const [userRents, setUserRents] = useState([])
  const [favRents, setFavRents] = useState([])
  const [deleteRent, setDeleteRent] = useState([])

  const loadRents = () => {
    rentService
      .getRents()
      .then(({ data }) => setRents(data))
      .catch((err) => console.log(err))
  }

  const loadOwnRents = () => {
    rentService
      .getOwnRents()
      .then(({ data }) => setOwnRents(data))
      .catch((err) => console.log(err))
  }

  const loadUserRents = () => {
    rentService
      .getUserRents()
      .then(({ data }) => setUserRents(data))
      .catch((err) => console.log(err))
  }

  const getLikedRents = () => {
    rentService
      .getLikedRent()
      .then(({ data }) => setFavRents(data))
      .catch((err) => console.log(err))
  }

  const deleteRents = () => {
    rentService
      .deleteRent()
      .then(({ data }) => setDeleteRent(data))
      .catch((err) => console.log(err))
  }

  return (
    <RentContext.Provider
      value={{
        rents,
        setRents,
        ownRents,
        loadRents,
        loadOwnRents,
        userRents,
        loadUserRents,
        getLikedRents,
        favRents,
        setFavRents,
        deleteRents,
        setDeleteRent,
      }}
    >
      {children}
    </RentContext.Provider>
  )
}

export { RentContext, RentProviderWrapper }
