import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name: "search",
    initialState: {
        products: [],
        history: JSON.parse(localStorage.getItem("search-history")) || [],
        sortBy: JSON.parse(localStorage.getItem("search-sortBy")) || {
            popular: "Liên Quan",
            price: "none"
        },
        keyword: JSON.parse(localStorage.getItem("search-keyword")) || {},

    },
    reducers: {
        setSearch: (state, action) => {
            const { products } = action.payload;
            state.products = products;

        },
        SearchHistory: (state, action) => {
            const { history } = action.payload;
            const term = JSON.parse(localStorage.getItem("search-history")) || []
            term.push(history)
            localStorage.setItem("search-history", JSON.stringify(Array.from(new Set(term))))
            state.history = Array.from(new Set(term));
        },
        setSortBy: (state, action) => {
            const sort = action.payload;
            localStorage.setItem("search-sortBy", JSON.stringify(sort))
            state.sortBy = { ...sort };
        },
        setKeyWords: (state, action) => {

            state.keyword = action.payload.history;
            localStorage.setItem("search-keywords", JSON.stringify(action.payload.history))
        }

    }
})

export const { setSearch, SearchHistory, setKeyWords, setSortBy } = searchSlice.actions;

export default searchSlice.reducer;

export const selectProducts = (state) => state.search.products;
export const selectHistory = (state) => state.search.history;
export const selectSortBy = (state) => state.search.sortBy;
export const selectKeyword = (state) => state.search.keyword;