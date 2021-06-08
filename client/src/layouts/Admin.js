/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: sidebarImage,
      color: "black",
      hasImage: true,
    }
    this.mainPanel = React.createRef(null);
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  
  render () {
    return (
      <>
        <div className="wrapper">
          <Sidebar color={this.state.color} image={this.state.hasImage ? this.state.image : ""} routes={routes} />
          <div className="main-panel" ref={this.mainPanel}>
            <AdminNavbar {...this.props} />
            <div className="content">
              <Switch>{this.getRoutes(routes)}</Switch>
            </div>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
