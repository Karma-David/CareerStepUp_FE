import React, { useState, useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import style from './Header.module.scss'; // Update the import path if necessary
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import KhoaHoc from '@/components/KhoaHoc'; // Import KhoaHoc component

const cx = classNames.bind(style);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false); // State to determine when to show KhoaHoc results
    const searchInputRef = useRef(null); // Ref to manage search input focus

    useEffect(() => {
        // Function to get search query parameter from URL
        const getSearchFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if (searchQuery) {
                setSearchValue(searchQuery);
                // Show KhoaHoc results when searchValue is set from URL
            }
        };

        getSearchFromUrl();

        // Subscribe to focus events on the search input
        const handleFocus = () => {
            setShowResult(true); // Show KhoaHoc results when search input is focused/clicked
        };

        const handleBlur = () => {
            setShowResult(false); // Hide KhoaHoc results when search input loses focus
        };

        const inputRef = searchInputRef.current; // Store the current value to avoid issues with cleanup

        if (inputRef) {
            inputRef.addEventListener('focus', handleFocus);
            inputRef.addEventListener('blur', handleBlur);
        }

        return () => {
            // Clean up event listeners when component unmounts
            if (inputRef) {
                inputRef.removeEventListener('focus', handleFocus);
                inputRef.removeEventListener('blur', handleBlur);
            }
        };
    }, []);

    useEffect(() => {
        const isSearchInputFocused = () => {
            return document.activeElement === searchInputRef.current;
        };
        // Check if searchValue is not empty to show KhoaHoc results
        setShowResult(isSearchInputFocused());
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowResult(false); // Ensure KhoaHoc results are not shown until user clicks on search input again
        // Navigate to Home page with search value
        window.location.href = `/?search=${encodeURIComponent(searchValue)}`; // Ensure searchValue is properly encoded
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    return (
        <div className="form-value">
            <Tippy
                interactive
                visible={showResult && !!searchValue}
                render={(attrs) => (
                    <div
                        style={{ border: '1px solid', backgroundColor: '#ccc',borderRadius: '5px'  }}
                        className={cx('search-result')}
                        tabIndex="-1"
                        {...attrs}
                    >
                        {showResult && <KhoaHoc search={searchValue} />}
                    </div>
                )}
            >
                <form className={cx('search')} onSubmit={handleSubmit}>
                    <input
                        value={searchValue}
                        placeholder="Search account or video"
                        spellCheck={false}
                        onChange={handleSearchChange}
                        ref={searchInputRef} // Assign ref to manage focus
                    />
                    {!!searchValue && (
                        <button type="button" className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    <button type="submit" className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </Tippy>
        </div>
    );
}

export default Search;
