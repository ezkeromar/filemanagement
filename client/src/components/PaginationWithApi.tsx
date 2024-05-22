"use client";
import React, { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: Link[] | [];
  displayPerPage: boolean;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

const PaginationWithApi: React.FC<Props> = ({ links, displayPerPage, onPageChange , onPerPageChange}) => {
  const [perPage, setPerPage] = useState<number>(10);

  const perPageOptions = [
    { name: '10', value: 10 },
    { name: '25', value: 25 },
    { name: '50', value: 50 },
    { name: '100', value: 100 },
    { name: 'Illimité', value: 1000000 },
  ];

  useEffect(() => {
    const savedPerPage = localStorage.getItem('perPage');
    if (savedPerPage) {
      setPerPage(parseInt(savedPerPage, 10));
    }
  }, []);

  const changePage = (url: string) => {
    const params = new URLSearchParams(url.split('?')[1]);
    const page = params.get('page');
    onPageChange(page ? parseInt(page) : 1);
  };

  const getName = (link: Link, index: number) => {
    if (index === 0) {
      return 'Précédent';
    } else if (index > 0 && links.length - 1 !== index) {
      return link.label;
    }
    return 'Suivant';
  };

  const changePerPage = (value: number) => {
    setPerPage(value);
    localStorage.setItem('perPage', String(value));
    onPerPageChange && onPerPageChange(value);
  };

  return (
    <div className="flex justify-between">
      <div>
        {/* {displayPerPage && (
          <div className="flex flex-wrap -mb-1">
            {perPageOptions.map((item, index) => (
              <div
                key={index}
                className={`mr-1 mb-1 px-2 py-1 text-sm leading-4 text-gray-400 border rounded cursor-pointer ${
                  item.value === perPage ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => changePerPage(item.value)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )} */}
        <div className="flex items-center space-x-2">
          <p className="text-xs">Rows per page</p>
          <Select
            value={perPage}
            onValueChange={(value :number) => {
              changePerPage(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
              {perPage}
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap -mb-1">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {link.url === null ? (
              <div
                className="mr-1 mb-1 px-2 py-1 text-sm leading-4 text-gray-400 border rounded"
                dangerouslySetInnerHTML={{ __html: getName(link, index) }}
              />
            ) : (
              <a
                className={`mr-1 mb-1 px-2 py-1 text-sm leading-4 border rounded hover:bg-blue-700 focus:border-indigo-500 focus:text-indigo-500 cursor-pointer ${
                  link.active ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  changePage(link.url as string);
                }}
                dangerouslySetInnerHTML={{ __html: getName(link, index) }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PaginationWithApi;
