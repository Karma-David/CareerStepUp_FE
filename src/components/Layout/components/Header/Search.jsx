import KhoaHoc from '@/components/KhoaHoc';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
        setSearchResult([]);
    }, []);
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        console.log('clearSearch');
        console.log('reset result');
        inputRef.current.focus();
    };
    const handleResultHide = () => {
        setShowResultHide(false);
    };
    useEffect(() => {
        console.log('showResultHide changed:', showResultHide);
    }, [showResultHide]);
    return (
        <Tippy
            interactive
            visible={showResultHide && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Khoa Hoc</h4>
                        <KhoaHoc />
                        <KhoaHoc />
                        <KhoaHoc />
                        <KhoaHoc />
                        <KhoaHoc />
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
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResultHide(false)}
                />
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;
