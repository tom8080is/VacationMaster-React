import "./Footer.css";
import React from 'react';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div className="footer">
      <p> Project 3 · ReactJS · NodeJS · SQL </p>
      <p> Privacy · Terms · Sitemap · Company Details </p>
      <p> All rights reserved to Tom Slakman © 2021</p>
      <MDBBtn tag='a'  color='none' className='m-1' style={{ color: '#3b5998' }}>
        <MDBIcon fab icon='facebook-f' size='lg' />
      </MDBBtn>

      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#55acee' }}>
        <MDBIcon fab icon='twitter' size='lg' />
      </MDBBtn>

      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#dd4b39' }}>
        <MDBIcon  fab icon='google' size='lg' />
      </MDBBtn>

      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#ac2bac' }}>
        <MDBIcon fab icon='instagram' size='lg' />
      </MDBBtn>
    </div>
  );
}

export default Footer;
