import React, {useCallback, useEffect, useMemo} from 'react';
import logo from './logo.svg';
import './App.css';
import {ApiClient} from "./ApiClient";

function App() {
    const apiClient = useMemo(() => new ApiClient(), [])

    const fetchData = useCallback(async () => {
        // do smth with data
        await apiClient.get("http://localhost:3001/users/")
    }, [apiClient])


    useEffect(() => {
        fetchData().then(() => {})
    }, [fetchData])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
