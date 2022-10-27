import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
// import {ApiClient} from "./ApiClient";
import Table from './components/Table';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const toggleTheme = () => {
        if (theme === 'light') {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      };
    // const apiClient = useMemo(() => new ApiClient(), [])

    // const fetchData = useCallback(async () => {
    //     // do smth with data
    //     await apiClient.get("http://localhost:3001/users/")
    // }, [apiClient])


    // useEffect(() => {
    //     fetchData().then(() => {})
    // }, [fetchData])

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    return (
        <div className={`App ${theme}`}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <Table />
        </div>
    );
}

export default App;
