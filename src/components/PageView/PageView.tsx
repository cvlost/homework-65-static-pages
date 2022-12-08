import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Page} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../Spinner/Spinner";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const PageView = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const {pageName} = useParams();

  const fetchPage = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<Page>(`/pages/${pageName}.json`);
      const pageData = response.data;

      if (pageData) {
        setPage(pageData);
      }

    } finally {
      setLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  let output: React.ReactNode;

  if (loading) output = <Spinner/>;
  else if (page) output = (
    <article>
      <h3>{page.title}</h3>
      <FroalaEditorView model={page.content}/>
    </article>
  );
  else output = (
    <div className="alert alert-danger text-center fs-4 mt-2">
      Couldn't get page data!
    </div>
    );

  return (
    <div>
      {output}
    </div>
  );
};

export default PageView;