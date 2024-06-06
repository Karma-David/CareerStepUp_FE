import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import style from './Header.module.scss';
import images from '@/assets/images';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { wrapper as PopperWrapper } from '@/components/Popper';
import KhoaHoc from '@/components/KhoaHoc';

const cx = classNames.bind(style);

function Header() {
    const [SearchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 1000);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>
                <div>
                    <Tippy
                        interactive
                        visible={SearchResult.length > 0}
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
                    >
                        <div className={cx('search')}>
                            <input placeholder="Search account or video" spellCheck={false} />
                            <button className={cx('clear')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </Tippy>
                </div>
                <div className={cx('action')}>
                    <Button to={'/Register'}>
                        Sign in
                    </Button>
                    <Button to={'/Login'}>Log in</Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
