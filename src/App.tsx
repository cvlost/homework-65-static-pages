import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Main from "./containers/Main/Main";
import PageView from "./components/PageView/PageView";
import PageForm from "./components/PageForm/PageForm";
import axiosApi from "./axiosApi";
import {Page, PageList, PageBrief} from "./types";

function App() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<Page[] | null>([]);
  const pagesBrief = useRef<PageBrief[]>([]);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<PageList | null>('/pages.json');
      const pagesData = response.data;

      if (!pagesData) {
        setPages([]);
        return;
      }

      const newSidebarData: PageBrief[] = [];

      const newPages = Object.keys(pagesData).map((pageId) => {
        const page = pagesData[pageId];
        newSidebarData.push({
          title: page.title,
          route: pageId,
        });
        return page;
      });

      pagesBrief.current = newSidebarData;
      setPages(newPages);

    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    void fetchPages();
  }, [fetchPages]);

  return (
    <div className="vh-100 d-flex flex-column overflow-auto">
      <header>
        <Navbar/>
      </header>
      <main className="flex-grow-1 d-flex overflow-auto">
        <Routes>
          <Route path='/' element={(
            <Main
              loading={loading}
              pagesBrief={pagesBrief.current}
            />
          )}>
            <Route path='pages/:pageName' element={(
              <PageView/>
            )}/>
            <Route path='pages/admin/edit' element={(
              <PageForm pagesBrief={pagesBrief.current} edit reload={fetchPages}/>
            )}/>
            <Route path='pages/admin/create' element={(
              <PageForm pagesBrief={pagesBrief.current} reload={fetchPages}/>
            )}/>
            <Route path='*' element={(
              <div className="alert alert-secondary text-center mt-3 fs-4">Not Found</div>
            )}/>
          </Route>
        </Routes>
      </main>
      <footer className="py-2 text-end text-secondary bg-dark">
        <div className="container-fluid">
          <small>Static Pages - 2022</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
