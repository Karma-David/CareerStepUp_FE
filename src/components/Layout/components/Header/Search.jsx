import KhoaHoc from '@/components/KhoaHoc';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { wrapper as PopperWrapper } from '@/components/Popper';
import style from './Header.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(style);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResultHide, setShowResultHide] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        // Set searchResult to an empty array initially
        setSearchResult([1, 2, 3]);
    }, []);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        setShowResultHide(false);
        console.log('clearSearch');
        console.log('reset result', searchResult);
        inputRef.current.focus();
    };

    const handleResultHide = () => {
        setShowResultHide(false);
    };

    const styles = {
        show: {
            display: 'block',
        },
        hide: {
            display: 'none',
        },
    };

    useEffect(() => {
        console.log('showResultHide changed:', showResultHide);
    }, [showResultHide]);

    useEffect(() => {
        console.log('searchResult updated:', searchResult);
    }, [searchResult]);

    return (
        <Tippy
            interactive
            visible={showResultHide && (searchResult.length > 0 || searchValue)}
            render={(attrs) => (
                <div
                    style={showResultHide ? styles.show : styles.hide}
                    className={cx('search-result')}
                    tabIndex="-1"
                    {...attrs}
                >
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Khoa Hoc</h4>
                        {searchResult.length > 0 ? (
                            searchResult.map((_, index) => <KhoaHoc key={index} />)
                        ) : (
                            <div>{setShowResultHide(false)}</div>
                        )}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleResultHide}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search account or video"
                    spellCheck={false}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setShowResultHide(true);
                    }}
                    onFocus={() => setShowResultHide(true)}
                />
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;