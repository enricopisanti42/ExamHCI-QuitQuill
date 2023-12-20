import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const RouteFilters = (props) => {

  const {items} = props;

  // Converting the object into an array to use map method
  const filterArray = Object.entries(items);

  return (
    <>
      {filterArray.map(([filterName, { label, url }]) => (
        <Link key={filterName} to={url} style={{ textDecoration: 'none' }}>
          <Navbar.Brand className={props.filterLabel === filterName ? 'active-filter' : ''}>
            {label}
          </Navbar.Brand>
        </Link>
      ))}
    </>
  );
      }

export { RouteFilters };



