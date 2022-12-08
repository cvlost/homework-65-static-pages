import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Main from "./containers/Main/Main";
import PageView from "./components/PageView/PageView";
import PageForm from "./components/PageForm/PageForm";
import axiosApi from "./axiosApi";
import {PageApi, PageList, SidebarEntity} from "./types";

function App() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<PageApi[] | null>([]);
  const sidebarData = useRef<SidebarEntity[]>([]);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<PageList | null>('/pages.json');
      const pagesData = response.data;

      if (!pagesData) {
        setPages([]);
        return;
      }

      const newSidebarData: SidebarEntity[] = [];

      const newPages = Object.keys(pagesData).map((pageId) => {
        const page = pagesData[pageId];
        newSidebarData.push({
          title: page.title,
          route: pageId,
        });
        return page;
      });

      sidebarData.current = newSidebarData;
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
              sidebarData={sidebarData.current}
            />
          )}>
            <Route path='pages/:pageName' element={(
              <PageView/>
            )}/>
            <Route path='pages/admin' element={(
              <PageForm/>
            )}/>
          </Route>
        </Routes>
      </main>
      <footer className="py-2 text-center text-secondary bg-dark">
        footer
      </footer>
    </div>
  );
}

export default App;
