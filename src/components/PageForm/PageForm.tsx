import React, {useCallback, useState} from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import Editor from 'react-froala-wysiwyg';
import {Page, PageBrief} from "../../types";
import {Button, Form, InputGroup} from "react-bootstrap";
import axiosApi from "../../axiosApi";
import slug from "slug";
import {useNavigate} from "react-router-dom";
import Spinner from "../Spinner/Spinner";

interface Props {
  pagesBrief: PageBrief[];
  edit?: boolean;
  reload: () => void;
}

const initialState: Page = {
  title: '',
  content: '',
}

const PageForm: React.FC<Props> = ({pagesBrief, edit = false, reload}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    title: '',
    content: '',
  });

  const createPage = async () => {
    try {
      setLoading(true);
      await axiosApi.put(`/pages/${slug(page.title)}.json`, page);
      reload();
      navigate(`/pages/${slug(page.title)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (edit) {

    } else {
      void createPage();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(prev => ({...prev, title: e.target.value}))
  };

  const handleContentChange = (content: string) => {
    setPage(prev => ({...prev, content}));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4>{edit ? 'Edit Page' : 'Create a New Page'}</h4>
      {edit && (
        <Form.Group className="mb-3">
          <Form.Label>Disabled select menu</Form.Label>
          <Form.Select>
            <option>Disabled select</option>
          </Form.Select>
        </Form.Group>
      )}
      <fieldset disabled={loading}>
        <Form.Group className="mb-3 d-flex shadow-sm bg-white sticky-top">
          <InputGroup className="">
            <InputGroup.Text id="basic-addon3">
              Title
            </InputGroup.Text>
            <Form.Control
              placeholder="Page Title..."
              onChange={handleTitleChange}
              value={page.title}
            />
            <Button
              type='submit'
            >Save</Button>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Page content</Form.Label>
          {loading ? (
            <Spinner/>
          ) : (
            <Editor
              tag='textarea'
              model={page.content}
              onModelChange={handleContentChange}
            />
          )}
        </Form.Group>
      </fieldset>
    </Form>
  );
};

export default PageForm;