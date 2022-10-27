import React, {useCallback, useEffect, useMemo} from 'react';
import './App.css';
import {ApiClient} from "./ApiClient";
import Table from './components/Table';

function App() {
    // const apiClient = useMemo(() => new ApiClient(), [])

    // const fetchData = useCallback(async () => {
    //     // do smth with data
    //     await apiClient.get("http://localhost:3001/users/")
    // }, [apiClient])


    // useEffect(() => {
    //     fetchData().then(() => {})
    // }, [fetchData])

    return (
        <div className="App">
            <Table />
        </div>
    );
}

export default App;
