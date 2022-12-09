import React, {useCallback, useEffect, useState} from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import Editor from 'react-froala-wysiwyg';
import {Page, PageBrief} from "../../types";
import {Button, Form, InputGroup} from "react-bootstrap";
import axiosApi from "../../axiosApi";
import slug from "slug";
import {useNavigate} from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const froalaConfig = {
  placeholder: 'Page content here...',
  editorClass: 'shadow-sm',
  height: 300
}

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
  const [page, setPage] = useState<Page>(initialState);
  const [selectedPageId, setSelectedPageId] = useState('');

  const [newPageId, setNewPageId] = useState('');
  const [newIdIsValid, setNewIdIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('ID is Empty');

  const getPage = useCallback(async () => {
    try {
      const selectedPageIndex = pagesBrief.findIndex((page) => page.route === selectedPageId);
      setLoading(true);
      const response = await axiosApi.get<Page>('/pages/' + pagesBrief[selectedPageIndex].route + '.json');
      setPage(response.data);
    } finally {
      setLoading(false);
    }
  }, [pagesBrief, selectedPageId]);

  useEffect(() => {
    if (selectedPageId !== '') {
      void getPage();
    }
  }, [getPage, selectedPageId]);

  useEffect(() => {
    if (!edit) {
      setPage(initialState);
      setSelectedPageId('');
      setNewPageId('');
      setValidationMessage('ID is Empty');
      setNewIdIsValid(false);
    }
  }, [edit]);

  useEffect(() => {
    const slugID = slug(newPageId, {lower: false});
    if (newPageId === '') {
      setNewIdIsValid(false);
      setValidationMessage('ID is Empty');
    } else if (slugID !== newPageId) {
      setNewIdIsValid(false);
      setValidationMessage('Invalid ID - used forbidden characters');
    } else if (pagesBrief.some(page => page.route === slugID)) {
      setNewIdIsValid(false);
      setValidationMessage('Invalid ID - already taken');
    } else {
      setNewIdIsValid(true);
      setValidationMessage('ID is Valid');
    }
  }, [newPageId, pagesBrief]);

  const createPage = async () => {
    try {
      setLoading(true);
      await axiosApi.put(`/pages/${slug(newPageId, {lower: false})}.json`, page);
      reload();
      navigate(`/pages/${slug(page.title)}`);
    } finally {
      setLoading(false);
    }
  };

  const editPage = async () => {
    try {
      setLoading(true);
      await axiosApi.put(`/pages/${selectedPageId}.json` ,page);
      reload();
      navigate(`/pages/${slug(page.title)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (edit) {
      void editPage();
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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPageId(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPageId(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mb-3">{edit ? 'Edit Page' : 'Create a New Page'}</h4>
      {edit && (
        <Form.Group className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              Page
            </InputGroup.Text>
            <Form.Select value={selectedPageId} onChange={handleSelect} disabled={loading} required>
              <option value="" disabled>
                {pagesBrief.length === 0 ? 'No available pages to edit.' : '...'}
              </option>
              {pagesBrief.map((page) => (
                <option
                  key={page.route}
                  value={page.route}
                >{page.title}</option>
              ))}
            </Form.Select>
          </InputGroup>
        </Form.Group>
      )}
      {(
        <fieldset disabled={loading}>
          {edit && selectedPageId === '' ? null : (
            <Form.Group className="mb-3 d-flex shadow-sm bg-white sticky-top">
              <InputGroup>
                <InputGroup.Text>
                  Title
                </InputGroup.Text>
                <Form.Control
                  placeholder="Page Title..."
                  onChange={handleTitleChange}
                  value={page.title}
                  required
                />
                <Button
                  type='submit'
                  disabled={(!edit && !newIdIsValid) || page.title === ''}
                >
                  {edit ? 'Edit' : 'Create'}
                </Button>
              </InputGroup>
            </Form.Group>
          )}
          {!edit && (
            <Form.Group className="mb-3 shadow-sm">
              <Form.Text>
                {newIdIsValid ? (
                  <span className="text-success">{validationMessage}</span>
                ) : (
                  <span className="text-danger">{validationMessage}</span>
                )}
              </Form.Text>
              <InputGroup>
                <InputGroup.Text>
                  Page ID
                </InputGroup.Text>
                <Form.Control
                  placeholder="Page Title..."
                  onChange={handleIdChange}
                  value={newPageId}
                  required
                />
              </InputGroup>
            </Form.Group>
          )}
          {loading ? (
            <Spinner/>
          ) : edit && selectedPageId === "" ? null : (
            <Form.Group className="mb-3">
              <Form.Label>Page content</Form.Label>
              <Editor
                tag='textarea'
                model={page.content}
                onModelChange={handleContentChange}
                config={froalaConfig}
              />
            </Form.Group>
          )}
        </fieldset>
      )}
    </Form>
  );
};

export default PageForm;