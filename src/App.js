import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Register from './components/users/Register'
import Login from './components/users/Login'
import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import Departments from './components/department/Departments'
import EmployeeList from './components/employees/Employees'
import EmployeeNew from './components/employees/New'
import EmployeeEdit from './components/employees/Edit'
import EmployeeShow from './components/employees/Show'
import TicketsList from './components/tickets/Tickets'
import TicketNew from './components/tickets/TicketNew'
import TicketShow from './components/tickets/TicketShow'
import TicketEdit from './components/tickets/TicketEdit'
import DepartmentShow from './components/department/DepartmentShow'
import CustomerEdit from './components/customers/Edit'
import DepartmentEdit from './components/department/DepartmentEdit'
import { Navbar, NavbarBrand, NavbarText, Nav, NavItem } from 'reactstrap'

function App (props) {
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    window.location.href = "/account/login" // we cant access props within this component
  }

  return (
    <BrowserRouter>
        <div>
          <span>
           {
             localStorage.getItem("authToken") ? (
               <div>
                <div>
                    <Navbar color="light" light expand = "md">
                      <NavbarBrand href="/">Ticket Master</NavbarBrand>
                        <Nav className="mr-auto" navbar>
                          <NavItem>
                              <Link to = "/">Home</Link>&nbsp;
                          </NavItem>
                          <NavItem>
                              <Link to = "/account/logout" onClick = { handleLogout }>Logout</Link>&nbsp;
                          </NavItem>
                          <NavItem>
                              <Link to = "/customers">Customers</Link>&nbsp;
                          </NavItem>
                          <NavItem>
                              <Link to = "/departments">Departments</Link>&nbsp;
                          </NavItem>
                          <NavItem>
                              <Link to = "/employees">Employees</Link>&nbsp;
                          </NavItem>
                          <NavItem>
                              <Link to = "/tickets">Tickets</Link>&nbsp;
                          </NavItem>
                        </Nav>
                        </Navbar>
                  </div>
                  
                </div>
                
              
             ) : (
               <div>
                 <Link to = "/">Home |</Link>
                 <Link to = "/account/register">Register</Link>
                 <Link to = "/account/login">Login</Link>
               </div>
               
             )
           } 
           </span>
          
           <Switch>
              <Route exact path = "/" component = { Home }/>
              <Route path = "/account/register" component = { Register } />
              <Route path = "/account/login" component = { Login } />
              
              
              <Route exact path = "/customers" component = { CustomerList } />
              <Route path = "/customers/new" component = { CustomerNew } />
              <Route path = "/customers/edit/:id" component = { CustomerEdit } />
              <Route path = "/customers/:id" component = { CustomerShow } />
              
              <Route exact path = "/departments" component = { Departments } />
              <Route path = "/departments/edit/:id" component = { DepartmentEdit } />
              <Route path = "/departments/:id" component = { DepartmentShow } />
              
              
              <Route exact path = "/employees" component = { EmployeeList } />
              <Route path = "/employees/new" component = { EmployeeNew } />
              <Route path = "/employees/edit/:id" component = { EmployeeEdit } />
              <Route path = "/employees/:id" component = { EmployeeShow } />
              
              
              <Route exact path = "/tickets" component = { TicketsList } />
              <Route path = "/tickets/new" component = { TicketNew } />
              <Route path = "/tickets/edit/:id" component = { TicketEdit } />
              <Route path = "/tickets/:id" component = { TicketShow } />
           </Switch>
           
          
        </div>
    </BrowserRouter>
    
  );
}

export default App;
