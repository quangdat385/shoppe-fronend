import { useState, useEffect } from "react"

const useHomePage = () => {
    const [homePage, setHomePage] = useState(JSON.parse(localStorage.getItem("home_page")) || {
        popular: "Phổ Biến",
        price: "none",
        menu: 0
    });

    useEffect(() => {
        localStorage.setItem("home_page", JSON.stringify(homePage))
    }, [homePage])

    return [homePage, setHomePage]
}
export default useHomePage;