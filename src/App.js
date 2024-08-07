import React, { Fragment } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publishRouter } from './router';
import { DefaultLayout } from '@/components/Layout';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publishRouter.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <div className="mt-100">
                                            {' '}
                                            {/* Thêm lớp Tailwind để dịch xuống */}
                                            <Page />
                                        </div>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
